<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/vue"
import type { IReportType } from "@models/reportTypeModel.ts"
import type { IReport } from "@models/reportModel.ts"
import axios, { type AxiosResponse } from "axios"
import Map from "@/components/Map.vue"
import { usePositionStore } from "@/stores/position.store.ts"
import { blobToBase64, formatUnderscoredString } from "@/lib/stringUtility.ts"
import CameraContainer from "@/components/CameraContainer.vue"
import SimpleButton from "@/components/buttons/SimpleButton.vue"
import SimpleLabel from "@/components/utils/SimpleLabel.vue"
import { cropTo4by3, scaleToResolution } from "@/lib/imageUtility.ts";
import { useAuthStore } from "@/stores/auth.store.ts"
import FormInput from "@/components/inputs/FormInput.vue"
import DialogWrapper from "@/components/utils/DialogWrapper.vue"
import { OperationResults, RADIUS } from "@/lib/vars.ts"
import { socket, SocketEvents } from "@/socket"


const emit = defineEmits(["cancel"])

const reportTypes = ref<IReportType[]>([])
const selectedReportType = ref<IReportType | null>(null)
const posCopy = { ...usePositionStore().position }
const latLng = ref<[number, number]>([posCopy[0], posCopy[1]])
const zoom: number = 12

const fetchReportTypes = () => {
  axios.get<IReportType[]>(`http://localhost:3000/report-types`)
    .then((res) => {
      reportTypes.value = res.data
      selectedReportType.value = reportTypes.value[0]
    })
    .catch((e) => console.error(e))
}

const image = ref<Blob | null>(null)
const previewUrl = computed<string>(() => image.value ? URL.createObjectURL(image.value) : "")

const uploadFile = async (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.item(0)
  if (file) {
    image.value = await cropTo4by3(file).then((img) => scaleToResolution(img))
  }
}

const description = ref<string>("")

const saveDescription = (e: Event) => {
  const target = e.target as HTMLTextAreaElement
  description.value = target.value
}

const results = ref<{ success: boolean, title: string, content: string }[]>([])

function addResult(success: boolean, title: string, content: string): void {
  results.value.push({ success, title, content })
}

const publishReport = async () => {
  const newReport: IReport = {
    type: selectedReportType.value?.name,
    user: useAuthStore().get()?.username,
    coordinates: latLng.value,
  } as IReport
  if (description.value !== "") {
    newReport.description = description.value
  }
  if (image.value) {
    newReport.picture = await blobToBase64(image.value)
  }
  axios.post<IReport>(`http://localhost:3000/reports`, newReport)
    .then((reportPost) => {
      addResult(true, OperationResults.SUCCESS, "Report successfully published")

      // send notifications to each user which has a favorite spot near (radius) to the published report
      const [lat, long]: [number, number] = reportPost.data.coordinates
      
      socket.emit(SocketEvents.NEW_REPORT_SPOT, reportPost.data, RADIUS)

      // send notifications to each user near to the published report
      socket.emit(SocketEvents.NEW_REPORT_GPS, reportPost.data, RADIUS)

    })
    .catch((e) => {
      console.error(e)
      addResult(false, OperationResults.FAILURE, "An error occurred while publishing the report")
    })
}

onMounted(fetchReportTypes)
</script>

<template>
  <div class="p-4 pb-20 space-y-2">
    <DialogWrapper v-for="dialog in results" :key="dialog.content" @closeOperation="() => {
      if (dialog.success) {
        emit('cancel')
      }
      results.splice(0, 1)
    }">
      <template v-slot:title>
        <div :class="[dialog.success ? 'text-green-600' : 'text-red-600']">
          {{ dialog.title }}
        </div>
      </template>
      <template v-slot:content>
        {{ dialog.content }}
      </template>
    </DialogWrapper>

    <h1 class="text-2xl">Insert a new report</h1>

    <Listbox v-model="selectedReportType" class="z-10">
      <div class="relative">
        <SimpleLabel attachTo="report-type">Report type</SimpleLabel>
        <ListboxButton id="report-type" class="relative w-full cursor-pointer rounded-xl text-light bg-primary-600 mt-0.5 py-2 pl-3 pr-10 text-left
            focus:outline-none focus-visible:border-primary-600 focus-visible:ring-2 focus-visible:ring-white/75
            focus-visible:ring-offset-2 focus-visible:ring-offset-primary-600 hover:bg-primary-700 duration-300">
          <span class="block truncate">
            {{ formatUnderscoredString(selectedReportType?.name) }}
          </span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white"
              class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
            </svg>
          </span>
        </ListboxButton>

        <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
          leave-to-class="opacity-0">
          <ListboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-light py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            <ListboxOption v-slot="{ active, selected }" v-for="reportType in reportTypes" :key="reportType.name"
              :value="reportType">
              <li
                :class="[active ? 'bg-primary-100' : 'text-gray-800', 'relative cursor-pointer select-none py-2 pl-10 pr-4',]">
                <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate',]">
                  {{ formatUnderscoredString(reportType?.name) }}
                </span>
                <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>

    <section>
      <div class="w-full h-64 mb-8 relative">
        <SimpleLabel attachTo="position">Position</SimpleLabel>
        <Map ref="map" id="position" class="z-0 rounded-xl" :zoom="zoom" :use-position=false
          v-model:latLng="latLng"></Map>
      </div>

      <div class="flex flex-row w-full">
        <div class="flex flex-col w-1/2 pr-1">
          <FormInput type="number" label="latitude" fieldName="lat" :modelValue="latLng[0]" @input="(lat) => {
            latLng[0] = Number.parseFloat(lat.target.value)
            usePositionStore().move(latLng)
          }" />
        </div>
        <div class="flex flex-col w-1/2 pl-1">
          <FormInput type="number" label="longitude" fieldName="lng" :modelValue="latLng[1]" @input="(lng) => {
            latLng[1] = Number.parseFloat(lng.target.value)
            usePositionStore().move(latLng)
          }" />
        </div>
      </div>
    </section>

    <section>
      <SimpleLabel attachTo="picture">Picture</SimpleLabel>
      <div id="picture" class="flex flex-row mt-0.5">
        <CameraContainer :resolution="{ width: 960, height: 1280 }" v-model:snapshot="image" />
        <label for="img-input" class="flex items-center cursor-pointer ml-2 rounded-xl px-4 duration-300 bg-surface-default text-primary-600 border
               border-primary-600 hover:bg-primary-100 hover:border-primary-700">
          Upload image
        </label>
        <input type="file" id="img-input" accept="image/x-png,image/jpeg,image/jpg" @change="uploadFile"
          class="hidden" />
      </div>
      <p class="mt-1 ml-1 text-xs text-gray-500">The image should be 3:4 format, if not it will be automatically
        cropped.</p>
      <div v-if="image" class="mt-2 md:flex md:place-items-center md:flex-col">
        <SimpleLabel attachTo="preview" class="md:mr-auto">Preview</SimpleLabel>
        <img v-if="image" :src="previewUrl" alt="Image preview" id="preview"
          class="w-full rounded-xl md:w-60 md:h-80" />
      </div>
    </section>

    <section>
      <SimpleLabel attachTo="description">Description</SimpleLabel>
      <textarea id="description" @input="saveDescription"
        class="w-full h-24 rounded-lg p-2 mt-0.5 border bg-surface-component duration-300 focus:outline-none focus-visible:border-primary-600 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-600 sm:text-sm"></textarea>
    </section>

    <section
      class="w-full flex justify-end space-x-2 fixed bottom-0 right-0 px-4 py-3 bg-surface-default md:max-w-[50vw] md:right-4">
      <SimpleButton :outline=true screenReaderLabel="Cancel new report creation" @click="emit('cancel')">
        Cancel
      </SimpleButton>
      <SimpleButton screenReaderLabel="Submit new report" @click="publishReport">Submit</SimpleButton>
    </section>
  </div>
</template>

<style scoped lang="scss"></style>
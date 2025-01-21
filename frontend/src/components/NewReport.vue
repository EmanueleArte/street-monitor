<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption
} from "@headlessui/vue"
import type { IReportType } from "@models/reportTypeModel.ts"
import axios from "axios"
import Map from "@/components/Map.vue"
import { usePositionStore } from "@/stores/position.store.ts"
import { formatUnderscoredString } from "../lib/stringUtility.ts"
import CameraContainer from "@/components/CameraContainer.vue"
import SimpleButton from "@/components/buttons/SimpleButton.vue"

const emit = defineEmits(["toggleTile"])

const reportTypes = ref<IReportType[]>([])
const selectedReportType = ref<IReportType | null>(null)
const posCopy = { ...usePositionStore().position }
const latLng = ref<[number, number]>([posCopy[0], posCopy[1]])
const zoom: number = 12

const moveToPosition = () => {
  usePositionStore().positionToMove = latLng.value
}

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

onMounted(fetchReportTypes)
</script>

<template>
  <div class="p-4 pb-20 space-y-2">
    <h1 class="text-2xl">Insert a new report</h1>

    <Listbox v-model="selectedReportType" class="z-10">
      <div class="relative">
        <label for="report-type" class="text-sm text-gray-500">Report type</label>
        <ListboxButton
            id="report-type"
            class="relative w-full cursor-pointer rounded-xl text-button-text bg-main-600 py-2 pl-3 pr-10 text-left
            focus:outline-none focus-visible:border-main-600 focus-visible:ring-2 focus-visible:ring-white/75
            focus-visible:ring-offset-2 focus-visible:ring-offset-main-600 hover:bg-main-700 duration-300">
          <span class="block truncate">
            {{ formatUnderscoredString(selectedReportType?.name) }}
          </span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="white" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"/>
            </svg>
          </span>
        </ListboxButton>

        <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
                    leave-to-class="opacity-0">
          <ListboxOptions
              class="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-light py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            <ListboxOption v-slot="{ active, selected }" v-for="reportType in reportTypes" :key="reportType.name"
                           :value="reportType">
              <li :class="[active ? 'bg-main-100' : 'text-gray-800', 'relative cursor-pointer select-none py-2 pl-10 pr-4',]">
                <span :class="[selected ? 'font-medium' : 'font-normal','block truncate',]">
                  {{ formatUnderscoredString(reportType?.name) }}
                </span>
                <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-main-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                       stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
                  </svg>
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>

    <section>
      <div class="w-full h-64 mb-8">
        <label for="position" class="text-sm text-gray-500">Position</label>
        <Map ref="map" id="position" class="z-0 rounded-xl" :zoom="zoom" :use-position=false
             v-model:latLng="latLng"></Map>
      </div>

      <div class="flex flex-row w-full">
        <div class="flex flex-col w-1/2">
          <label for="lat" class="text-sm text-gray-500">Latitude</label>
          <input type="number" id="lat"
                 class="rounded-xl p-2 mr-1 border border-gray-500 duration-300 focus:outline-none focus-visible:border-main-600 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-main-600 sm:text-sm"
                 v-model="latLng[0]"
                 @input="moveToPosition"
                 placeholder="Latitude">
        </div>
        <div class="flex flex-col w-1/2">
          <label for="lng" class="ml-1 text-sm text-gray-500">Longitude</label>
          <input type="number" id="lng"
                 class="rounded-xl p-2 ml-1 border border-gray-500 duration-300 focus:outline-none focus-visible:border-main-600 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-main-600 sm:text-sm"
                 v-model="latLng[1]"
                 @input="moveToPosition"
                 placeholder="Longitude">
        </div>
      </div>
    </section>

    <section>
      <label for="picture" class="text-sm text-gray-500">Picture</label>
      <div id="picture">
        <CameraContainer :resolution="{ width: 960, height: 1280 }" v-model:snapshot="image"/>
        <SimpleButton classes="ml-2 !bg-light !text-main-600 border border-main-600 hover:!bg-main-100">
          Choose from device
        </SimpleButton>
      </div>
      <div v-if="image" class="mt-2">
        <img v-if="image" :src="previewUrl" alt="Image preview" class="w-full rounded-xl"/>
      </div>
    </section>

    <section>
      <label for="description" class="text-sm text-gray-500">Description</label>
      <textarea id="description"
                class="w-full h-24 rounded-xl p-2 border border-gray-500 duration-300 focus:outline-none focus-visible:border-main-600 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-main-600 sm:text-sm"></textarea>
    </section>

    <section class="w-full flex justify-end space-x-2 fixed bottom-0 right-0 px-4 py-3 bg-light">
      <SimpleButton classes="!bg-light !text-main-600 border border-main-600 hover:!bg-main-100"
                    @click="emit('toggleTile')">
        Cancel
      </SimpleButton>
      <SimpleButton @click="console.log('Submit')">Submit</SimpleButton>
    </section>
  </div>
</template>

<style scoped lang="scss">

</style>
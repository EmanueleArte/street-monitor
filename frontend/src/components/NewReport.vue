<script setup lang="ts">
import { onMounted, ref } from "vue"
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption
} from "@headlessui/vue"
import type { IReportType } from "@models/reportTypeModel.ts"
import axios from "axios"
import Map from "@/components/Map.vue"
import { usePositionStore } from "@/stores/position.ts"
import { formatUnderscoredString } from "../lib/stringUtility.ts"

const reportTypes = ref<IReportType[]>([])
const selectedReportType = ref<IReportType | null>(null)

const fetchReportTypes = () => {
  axios.get<IReportType[]>(`http://localhost:3000/report-types`)
      .then((res) => {
        reportTypes.value = res.data
        selectedReportType.value = reportTypes.value[0]
      })
      .catch((e) => console.error(e))
}

onMounted(fetchReportTypes)
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl">Insert a new report</h1>

    <Listbox v-model="selectedReportType" class="z-10">
      <div class="relative mt-1">
        <label for="report-type" class="text-sm text-gray-500">Report type</label>
        <ListboxButton
            id="report-type"
            class="relative w-full cursor-pointer rounded-xl text-button-text bg-main-600 py-2 pl-3 pr-10 text-left shadow-lg
            focus:outline-none focus-visible:border-main-600 focus-visible:ring-2 focus-visible:ring-white/75
            focus-visible:ring-offset-2 focus-visible:ring-offset-main-600 sm:text-sm">
          <span class="block truncate">
            {{ formatUnderscoredString(selectedReportType?.name) }}
          </span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="bg-main-600" class="size-6">
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

    <label for="position" class="text-sm text-gray-500">Position</label>
    <div class="w-full h-64">
      <Map id="position" class="z-0 rounded-xl" :zoom="12" :use-position=false :position="usePositionStore().position"></Map>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
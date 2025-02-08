<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref, watch } from "vue"
import Checkbox from "@/components/inputs/Checkbox.vue"
import { ReportStatus } from "@/lib/vars.ts"
import { formatUnderscoredString } from "@/lib/stringUtility.ts"
import { useMapStore } from "@/stores/map.store.ts"
import axios from "axios"
import type { IReportType } from "@models/reportTypeModel.ts"
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/vue"
import SimpleLabel from "@/components/utils/SimpleLabel.vue"
import { useReportStore } from "@/stores/report.store.ts"

defineProps<{
  statusFilterId: string,
  reportTypeFilterId: string
}>()

const show = ref<boolean>(true)
const observer = ref<MutationObserver | null>(null)

const observeTile = () => {
  observer.value = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        const element = document.querySelector<HTMLElement>(".tile")
        show.value = !element
      }
    })
  })

  observer.value.observe(document.body, { childList: true, subtree: true })
}

const statusToShow = reactive<Record<ReportStatus, boolean>>(
    Object.values(ReportStatus).reduce((acc, status) => {
      acc[status] = true
      return acc
    }, {} as Record<ReportStatus, boolean>)
)
statusToShow[ReportStatus.CLOSED] = false

watch(statusToShow, () => {
  useMapStore().filterReports(statusToShow)
  useReportStore().setReports(useMapStore().filteredReports)
})

const allTypes: string = "all"
const typesToShow = reactive<Record<string, boolean>>({})
const reportTypes = ref<IReportType[]>([])
const selectedReportType = ref<IReportType | null>(null)
const getReportTypes = () => {
  axios.get<IReportType[]>("http://localhost:3000/report-types")
      .then((res) => {
        reportTypes.value = res.data
        reportTypes.value.unshift({ name: allTypes } as IReportType)
        selectedReportType.value = reportTypes.value[0]
        Object.values(reportTypes.value).forEach((type) => {
          typesToShow[type.name] = true
        })
      })
      .catch((e) => {
        console.error(e)
      })
}

const selectReportType = (type: IReportType) => {
  Object.keys(typesToShow).forEach((key) => {
    typesToShow[key] = key === type.name || type.name === allTypes
  })
  delete typesToShow[allTypes]
}

watch(selectedReportType, (newReportType) => {
  if (newReportType) {
    selectReportType(newReportType)
    useMapStore().filterReports(typesToShow)
  }
})

onMounted(() => {
  observeTile()
  getReportTypes()
  useMapStore().filterReports(statusToShow)
  useMapStore().filterReports(typesToShow)
})
onUnmounted(() => {
  observer.value?.disconnect()
})
</script>

<template>
  <div class="relative w-full">
    <SimpleLabel :attachTo="statusFilterId">Status filter</SimpleLabel>
    <section :id="statusFilterId" class="flex flex-row justify-between px-1">
      <Checkbox v-for="(value, key) in statusToShow" :checked="value"
                @click="statusToShow[key] = !statusToShow[key]">
        {{ formatUnderscoredString(key) }}
      </Checkbox>
    </section>
    <section>
      <Listbox v-model="selectedReportType" class="z-10">
        <div class="relative">
          <SimpleLabel :attachTo="reportTypeFilterId">Report type filter</SimpleLabel>
          <ListboxButton
              :id="reportTypeFilterId"
              class="relative w-full cursor-pointer rounded-xl text-light bg-primary-600 py-2 pl-3 pr-10 text-left
                focus:outline-none focus-visible:border-primary-600 focus-visible:ring-2 focus-visible:ring-white/75
                focus-visible:ring-offset-2 focus-visible:ring-offset-primary-600 hover:bg-primary-700 duration-300"
          >
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
                      leave-to-class="opacity-0"
          >
            <ListboxOptions
                class="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-light py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
            >
              <ListboxOption v-slot="{ active, selected }" v-for="reportType in reportTypes" :key="reportType.name"
                             :value="reportType"
              >
                <li :class="[active ? 'bg-primary-100' : 'text-gray-800', 'relative cursor-pointer select-none py-2 pl-10 pr-4',]">
                  <span :class="[selected ? 'font-medium' : 'font-normal','block truncate',]">
                    {{ formatUnderscoredString(reportType?.name) }}
                  </span>
                  <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600">
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
    </section>
  </div>
</template>

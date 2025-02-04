<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref, watch } from "vue"
import SlideFromTop from "@/components/transitions/SlideFromTop.vue"
import Checkbox from "@/components/inputs/Checkbox.vue"
import { ReportStatus } from "@/lib/vars.ts"
import { formatUnderscoredString } from "@/lib/stringUtility.ts"
import { useMapStore } from "@/stores/map.store.ts"
import axios from "axios"
import type { IReportType } from "@models/reportTypeModel.ts"
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/vue"
import SimpleLabel from "@/components/utils/SimpleLabel.vue"
import ReportFilter from "./ReportFilter.vue"


const show = ref<boolean>(true)
const observer = ref<MutationObserver | null>(null)

const observeTile = () => {
  observer.value = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        const element = document.querySelector<HTMLElement>(".new-report-tile")
        show.value = !element;
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
  <SlideFromTop>
    <div v-if="show" class="absolute w-screen top-10 px-2 py-4">
      <div class="w-full bg-surface-default shadow-lg rounded-xl p-4 pt-3">
        <ReportFilter />
      </div>
    </div>
  </SlideFromTop>
</template>

<style scoped lang="scss"></style>
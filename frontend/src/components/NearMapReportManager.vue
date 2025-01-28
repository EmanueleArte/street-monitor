<script setup lang="ts">
import axios from "axios"
import { computed, onMounted, ref, watch } from "vue"
import ReportPin from "@/components/pins/ReportPin.vue"
import type { IReport } from "@models/reportModel"
import { useReportStore } from "@/stores/report.store"
import { useMapStore } from "@/stores/map.store.ts"
import { ReportStatus } from "@/lib/vars.ts"
import { throttle } from "lodash"

const reportStore = useReportStore()
const props = defineProps<{
  lat: number,
  lng: number,
  radius: number,
  main?: boolean
}>()

const reports = ref<IReport[]>([])

const getNearReports = async () => {
  axios.get<IReport[]>(`http://localhost:3000/reports/by-coordinates/${props.lat}&${props.lng}&${props.radius}`)
      .then((res) => {
        if (props.main) {
          useMapStore().setReports(res.data)
          reportStore.setReports(res.data)
        } else {
          reports.value = res.data
        }
      })
      .catch((e) => {
        if (e.status === 404) {
          if (props.main) {
            useMapStore().setReports([])
          } else {
            reports.value = []
            reportStore.setReports([])
          }
          console.error(e.response.data)
        } else {
          console.error(e)
        }
      })
}

function clickHandler(report: IReport) {
  reportStore.setCurrentReport(report)
}
const reportsList = computed(() => {
  return props.main ? useMapStore().filteredReports : reports.value.filter((report) => report.status !== ReportStatus.CLOSED)
})

const throttledGetNearReports = throttle(getNearReports, 100)

onMounted(getNearReports)
watch(() => [props.lat, props.lng, props.radius], throttledGetNearReports)
</script>

<template>
  <ReportPin v-for="report in reportsList.values()" :report="report" @click="() => clickHandler(report)"/>
</template>

<style scoped lang="scss">

</style>
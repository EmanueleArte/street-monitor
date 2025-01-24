<script setup lang="ts">
import axios from "axios"
import { onMounted, ref, watch } from "vue"
import ReportPin from "@/components/pins/ReportPin.vue"
import type { IReport } from "@models/reportModel"
import { useReportStore } from "@/stores/report.store"

const reportStore = useReportStore()

const props = defineProps<{
  lat: number,
  lng: number,
  radius: number
}>()

const reports = ref<IReport[]>([])

const getNearReports = async () => {
  axios.get<IReport[]>(`http://localhost:3000/reports/by-coordinates/${props.lat}&${props.lng}&${props.radius}`)
      .then((res) => {
        reports.value = res.data
        reportStore.setReports(res.data)
      })
      .catch((e) => {
        if (e.status === 404) {
          reports.value = []
          console.error(e.response.data)
        } else {
          console.error(e)
        }
      })
}

function clickHandler(report: IReport) {
  console.log('click')
  reportStore.setCurrentReport(report)
}

onMounted(getNearReports)
watch(() => [props.lat, props.lng, props.radius], getNearReports)
</script>

<template>
  <ReportPin v-for="report in reports.values()" :report="report" @click="() => clickHandler(report)"/>
</template>

<style scoped lang="scss">

</style>
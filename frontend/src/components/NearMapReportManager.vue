<script setup lang="ts">
import axios from "axios"
import { onMounted, ref } from "vue"
import ReportPin from "@/components/ReportPin.vue"
import type { IReport } from "@models/reportModel"

const props = defineProps<{
  lat: number,
  lng: number,
  radius: number
}>()

const reports = ref<IReport[]>([])

const getNearReports = async () => {
  try {
    // 500m lat = 0.00449
    // 500m lng = 0.00635
    reports.value = (await axios.get(
        `http://localhost:3000/reports/by-coordinates/${props.lat}&${props.lng}&${props.radius}`)
    ).data
  } catch (e) {
    console.error(e)
  }
}
onMounted(getNearReports)
</script>

<template>
  <ReportPin v-for="report in reports" :key="report.id" :report="report"/>
</template>

<style scoped lang="scss">

</style>
<script setup lang="ts">
// 500m lat = 0.00449
// 500m lng = 0.00635
import axios from "axios"
import { onMounted, ref } from "vue"
import ReportPin from '@/components/ReportPin.vue'

const props = defineProps<{
  lat: number,
  lng: number
}>()

const reports = ref<Array<any>>([])

const getNearReports = async () => {
  try {
    reports.value = (await axios.post("http://localhost:3000/reports", { "lat": props.lat, "lng": props.lng })).data
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
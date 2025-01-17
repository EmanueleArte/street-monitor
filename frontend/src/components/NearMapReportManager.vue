<script setup lang="ts">
import axios from "axios"
import { onMounted, ref, watch } from "vue"
import ReportPin from "@/components/ReportPin.vue"
import type { IReport } from "@models/reportModel"

const props = defineProps<{
  lat: number,
  lng: number,
  radius: number
}>()

const reports = ref<IReport[]>([])

const getNearReports = async () => {
  axios.get<IReport[]>(`http://localhost:3000/reports/by-coordinates/${props.lat}&${props.lng}&${props.radius}`)
      .then((res) => reports.value = res.data)
      .catch((e) => {
        if (e.status === 404) {
          reports.value = []
          console.error(e.response.data)
        }
      })
}

onMounted(getNearReports)
watch(() => [props.lat, props.lng, props.radius], getNearReports)
</script>

<template>
  <ReportPin v-for="report in reports.values()" :report="report"/>
</template>

<style scoped lang="scss">

</style>
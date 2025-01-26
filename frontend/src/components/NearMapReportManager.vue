<script setup lang="ts">
import axios from "axios"
import { onMounted, ref, watch } from "vue"
import ReportPin from "@/components/pins/ReportPin.vue"
import type { IReport } from "@models/reportModel"
import ReportFilter from "@/components/ReportFilter.vue"
import { useMapStore } from "@/stores/map.store.ts"

const props = defineProps<{
  lat: number,
  lng: number,
  radius: number
}>()

const getNearReports = async () => {
  axios.get<IReport[]>(`http://localhost:3000/reports/by-coordinates/${props.lat}&${props.lng}&${props.radius}`)
      .then((res) => useMapStore().setReports(res.data))
      .catch((e) => {
        if (e.status === 404) {
          useMapStore().setReports([])
          console.error(e.response.data)
        } else {
          console.error(e)
        }
      })
}

onMounted(getNearReports)
watch(() => [props.lat, props.lng, props.radius], getNearReports)
</script>

<template>
  <ReportPin v-for="report in useMapStore().reports.values()" :report="report"/>
</template>

<style scoped lang="scss">

</style>
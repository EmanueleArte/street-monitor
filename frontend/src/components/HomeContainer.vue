<script setup lang="ts">
import Map from "@/components/Map.vue"
import NewReportTile from "@/components/NewReportTile.vue"
import MyReports from "@/components/MyReports.vue"
import MySpots from "@/components/MySpots.vue"
import { useReportStore } from "@/stores/report.store";
import ReportCarosel from "./ReportCarosel.vue";
import ReportFilter from "@/components/ReportFilter.vue"

const reportStore = useReportStore()
</script>

<template>
  <div class="homeContainer w-screen h-screen">
    <Map class="z-0" :zoom="12" :usePosition=true :main=true></Map>
    <ReportFilter/>
    <NewReportTile/>
    <MyReports/>
    <MySpots/>
    <ReportCarosel />
  </div>
</template>

<style lang="scss">

</style>
<script setup lang="ts">
import Map from "@/components/Map.vue"
import MyReports from "@/components/MyReports.vue"
import MySpots from "@/components/MySpots.vue"
import ReportFilter from "@/components/ReportFilter.vue"
import { useRoute } from 'vue-router'
import NewReportTile from "./NewReportTile.vue"

const route = useRoute()
const queryParams = route.query
const showMyReports = queryParams['show-my-reports'] === 'true'
const showMySpots = queryParams['show-my-spots'] === 'true'

</script>

<template>
  <div class="homeContainer w-screen h-screen">
    <Map class="z-0" :zoom="12" :usePosition=true :main=true></Map>
    <ReportFilter/>
    <NewReportTile/>
    <MyReports :showMyReports="showMyReports"/>
    <MySpots :showMySpots="showMySpots"/>
  </div>
</template>

<style lang="scss">

</style>
<script setup lang="ts">
import Map from "@/components/Map.vue"
import MyReports from "@/components/MyReports.vue"
import MySpots from "@/components/MySpots.vue"
import ReportFilter from "@/components/ReportFilter.vue"
import NewReportTile from "./NewReportTile.vue"
import { onMounted, ref } from "vue"

const showMyReports = ref<boolean>(false)
const showMySpots = ref<boolean>(false)

const props = defineProps({
  whatToShow: { type: String, required: false }
})

const checkShow = (): void => {
  switch (props.whatToShow) {
    case 'myReports':
      showMyReports.value = true
      break
    case 'mySpots':
      showMySpots.value = true
      break
  }
}

onMounted(checkShow)
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
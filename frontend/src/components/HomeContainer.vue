<script setup lang="ts">
import Map from "@/components/Map.vue"
import MyReports from "@/components/MyReports.vue"
import MySpots from "@/components/MySpots.vue"
import ReportFilter from "@/components/ReportFilter.vue"
import NewReportTile from "./NewReportTile.vue"
import { onMounted, ref } from "vue"
import LeftAside from "@/components/LeftAside.vue"

const showMyReports = ref<boolean>(false)
const showMySpots = ref<boolean>(false)
const mobile = window.innerWidth <= 768

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
    <ReportFilter v-if="mobile"/>
    <NewReportTile v-if="mobile"/>
    <MyReports v-if="mobile" :showMyReports="showMyReports"/>
    <MySpots v-if="mobile" :showMySpots="showMySpots"/>

    <LeftAside v-if="!mobile"/>
  </div>
</template>

<style lang="scss">

</style>
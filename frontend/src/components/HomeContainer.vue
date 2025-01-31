<script setup lang="ts">
import Map from "@/components/Map.vue"
import MyReports from "@/components/MyReports.vue"
import MySpots from "@/components/MySpots.vue"
import { useReportStore } from "@/stores/report.store";
import ReportCarosel from "./ReportCarosel.vue";
import ReportFilter from "@/components/ReportFilter.vue"
import NewReportTile from "./NewReportTile.vue"
import { onMounted, ref } from "vue"
import LeftAside from "@/components/LeftAside.vue"
import { useAuthStore } from "@/stores/auth.store";
import ReportFilterContainer from "./ReportFilterContainer.vue";

const showMyReports = ref<boolean>(false)
const showMySpots = ref<boolean>(false)
const authStore = useAuthStore()

const props = defineProps({
  whatToShow: { type: String, required: false }
})

const checkLogin = (): void => {
  if (!authStore.get()) {
    authStore.logout()
  }
}

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

onMounted(() => {
  checkLogin()
  checkShow()
})
</script>

<template>
  <div class="homeContainer w-screen h-screen">
    <Map class="z-0" :zoom="12" :usePosition=true :main=true></Map>
    <ReportFilterContainer class="md:hidden"/>
    <NewReportTile />
    <MyReports :showMyReports="showMyReports"/>
    <MySpots :showMySpots="showMySpots"/>

    <ReportCarosel />
    <LeftAside />
  </div>
</template>

<style lang="scss">

</style>
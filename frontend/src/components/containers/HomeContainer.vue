<script setup lang="ts">
import Map from "@/components/map/Map.vue"
import MyReports from "@/components/reports/MyReports.vue"
import MySpots from "@/components/spots/MySpots.vue"
import ReportCarosel from "@/components/reports/ReportCarosel.vue"
import NewReportTile from "@/components/reports/NewReportTile.vue"
import { onMounted, ref, watch } from "vue"
import LeftAside from "@/components/utils/LeftAside.vue"
import { useAuthStore } from "@/stores/auth.store.ts"
import ReportFilterContainer from "./ReportFilterContainer.vue"
import { WIDTH_MD } from "@/lib/vars.ts"

const props = defineProps({
  whatToShow: { type: String, required: false }
})

const showMyReports = ref<boolean>(false)
const showMySpots = ref<boolean>(false)
const authStore = useAuthStore()
const isMobile = window.innerWidth <= WIDTH_MD

const checkLogin = (): void => {
  if (!authStore.get()) {
    authStore.logout()
  }
}

const checkShow = (): void => {
  switch (props.whatToShow) {
    case "myReports":
      showMyReports.value = true
      break
    case "mySpots":
      showMySpots.value = true
      break
  }
}

watch(() => props.whatToShow, checkShow)

onMounted(checkLogin)
</script>

<template>
  <div class="homeContainer w-screen h-screen">
    <Map class="z-0" :zoom="12" :usePosition=true :main=true />
    <ReportFilterContainer v-if="isMobile" statusFilterId="status-filter-id" reportTypeFilterId="report-type-filter-id" class="md:hidden"/>
    <NewReportTile/>
    <MyReports v-model:showMyReports="showMyReports"/>
    <MySpots v-model:showMySpots="showMySpots"/>

    <ReportCarosel/>
    <LeftAside/>
  </div>
</template>

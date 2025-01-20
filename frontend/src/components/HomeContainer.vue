<script setup lang="ts">
import { ref } from "vue"
import Map from "@/components/Map.vue"
import MyReportsButton from "@/components/MyReportsButton.vue"
import MyReportsDiv from "@/components/MyReportsDiv.vue"
import NewReport from "@/components/NewReportTile.vue"

const isMyReportsDivVisible = ref(false)

function toggleReportsVisibility() {
  isMyReportsDivVisible.value = !isMyReportsDivVisible.value
}
</script>

<template>
  <div class="homeContainer w-screen h-screen">
    <Map class="z-0" :zoom="12" :usePosition=true></Map>
    <NewReport/>
    <MyReportsButton @toggleMyReports="toggleReportsVisibility" />
    <MyReportsDiv :isVisible="isMyReportsDivVisible" />
  </div>
</template>

<style lang="scss">

</style>
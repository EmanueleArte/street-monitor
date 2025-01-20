<script setup lang="ts">
import { ref } from "vue"
import Map from "@/components/Map.vue"
import MyReportsButton from "@/components/MyReportsButton.vue"
import MyReportsDiv from "@/components/MyReportsDiv.vue"

const isMyReportsDivVisible = ref(false)

function toggleReportsVisibility() {
  isMyReportsDivVisible.value = !isMyReportsDivVisible.value
}
</script>

<template>
  <div class="homeContainer">
    <Map :zoom="12" />
    <MyReportsButton @toggleMyReports="toggleReportsVisibility" />
    <MyReportsDiv :isVisible="isMyReportsDivVisible" />
  </div>
</template>

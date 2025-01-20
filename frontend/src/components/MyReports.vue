<script setup lang="ts">
import { ref } from "vue"
import MyReportsButton from "@/components/buttons/MyReportsButton.vue"
import MyReportsTile from "@/components/MyReportsTile.vue"

const isMyReportsTileVisible = ref(false)

function toggleReportsVisibility() {
  isMyReportsTileVisible.value = !isMyReportsTileVisible.value
}
</script>

<template>
    <MyReportsButton @toggleMyReports="toggleReportsVisibility" />
    <MyReportsTile :isVisible="isMyReportsTileVisible" />
</template>
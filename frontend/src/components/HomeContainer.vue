<script setup lang="ts">
import axios from "axios"
import { onMounted, ref } from "vue"
import Map from "@/components/Map.vue"
import MyReportsButton from "@/components/MyReportsButton.vue"
import MyReportsDiv from "@/components/MyReportsDiv.vue"

const isReportsVisible = ref(false)

function toggleReportsVisibility() {
  isReportsVisible.value = !isReportsVisible.value
}
</script>

<template>
  <div class="homeContainer">
    <Map :zoom="12" />
    <MyReportsButton @toggleReports="toggleReportsVisibility" />
    <MyReportsDiv :isVisible="isReportsVisible" />
  </div>
</template>

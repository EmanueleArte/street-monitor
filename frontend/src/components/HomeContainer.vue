<script setup lang="ts">
import axios from "axios"
import { onMounted, ref } from "vue"
import Map from "@/components/Map.vue"
import MyReports from "@/components/MyReports.vue"

</script>

<template>
  <div class="homeContainer">
    <Map :zoom="12" />
    <MyReports />
  </div>
</template>

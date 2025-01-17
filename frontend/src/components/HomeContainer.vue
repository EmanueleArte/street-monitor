<script setup lang="ts">
import axios from "axios"
import { onMounted, ref } from "vue"
import Map from "@/components/Map.vue"

</script>

<template>
  <div class="homeContainer">
    <Map :zoom="12" :usePosition=true />
  </div>
</template>

<script setup lang="ts">
import Map from "@/components/Map.vue"
import NewReport from "@/components/NewReport.vue"

</script>

<template>
  <div class="homeContainer">
    <Map :zoom="12" :usePosition=true></Map>
    <NewReport/>
  </div>
</template>

<style lang="scss">
@use "../style/tailwind" as *;
</style>
<script setup lang="ts">
import Map from "@/components/Map.vue"
import NewReport from "@/components/NewReportTile.vue"

</script>

<template>
  <div class="homeContainer w-screen h-screen">
    <Map class="z-0" :zoom="12" :usePosition=true></Map>
    <NewReport/>
  </div>
</template>

<style lang="scss">

</style>
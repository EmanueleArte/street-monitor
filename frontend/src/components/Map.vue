<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";

const zoom: number = 2;
const center: [number, number] = [47.41322, -1.219482];
</script>

<template>
  <div style="height:600px; width:800px">
    <LMap ref="map" v-model:zoom="zoom" :center="center" :useGlobalLeaflet="false">
      <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
      ></LTileLayer>
    </LMap>
  </div>
</template>

<style scoped lang="scss">

</style>
<script setup lang="ts">
import { LIcon, LMarker } from "@vue-leaflet/vue-leaflet"

const props = defineProps<{
  iconUrl: string,
  iconSize: number,
  lat: number,
  lng: number
}>()

const dynamicSize: [number, number] = [props.iconSize, props.iconSize * 1.15]
const dynamicAnchor: [number, number] = [props.iconSize / 2, props.iconSize * 1.15]
</script>

<template>
  <LMarker :lat-lng="[props.lat, props.lng]">
    <LIcon
        :icon-size="dynamicSize"
        :icon-anchor="dynamicAnchor"
        :icon-url="iconUrl">
    </LIcon>
  </LMarker>
</template>

<style scoped lang="scss">

</style>
<script setup lang="ts">
import { LIcon, LMarker } from "@vue-leaflet/vue-leaflet"

const props = defineProps<{
  iconUrl: string,
  iconSize: number,
  lat: number,
  lng: number,
  alt: string
}>()

const dynamicSize: [number, number] = [props.iconSize, props.iconSize]
const dynamicAnchor: [number, number] = [props.iconSize / 2, props.iconSize * 1.15]
</script>

<template>
  <LMarker :lat-lng="[props.lat, props.lng]" :options="{ alt: alt }">
    <LIcon
        :icon-size="dynamicSize"
        :icon-anchor="dynamicAnchor"
        :icon-url="iconUrl"/>
    <slot/>
  </LMarker>
</template>

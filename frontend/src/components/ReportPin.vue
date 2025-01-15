<script setup lang="ts">
import { ref } from "vue"
import { LIcon, LMarker } from "@vue-leaflet/vue-leaflet"

const props = defineProps<{
  report: any
}>()

const iconSize: number = 64

const dynamicSize: [number, number] = [iconSize, iconSize * 1.15]
const dynamicAnchor: [number, number] = [iconSize / 2, iconSize * 1.15]
</script>

<template>
  <LMarker :lat-lng="[props.report.coordinates[0], props.report.coordinates[1]]">
    <LIcon
        :icon-size="dynamicSize"
        :icon-anchor="dynamicAnchor"
        icon-url="../src/assets/icons/logo.svg">
    </LIcon>
  </LMarker>
</template>

<style scoped lang="scss">

</style>
<script setup lang="ts">
import "leaflet/dist/leaflet.css"
import { LMap, LMarker, LTileLayer, LCircle } from "@vue-leaflet/vue-leaflet"
import type { LeafletEvent } from "leaflet"
import { ref, onUnmounted, onBeforeMount } from "vue"
import { throttle } from "lodash"
import NearMapReportManager from "@/components/NearMapReportManager.vue"
import CenterPin from "@/components/pins/CenterPin.vue"
import { usePositionStore } from "@/stores/position.ts"

const props = defineProps<{
  zoom: number,
  usePosition: boolean,
  position?: [number, number]
}>()
const circleColor = "blue"

const centerToPosition = ref<boolean>(true)
const center = ref<[number, number]>(props.position ? props.position : [44.494887, 11.3426163])
usePositionStore().set(center.value)
const radius = ref<number>(5) // km
const watchId = ref<number | null>(null)
const options = {
  enableHighAccuracy: true,
  timeout: 1000,
  maximumAge: 0
}
const map = ref<typeof LMap | null>(null)

const setMapCenter = () => {
  map.value?.leafletObject?.setView(center.value, props.zoom)
}

const onMapReady = () => {
  setMapCenter()
}

const onMapMoved = throttle((e: LeafletEvent) => {
  if (map.value) {
    centerToPosition.value = false
    const newMapCenter = e.target.getCenter()
    map.value.leafletObject.fitBounds(e.target.getBounds())
    center.value = [newMapCenter.lat, newMapCenter.lng]
  }
}, 10)

const updatePosition = (gps: GeolocationPosition) => {
  usePositionStore().set([gps.coords.latitude, gps.coords.longitude])
  if (centerToPosition.value && props.usePosition) {
    center.value = usePositionStore().position
  }
}

const handleError = (error: GeolocationPositionError) => {
  console.error("Error getting location: ", error)
}

const startWatchingPosition = () => {
  if (!props.position) {
    if (navigator.geolocation && props.usePosition) {
      watchId.value = navigator.geolocation.watchPosition(updatePosition, handleError, options)
    } else {
      console.error("Geolocation is not supported by this browser.")
    }
  }
}

const stopWatchingPosition = () => {
  if (watchId) {
    navigator.geolocation.clearWatch(watchId.value as number)
  }
}

onBeforeMount(startWatchingPosition)
onUnmounted(stopWatchingPosition)
</script>

<template>
  <LMap ref="map" :zoom="zoom" :center="center" :useGlobalLeaflet="false"
        :options="{ zoomControl: false, attributionControl: false }" @ready="onMapReady" @drag="onMapMoved">
    <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
    ></LTileLayer>
    <LMarker :lat-lng="usePositionStore().position"/>
    <CenterPin v-if="center !== usePositionStore().position" :center="center"/>
    <LCircle
        :lat-lng="center"
        :radius="radius * 1000"
        :color="circleColor"
    />
    <NearMapReportManager :lat="center[0]" :lng="center[1]" :radius="radius"/>
  </LMap>
</template>

<style scoped lang="scss">

</style>
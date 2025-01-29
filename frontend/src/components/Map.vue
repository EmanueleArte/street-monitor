<script setup lang="ts">
import "leaflet/dist/leaflet.css"
import { LMap, LMarker, LTileLayer, LCircle, LControl } from "@vue-leaflet/vue-leaflet"
import type { LeafletEvent } from "leaflet"
import { ref, onUnmounted, onBeforeMount, watch } from "vue"
import { throttle } from "lodash"
import NearMapReportManager from "@/components/NearMapReportManager.vue"
import CenterPin from "@/components/pins/CenterPin.vue"
import { usePositionStore } from "@/stores/position.store.ts"
import { coordsEquals } from "@/lib/mapUtility.ts"
import { useReportStore } from "@/stores/report.store"
import FloatingRoundButton from "@/components/buttons/FloatingRoundButton.vue"

const reportStore = useReportStore()

const props = defineProps<{
  zoom: number,
  usePosition: boolean,
  latLng?: [number, number],
  main?: boolean
}>()
const emit = defineEmits(["update:latLng"])

const circleColor = "blue"

const centerToPosition = ref<boolean>(true)
const center = ref<[number, number]>(props.latLng ? props.latLng : [44.494887, 11.3426163])
const radius = ref<number>(5) // km
const watchId = ref<number | null>(null)
const options = {
  enableHighAccuracy: true,
  timeout: 1000,
  maximumAge: 0
}
const map = ref<typeof LMap | null>(null)

watch(() => usePositionStore().positionToMove, (newPosition) => {
  if (newPosition) {
    moveToPosition(newPosition)
  }
}, { deep: true })

const moveToPosition = (pos: [number, number]) => {
  if (props.latLng || usePositionStore().flyMainMap) {
    if (map.value && map.value.leafletObject) {
      center.value = pos
      map.value.leafletObject.flyTo(center.value, props.zoom, {
        animate: true,
        duration: 1
      })
      if (usePositionStore().flyMainMap) {
        usePositionStore().setFlyMainMap(false)
        usePositionStore().positionToMove = [0, 0]
        centerToPosition.value = true
      }
    }
  }
}

const setMapCenter = () => {
  if (map.value) {
    map.value.leafletObject.setView(center.value, props.zoom)
  }
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
    if (props.latLng) {
      emit("update:latLng", center.value)
    }
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
  if (!props.latLng) {
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

function unsetReport() {
  reportStore.setReport(undefined)
}

const recenterToPosition = () => {
  usePositionStore().setFlyMainMap(true)
  usePositionStore().positionToMove = usePositionStore().position
}

onBeforeMount(startWatchingPosition)
onUnmounted(stopWatchingPosition)
</script>

<template>
  <LMap ref="map" :zoom="zoom" :center="center" :useGlobalLeaflet="false"
        :options="{ zoomControl: false, attributionControl: false }" @ready="onMapReady" @drag="onMapMoved"
        @click="unsetReport">
    <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
    ></LTileLayer>
    <LControl position="bottomleft">
      <FloatingRoundButton class="fixed top-52 z-50" @click="recenterToPosition"
                           screenReaderLabel="Center to current position">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="1.5"
             class="size-8 stroke-light">
          <path d="M12 19.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15"
                stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6m0-11V2M4 12H2m10 8v2m8-10h2"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </FloatingRoundButton>
    </LControl>
    <LMarker :lat-lng="usePositionStore().position" :options="{ alt: 'Current position' }"/>
    <CenterPin v-if="!coordsEquals(center, usePositionStore().position)" :center="center"/>
    <LCircle
        :lat-lng="[center[0], center[1]]"
        :radius="radius * 1000"
        :color="circleColor"
    />
    <NearMapReportManager :lat="center[0]" :lng="center[1]" :radius="radius" :main="main"/>
  </LMap>
</template>

<style scoped lang="scss">

</style>
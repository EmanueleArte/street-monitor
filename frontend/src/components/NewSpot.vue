<script setup lang="ts">
import Map from "@/components/Map.vue"
import SimpleLabel from "@/components/utils/SimpleLabel.vue"
import { usePositionStore } from "@/stores/position.store.ts"
import { ref } from "vue"
import SimpleButton from "@/components/buttons/SimpleButton.vue"
import axios from "axios"
import type { IReport } from "@models/reportModel.ts"
import type { IFavoriteSpot } from "@models/favoriteSpotModel.ts"
import { useAuthStore } from "@/stores/auth.store.ts"

const emit = defineEmits(["cancel"])

const posCopy = { ...usePositionStore().position }
const latLng = ref<[number, number]>([posCopy[0], posCopy[1]])
const zoom: number = 12
const label = ref<string>("")

const saveSpot = () => {
  const newSpot: IFavoriteSpot = {
    label: label.value !== "" ? label.value : "Favorite spot",
    coordinates: latLng.value,
  } as IFavoriteSpot
  axios.post<IReport>(`http://localhost:3000/users/${useAuthStore().get()?.username}/favorites`, newSpot)
      .then((res) => console.log(res.data))
      .catch((e) => console.error(e))
  emit("cancel")
}
</script>

<template>
  <div class="p-4 pb-20 space-y-2">
    <h1 class="text-2xl">Insert a new favorite spot</h1>

    <section class="pt-1">
      <div class="flex flex-col w-full">
        <SimpleLabel attachTo="label">Label</SimpleLabel>
        <input type="text" id="label"
               class="rounded-xl p-2 bg-surface-default border border-gray-500 duration-300 focus:outline-none focus-visible:border-primary-600 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-600 sm:text-sm"
               v-model="label"
               placeholder="Label">
      </div>
    </section>

    <section>
      <div class="w-full h-64 mb-8">
        <SimpleLabel attachTo="position">Position</SimpleLabel>
        <Map ref="map" id="position" class="z-0 rounded-xl" :zoom="zoom" :use-position=false
             v-model:latLng="latLng"></Map>
      </div>

      <div class="flex flex-row w-full">
        <div class="flex flex-col w-1/2">
          <SimpleLabel attachTo="lat">Latitude</SimpleLabel>
          <input type="number" id="lat"
                 class="rounded-xl p-2 mr-1 border bg-surface-default border-gray-500 duration-300 focus:outline-none focus-visible:border-primary-600 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-600 sm:text-sm"
                 v-model="latLng[0]"
                 @input="usePositionStore().move(latLng)"
                 placeholder="Latitude">
        </div>
        <div class="flex flex-col w-1/2">
          <SimpleLabel attachTo="lng">Longitude</SimpleLabel>
          <input type="number" id="lng"
                 class="rounded-xl p-2 ml-1 bg-surface-default border border-gray-500 duration-300 focus:outline-none focus-visible:border-primary-600 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-600 sm:text-sm"
                 v-model="latLng[1]"
                 @input="usePositionStore().move(latLng)"
                 placeholder="Longitude">
        </div>
      </div>
    </section>

    <section class="w-full flex justify-end space-x-2 fixed bottom-0 right-0 px-4 py-3 bg-surface-default">
      <SimpleButton
          classes="!bg-surface-default !text-primary-600 border border-primary-600 hover:!bg-primary-100 hover:border-primary-700 hover:!text-primary-700"
          @click="emit('cancel')">
        Cancel
      </SimpleButton>
      <SimpleButton @click="saveSpot">Submit</SimpleButton>
    </section>
  </div>
</template>

<style scoped lang="scss">

</style>
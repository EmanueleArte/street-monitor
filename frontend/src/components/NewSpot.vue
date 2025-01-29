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
import mongoose from "mongoose"
import FormInput from "@/components/inputs/FormInput.vue"

const emit = defineEmits(["cancel"])

const posCopy = { ...usePositionStore().position }
const latLng = ref<[number, number]>([posCopy[0], posCopy[1]])
const zoom: number = 12
const label = ref<string>("")

const saveSpot = () => {
  const newSpot: IFavoriteSpot = {
    _id: new mongoose.Types.ObjectId(),
    label: label.value !== "" ? label.value : "Favorite spot",
    coordinates: latLng.value,
  } as IFavoriteSpot
  axios.post<IReport>(`http://localhost:3000/users/${useAuthStore().get()?.username}/favorites`, newSpot)
      .catch((e) => console.error(e))
  emit("cancel")
}
</script>

<template>
  <div class="p-4 pb-20 space-y-2">
    <h1 class="text-2xl">Insert a new favorite spot</h1>

    <section class="pt-1">
      <div class="flex flex-col w-full">
        <FormInput label="spot label" fieldName="spot-label" :modelValue="label"
                   @input="(text) => label = text.target.value"/>
      </div>
    </section>

    <section>
      <div class="w-full h-64 mb-8">
        <SimpleLabel attachTo="position">Position</SimpleLabel>
        <Map ref="map" id="position" class="z-0 rounded-xl" :zoom="zoom" :use-position=false
             v-model:latLng="latLng"></Map>
      </div>

      <div class="flex flex-row w-full">
        <div class="flex flex-col w-1/2 pr-1">
          <FormInput type="number" label="latitude" fieldName="lat" :modelValue="latLng[0]" @input="(lat) => {
            latLng[0] = Number.parseFloat(lat.target.value)
            usePositionStore().move(latLng)
          }"/>
        </div>
        <div class="flex flex-col w-1/2 pl-1">
          <FormInput type="number" label="longitude" fieldName="lng" :modelValue="latLng[1]" @input="(lng) => {
            latLng[1] = Number.parseFloat(lng.target.value)
            usePositionStore().move(latLng)
          }"/>
        </div>
      </div>
    </section>

    <section
        class="w-full flex justify-end space-x-2 fixed bottom-0 right-0 px-4 py-3 bg-surface-default md:max-w-[50vw] md:right-4">
      <SimpleButton
          :outline=true
          screenReaderLabel="Cancel favorite spot creation"
          @click="emit('cancel')">
        Cancel
      </SimpleButton>
      <SimpleButton screenReaderLabel="Submit favorite spot creation" @click="saveSpot">Submit</SimpleButton>
    </section>
  </div>
</template>

<style scoped lang="scss">

</style>
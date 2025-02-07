<script setup lang="ts">
import { onMounted, ref } from "vue"
import type { IFavoriteSpot } from "@models/favoriteSpotModel.ts"
import { useAuthStore } from "@/stores/auth.store.ts"
import axios from "axios"
import SpotPin from "@/components/pins/SpotPin.vue"
import { usePositionStore } from "@/stores/position.store.ts"

defineProps<{
  main?: boolean
}>()
import { storeToRefs } from "pinia"

const { favorite_spots } = storeToRefs(useAuthStore())

const listMySpots = async () => {
  axios.get<IFavoriteSpot[]>(`http://localhost:3000/users/${useAuthStore().get()?.username}/favorites`)
    .then(res => favorite_spots.value = res.data)
    .catch(err => console.error(err))
}

onMounted(listMySpots)
</script>

<template>
  <SpotPin v-for="spot in favorite_spots" :spot="spot" @click="() => {
    if (main) {
      usePositionStore().setFlyMainMap(true)
      usePositionStore().move(spot.coordinates)
    }
  }" />
</template>

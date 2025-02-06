<script setup lang="ts">
import { onMounted, ref } from "vue"
import type { IFavoriteSpot } from "@models/favoriteSpotModel.ts"
import { useAuthStore } from "@/stores/auth.store.ts"
import axios from "axios"
import SpotPin from "@/components/pins/SpotPin.vue"
import { usePositionStore } from "@/stores/position.store.ts"
import { storeToRefs } from "pinia"

const { favorite_spots } = storeToRefs(useAuthStore())

const listMySpots = async () => {
  try {
    favorite_spots.value = (await axios.get(`http://localhost:3000/users/${useAuthStore().get()?.username}/favorites`)).data
  } catch (e) {
    // console.error(e)
  }
}

onMounted(listMySpots)
</script>

<template>
  <SpotPin v-for="spot in favorite_spots" :spot="spot" @click="() => {
    usePositionStore().setFlyMainMap(true)
    usePositionStore().move(spot.coordinates)
  }"/>
</template>

<style scoped lang="scss">

</style>
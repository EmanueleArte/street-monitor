<script setup lang="ts">
import type { IFavoriteSpot } from '@models/favoriteSpotModel';
import SpotCard from '@/components/SpotCard.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/auth.store';

const mySpots = ref<IFavoriteSpot[]>([])
const authStore = useAuthStore()

const listMySpots = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/users/${authStore.get()?.username}/favorites`)
    mySpots.value = response.data
  } catch (e) {
    console.error(e)
  }
}

onMounted(listMySpots)
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl">My favorite spots:</h1>

    <div class="flex flex-wrap max-h-[100%] overflow-y-auto mt-2 pb-4">
      <SpotCard @updateTiles="listMySpots" v-for="spot in mySpots" :spot="spot"/>
      <p v-if="mySpots.length == 0" class="text-center w-full mt-6">You don't have any favorite spots.</p>
    </div>
  </div>
</template>
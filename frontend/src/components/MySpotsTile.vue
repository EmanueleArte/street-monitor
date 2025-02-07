<script setup lang="ts">
import type { IFavoriteSpot } from '@models/favoriteSpotModel';
import SpotCard from '@/components/SpotCard.vue';
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore()
const { favorite_spots } = storeToRefs(authStore)

const listMySpots = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/users/${authStore.get()?.username}/favorites`)
    favorite_spots.value = response.data
  } catch (e) {
    console.error(e)
  }
}

onMounted(listMySpots)
</script>

<template>
  <div class="h-full p-4 md:h-fit md:p-0">
    <h1 class="text-2xl mb-2 md:hidden">My favorite spots:</h1>
    <ul class="pb-10
    grid grid-cols-2 gap-2 content-start relative pe-0.5
    max-h-[100%] overflow-y-scroll
    md:flex md:max-w-[60vw] md:overflow-y-hidden md:overflow-x-auto">
      <li v-for="spot in favorite_spots" class="flex flex-col justify-top">
        <SpotCard @updateTiles="listMySpots" :spot="spot"/>
      </li>
    </ul>
    <p v-if="favorite_spots.length == 0" class="text-center w-full mt-6 md:hidden">You don't have any favorite spots.</p>
  </div>
</template>

<style>
/* Hide scrollbar for IE, Edge and Firefox */
ul {
  -ms-overflow-style: none;
  scrollbar-width: none;

  /* Hide scrollbar for Chrome, Safari and Opera */

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>

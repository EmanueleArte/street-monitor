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
    <ul class="
    grid grid-cols-2 gap-2 content-start relative pe-0.5
    max-h-[100%] overflow-y-scroll
    md:flex md:overflow-y-hidden md:overflow-x-auto
    ">
        <li v-for="spot in mySpots" class="flex flex-col justify-center">
            <SpotCard @updateTiles="listMySpots" :spot="spot" />
        </li>
        <li v-for="spot in mySpots" class="flex flex-col justify-center">
            <SpotCard @updateTiles="listMySpots" :spot="spot" />
        </li>
        <li v-for="spot in mySpots" class="flex flex-col justify-center">
            <SpotCard @updateTiles="listMySpots" :spot="spot" />
        </li>
    </ul>
    <p v-if="mySpots.length == 0" class="text-center w-full md:hidden">You don't have any favorite spots.</p>
</template>

<style>
/* Hide scrollbar for Chrome, Safari and Opera */
ul::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
ul {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
</style>

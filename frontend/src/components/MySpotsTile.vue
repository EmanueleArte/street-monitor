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
    <div class="flex flex-wrap max-h-[100%] overflow-y-auto">
        <SpotCard @updateTiles="listMySpots" v-for="spot in mySpots" :spot="spot" />
    </div>
</template>
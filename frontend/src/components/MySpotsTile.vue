<script setup lang="ts">
import type { IFavoriteSpot } from '@models/favoriteSpotModel';
import SpotCard from '@/components/SpotCard.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const mySpots = ref<IFavoriteSpot[]>([])

const listMySpots = async () => {
    try {
        const response = await axios.get('http://localhost:3000/users/mariorossi/favorites') //TODO cambiare user (mariorossi) con user corrente loggato
        mySpots.value = response.data
        console.log(mySpots.value)
    } catch (e) {
        console.error(e)
    }
}

onMounted(listMySpots)
</script>

<template>
    <div class="flex flex-wrap max-h-[100%] overflow-y-auto">
        <SpotCard v-for="spot in mySpots" :spot="spot" />
    </div>
</template>
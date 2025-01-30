<script setup lang="ts">
import type { IFavoriteSpot } from '@models/favoriteSpotModel';
import { type PropType } from 'vue';
import SimpleButton from '@/components/buttons/SimpleButton.vue';
import axios from 'axios';
import { usePositionStore } from '@/stores/position.store';
import { useAuthStore } from '@/stores/auth.store';

const props = defineProps({
    spot: { type: Object as PropType<IFavoriteSpot>, required: true }
})

const emits = defineEmits(["updateTiles"])

const positionStore = usePositionStore()
const authStore = useAuthStore()

const deleteSpot = async () => {
    try {
        const response = await axios.delete(`http://localhost:3000/users/${authStore.get()?.username}/favorites/${props.spot._id}`)
        if(response.status === 200) {
            emits("updateTiles")
        }
    } catch (e) {
        console.error(e)
    }
}

const moveToSpot = () => {
    positionStore.setFlyMainMap(true)
    positionStore.move(props.spot.coordinates)
}
</script>

<template>
    <article class="w-[calc(50%-1rem)] p-3 m-2 rounded-lg bg-surface-component shadow-xl">
        <div class="flex items-center justify-center mb-1 w-full">
            <p class="basis-[80%]">{{ spot.label }}</p>
            <SimpleButton @click="deleteSpot" class="!bg-surface-component border-none !rounded-lg basis-[20%] !p-0 flex justify-center items-center">
                <img src="@/assets/icons/recycle_bin.svg" alt="recycle bin icon" class="w-4 h-4" />
            </SimpleButton>
        </div>
        <p class="text-[0.7rem]"> Lat: {{ spot.coordinates[0] }}</p>
        <p class="text-[0.7rem] mb-2"> Lon: {{ spot.coordinates[1] }}</p>
        <SimpleButton @click="moveToSpot" class="text-[0.7rem] !px-2 !py-1 !rounded-lg">Go to spot</SimpleButton>
    </article>
</template>
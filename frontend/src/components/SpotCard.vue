<script setup lang="ts">
import type { IFavoriteSpot } from '@models/favoriteSpotModel';
import { onMounted, ref, type PropType } from 'vue';
import SimpleButton from './buttons/SimpleButton.vue';
import axios from 'axios';
import { usePositionStore } from '@/stores/position.store';

const props = defineProps({
    spot: { type: Object as PropType<IFavoriteSpot>, required: true }
})

const positionStore = usePositionStore()

const deleteSpot = async () => {
    console.log(props.spot)
    try {
        await axios.delete(`http://localhost:3000/users/mariorossi/favorites/${props.spot._id}`) //TODO cambiare user (mariorossi) con user corrente loggato
    } catch (e) {
        console.error(e)
    }
}

const debug = () => {
    console.log(props.spot)
}

const moveToSpot = () => {
    positionStore.setFlyMainMap(true)
    positionStore.move(props.spot.coordinates)
}

onMounted(debug)
</script>

<template>
    <article class="w-[calc(50%-1rem)] p-3 m-2 rounded-lg bg-surface-component shadow-xl">
        <div class="flex items-center justify-center mb-1 w-full">
            <p class="basis-[80%]">{{ spot.label }}</p>
            <SimpleButton @click="deleteSpot" classes="!bg-surface-component border-none !rounded-lg basis-[20%] !p-0 flex justify-center items-center">
                <img src="@/assets/icons/recycle_bin.svg" alt="recycle bin icon" class="w-4 h-4" />
            </SimpleButton>
        </div>
        <p class="text-[0.7rem]"> Lat: {{ spot.coordinates[0] }}</p>
        <p class="text-[0.7rem] mb-2"> Lon: {{ spot.coordinates[1] }}</p>
        <!--SimpleButton classes="!bg-light !text-primary-600 border border-primary-600 hover:!bg-primary-100 hover:border-primary-700 hover:!text-primary-700 text-[0.7rem] !px-2 !py-1 mr-1 !rounded-lg">Edit</SimpleButton-->
        <SimpleButton @click="moveToSpot" classes="text-[0.7rem] !px-2 !py-1 !rounded-lg">Go to spot</SimpleButton>
    </article>
</template>
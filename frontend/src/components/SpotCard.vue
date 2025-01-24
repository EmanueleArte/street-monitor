<script setup lang="ts">
import type { IFavoriteSpot } from '@models/favoriteSpotModel';
import type { PropType } from 'vue';
import SimpleButton from './buttons/SimpleButton.vue';

defineProps({
    spot: { type: Object as PropType<IFavoriteSpot>, required: true }
})
</script>

<template>
    <article class="w-[calc(50%-1rem)] p-3 m-2 rounded-lg bg-surface-component shadow-xl">
        <div class="flex items-center mb-1">
            <p>{{ spot.label }}</p>
            <SimpleButton classes="!bg-light !text-primary-600 border-none hover:!bg-primary-100 hover:border-primary-700 hover:!text-primary-700 text-[0.7rem] !px-2 !py-1 ml-auto !rounded-lg">D</SimpleButton>
        </div>
        <p class="text-[0.7rem]"> Lat: {{ spot.coordinates[0] }}</p>
        <p class="text-[0.7rem] mb-2"> Lon: {{ spot.coordinates[1] }}</p>
        <SimpleButton classes="!bg-light !text-primary-600 border border-primary-600 hover:!bg-primary-100 hover:border-primary-700 hover:!text-primary-700 text-[0.7rem] !px-2 !py-1 mr-1 !rounded-lg">Edit</SimpleButton>
        <SimpleButton classes="text-[0.7rem] !px-2 !py-1 !rounded-lg">Go to spot</SimpleButton>
    </article>
</template>
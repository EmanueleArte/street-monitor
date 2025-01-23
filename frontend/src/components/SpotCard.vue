<script setup lang="ts">
import type { IFavoriteSpot } from '@models/favoriteSpotModel';
import type { PropType } from 'vue';

defineProps({
    spot: { type: Object as PropType<IFavoriteSpot>, required: true }
})
</script>

<template>
    <article class="w-[calc(50%-1rem)] h-fit p-1 m-2 rounded-lg bg-surface-component border-2 border-primary-700">
        <p class="text-lg">{{ spot.label }}</p>
        <p class="text-xs"> Lat: {{ spot.coordinates[0] }}</p>
        <p class="text-xs"> Lon: {{ spot.coordinates[1] }}</p>
    </article>
</template>
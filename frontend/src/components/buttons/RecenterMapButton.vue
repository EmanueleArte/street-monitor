<script setup lang="ts">
import { usePositionStore } from '@/stores/position.store';
import FloatingRoundButton from './FloatingRoundButton.vue';
import NavButton from '../NavButton.vue';

const recenterToPosition = () => {
    usePositionStore().setFlyMainMap(true)
    usePositionStore().positionToMove = usePositionStore().position
}
</script>

<template>
    <FloatingRoundButton screen-reader-label="recenter map to initial position" class="fixed bottom-28 left-4 md:hidden" @click="recenterToPosition">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="1.5"
            class="size-8 stroke-light">
            <path d="M12 19.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6m0-11V2M4 12H2m10 8v2m8-10h2" stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>
    </FloatingRoundButton>

    <NavButton screen-reader-label="recenter map to initial position" class="hidden md:block md:absolute right-3 bottom-20 z-5" @click="recenterToPosition">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="1.5"
            class="size-6 stroke-black/80 m-auto">
            <path d="M12 19.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6m0-11V2M4 12H2m10 8v2m8-10h2" stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>
    </NavButton>
</template>
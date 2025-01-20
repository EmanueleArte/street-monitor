<script setup lang="ts">
import { ref } from "vue"
import MyReportsButton from "@/components/buttons/MyReportsButton.vue"
import MyReportsTile from "@/components/MyReportsTile.vue"
import Tile from "@/components/Tile.vue"

const showReportTile = ref<boolean>(false)
const transitionCompleted = ref<boolean>(true)

const toggleReportsVisibility = () => {
    showReportTile.value = !showReportTile.value
    if (!showReportTile.value) {
        transitionCompleted.value = false
    }
}

const handleTransitionCompleted = () => {
  transitionCompleted.value = true
}

</script>

<template>
    <MyReportsButton v-if="!showReportTile && transitionCompleted" @toggleMyReports="toggleReportsVisibility" />
    <transition name="slide-bottom" @afterLeave="handleTransitionCompleted">
        <div v-if="showReportTile" class="container fixed bottom-0 h-[60%]">
            <button class="absolute -top-20 left-4 w-16 h-16 bg-main-600 rounded-full shadow-lg flex items-center justify-center z-1"
                    @click="toggleReportsVisibility">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="white" class="size-8 rotate-45">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"/>
                </svg>
            </button>
            <Tile class="h-[100%] z-10 p-2">
                <MyReportsTile />
            </Tile>
        </div>
    </transition>
</template>

<style scoped lang="scss">
.slide-bottom-enter-active, .slide-bottom-leave-active {
    transition: transform 0.5s ease;
}
.slide-bottom-enter-from, .slide-bottom-leave-to {
    transform: translateY(100%);
}
</style>
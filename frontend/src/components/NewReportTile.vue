<script setup lang="ts">
import FloatingRoundButton from "@/components/buttons/FloatingRoundButton.vue"
import Tile from "@/components/Tile.vue"
import NewReport from "@/components/NewReport.vue"
import { ref } from "vue"

const showTile = ref<boolean>(false)
const transitionCompleted = ref<boolean>(true)

const toggleTile = () => {
  showTile.value = !showTile.value
  if (!showTile.value) {
    transitionCompleted.value = false
  }
}

const handleTransitionCompleted = () => {
  transitionCompleted.value = true
}
</script>

<template>
  <FloatingRoundButton v-if="!showTile && transitionCompleted" class="z-1 fixed bottom-32 right-4" @click="toggleTile">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white"
         class="size-8">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
    </svg>
  </FloatingRoundButton>
  <transition name="slide-bottom" @afterLeave="handleTransitionCompleted">
    <div v-if="showTile" class="container fixed bottom-0 z-10">
      <FloatingRoundButton class="z-1 absolute -top-20 right-4 " @click="toggleTile">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white"
             class="size-8 rotate-45">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
        </svg>
      </FloatingRoundButton>
      <Tile class="z-10 bottom-0 max-h-[80vh] overflow-auto">
        <NewReport @toggle-tile="toggleTile"/>
      </Tile>
    </div>
  </transition>
</template>

<style scoped lang="scss">
// Button icon rotation
.slide-bottom-enter-active svg, .slide-bottom-leave-active svg {
  transition: transform 0.5s;
}

.slide-bottom-enter-from svg {
  transform: rotate(0deg);
}

.slide-bottom-enter-to svg {
  transform: rotate(45deg);
}

.slide-bottom-leave-from svg {
  transform: rotate(45deg);
}

.slide-bottom-leave-to svg {
  transform: rotate(0deg);
}

// Tile slide from bottom animation
.slide-bottom-enter-active, .slide-bottom-leave-active {
  transition: transform 0.5s;
}

.slide-bottom-enter-from {
  transform: translateY(100%);
}

.slide-bottom-leave-to {
  transform: translateY(100%);
}
</style>
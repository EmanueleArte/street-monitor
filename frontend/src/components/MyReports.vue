<script setup lang="ts">
import { ref } from "vue"
import MyReportsTile from "@/components/MyReportsTile.vue"
import Tile from "@/components/Tile.vue"
import SlideFromBottom from "@/components/transitions/SlideFromBottom.vue"
import FloatingRoundButton from "@/components/buttons/FloatingRoundButton.vue"
import BottomButton from "./buttons/BottomButton.vue"

const showReportTile = ref<boolean>(false)

const toggleReportsVisibility = () => {
  showReportTile.value = !showReportTile.value
}
</script>

<template>
  <BottomButton class="absolute bottom-2 left-6 h-24 w-40 z-1 bg-primary-600 text-xl text-light rounded-xl" @click="toggleReportsVisibility" :text="'My Reports'" />
  <SlideFromBottom>
    <div v-if="showReportTile" class="container fixed bottom-0 z-20 h-[60%]">
      <FloatingRoundButton
          class="absolute -top-20 left-4"
          @click="toggleReportsVisibility">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="white" class="rotating size-8 rotate-45">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"/>
        </svg>
      </FloatingRoundButton>
      <Tile class="h-[100%] z-10 p-2 pb-0">
        <MyReportsTile/>
      </Tile>
    </div>
  </SlideFromBottom>
</template>

<style scoped lang="scss">
@use "../style/transitions" as *;
</style>
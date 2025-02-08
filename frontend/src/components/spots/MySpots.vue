<script setup lang="ts">
import BottomButton from "@/components/buttons/BottomButton.vue"
import Tile from "@/components/utils/Tile.vue"
import SlideFromBottom from "@/components/transitions/SlideFromBottom.vue"
import FloatingRoundButton from "@/components/buttons/FloatingRoundButton.vue"
import MySpotsTile from "@/components/spots/MySpotsTile.vue"
import { onMounted, onUpdated, ref } from "vue"

const props = defineProps({
  showMySpots: { type: Boolean }
})
const emit = defineEmits<{
  (e: "update:showMySpots", showMySpots: boolean): void
}>()

const showSpotsTile = ref<boolean>(false)

const toggleSpotsVisibility = () => {
  showSpotsTile.value = !showSpotsTile.value
  emit("update:showMySpots", showSpotsTile.value)
}

const checkIfShowMySpots = () => {
  if (props.showMySpots) {
    showSpotsTile.value = true
  }
}

onUpdated(checkIfShowMySpots)

const handleClickOutside = (event: MouseEvent) => {
  if (showSpotsTile.value && (event.target as Element).closest(".nav-button")) {
    toggleSpotsVisibility()
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside)
})
</script>

<template>
  <BottomButton class="right-2 md:hidden" @click="toggleSpotsVisibility" text="My Spots"/>
  <SlideFromBottom>
    <div v-if="showSpotsTile" class="container fixed bottom-0 z-20 h-[45%]">
      <FloatingRoundButton
          class="absolute -top-20 left-4"
          @click="toggleSpotsVisibility"
          screenReaderLabel="Close my spots"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             class="rotating size-8 rotate-45 stroke-light">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"/>
        </svg>
      </FloatingRoundButton>

      <Tile class="h-full z-10 p-2 pb-0">
        <MySpotsTile/>
      </Tile>
    </div>
  </SlideFromBottom>
</template>

<style scoped lang="scss">
@use "../../style/transitions" as *;
</style>
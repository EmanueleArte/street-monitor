<script setup lang="ts">
import BottomButton from "@/components/buttons/BottomButton.vue"
import Tile from "@/components/Tile.vue"
import SlideFromBottom from "@/components/transitions/SlideFromBottom.vue"
import FloatingRoundButton from "@/components/buttons/FloatingRoundButton.vue"
import MySpotsTile from "@/components/MySpotsTile.vue"
import { onUpdated, ref } from "vue"

const showSpotsTile = ref<boolean>(false)

const props = defineProps({
  showMySpots: { type: Boolean }
})

const toggleSpotsVisibility = () => {
  showSpotsTile.value = !showSpotsTile.value
}

const checkIfShowMySpots = () => {
  if (props.showMySpots) {
    showSpotsTile.value = true
  }
}

onUpdated(checkIfShowMySpots)
</script>

<template>
    <BottomButton class="right-6" @click="toggleSpotsVisibility" :text="'My Spots'" />
    <SlideFromBottom>
        <div v-if="showSpotsTile" class="container fixed bottom-0 z-20 h-[45%]">
            <FloatingRoundButton
              class="absolute -top-20 left-4"
              @click="toggleSpotsVisibility">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  class="rotating size-8 rotate-45 stroke-light">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"/>
                </svg>
            </FloatingRoundButton>
            <Tile class="h-[100%] z-10 p-2 pb-0">
                <MySpotsTile/>
            </Tile>
        </div>
    </SlideFromBottom>
</template>

<style scoped lang="scss">
@use "../style/transitions" as *;
</style>
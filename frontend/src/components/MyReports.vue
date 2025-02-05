<script setup lang="ts">
import { onMounted, onUpdated, ref } from "vue"
import MyReportsTile from "@/components/MyReportsTile.vue"
import Tile from "@/components/Tile.vue"
import SlideFromBottom from "@/components/transitions/SlideFromBottom.vue"
import FloatingRoundButton from "@/components/buttons/FloatingRoundButton.vue"
import BottomButton from "./buttons/BottomButton.vue"

const props = defineProps({
  showMyReports: { type: Boolean }
})
const emit = defineEmits<{
  (e: "update:showMyReports", showMyReports: boolean): void
}>()

const showReportTile = ref<boolean>(false)

const toggleReportsVisibility = () => {
  showReportTile.value = !showReportTile.value
  emit("update:showMyReports", showReportTile.value)
}

const checkIfShowMyReports = () => {
  if (props.showMyReports) {
    showReportTile.value = true
  }
}

onUpdated(checkIfShowMyReports)

const handleClickOutside = (event: MouseEvent) => {
  if (showReportTile.value && (event.target as Element).closest(".nav-button")) {
    toggleReportsVisibility()
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside)
})
</script>

<template>
  <BottomButton class="left-2 md:hidden" @click="toggleReportsVisibility" text="My Reports"/>
  <SlideFromBottom>
    <div v-if="showReportTile" class="container fixed bottom-0 z-20 h-[60%]">
      <FloatingRoundButton
          class="absolute -top-20 left-4"
          @click="toggleReportsVisibility">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             class="rotating size-8 rotate-45 stroke-light">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"/>
        </svg>
      </FloatingRoundButton>

      <Tile class="h-full flex flex-col z-10 pb-0">
        <MyReportsTile/>
      </Tile>
    </div>
  </SlideFromBottom>
</template>

<style scoped lang="scss">
@use "../style/transitions" as *;
</style>
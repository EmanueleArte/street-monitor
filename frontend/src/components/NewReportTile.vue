<script setup lang="ts">
import FloatingRoundButton from "@/components/buttons/FloatingRoundButton.vue"
import Tile from "@/components/Tile.vue"
import NewReport from "@/components/NewReport.vue"
import { ref } from "vue"
import SlideFromBottom from "@/components/transitions/SlideFromBottom.vue"
import Tabs from "@/components/utils/Tabs.vue"
import { TabPanel } from "@headlessui/vue"
import NewSpot from "@/components/NewSpot.vue"

const showTile = ref<boolean>(false)
const transitionCompleted = ref<boolean>(true)
const contents = {
  NEW_REPORT: "New report",
  NEW_SPOT: "New spot"
}

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
  <SlideFromBottom>
    <FloatingRoundButton v-if="!showTile && transitionCompleted" class="z-10 fixed bottom-28 right-4 md:right-8"
                         screenReaderLabel="Open new report tile" @click="toggleTile">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
           class="size-8 stroke-light">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
      </svg>
    </FloatingRoundButton>
  </SlideFromBottom>
  <SlideFromBottom @onCompleted="handleTransitionCompleted">
    <div v-if="showTile" class="container fixed bottom-0 z-10 md:max-w-[50vw] md:right-4">
      <FloatingRoundButton class="absolute -top-[4.5rem] right-4" screenReaderLabel="Close tile" @click="toggleTile">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             class="rotating size-8 rotate-45 stroke-light">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
        </svg>
      </FloatingRoundButton>
      <Tile class="bottom-0 h-[85vh] overflow-auto md:h-[80vh]">
        <Tabs :tabs="contents" :toggleTabList="() => {}" topDivClasses="!pt-6">
          <TabPanel>
            <NewReport @cancel="toggleTile"/>
          </TabPanel>
          <TabPanel>
            <NewSpot @cancel="toggleTile"/>
          </TabPanel>
        </Tabs>
      </Tile>
    </div>
  </SlideFromBottom>
</template>

<style scoped lang="scss">
@use "../style/transitions" as *;
</style>
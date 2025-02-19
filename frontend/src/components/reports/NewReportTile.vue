<script setup lang="ts">
import FloatingRoundButton from "@/components/buttons/FloatingRoundButton.vue"
import Tile from "@/components/utils/Tile.vue"
import NewReport from "@/components/reports/NewReport.vue"
import { onMounted, ref } from "vue"
import SlideFromBottom from "@/components/transitions/SlideFromBottom.vue"
import Tabs from "@/components/utils/Tabs.vue"
import { TabPanel } from "@headlessui/vue"
import NewSpot from "@/components/spots/NewSpot.vue"
import SimpleButton from "../buttons/SimpleButton.vue"
import { WIDTH_MD } from "@/lib/vars.ts"

const activeTile = ref<string>()
const showTile = ref<boolean>(false)
const transitionCompleted = ref<boolean>(true)
const contents = {
  NEW_REPORT: "New report",
  NEW_SPOT: "New spot"
}
const isMobile: boolean = window.innerWidth <= WIDTH_MD

const toggleTile = (toggledTile: string | undefined): void => {
  showTile.value = !showTile.value
  activeTile.value = toggledTile
  if (!showTile.value) {
    transitionCompleted.value = false
  }
}

const handleTransitionCompleted = () => {
  transitionCompleted.value = true
}

const handleClickOutside = (event: MouseEvent) => {
  if (showTile.value && activeTile.value && (event.target as Element).closest(".nav-button")) {
    toggleTile(undefined)
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside)
})
</script>

<template>
  <!-- Mobile version -->
  <div v-if="isMobile">
    <SlideFromBottom>
      <FloatingRoundButton v-if="!showTile && transitionCompleted" class="md:hidden z-10 fixed bottom-[6.5rem] right-2"
                           screenReaderLabel="Open new report tile" @click="toggleTile"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             class="size-8 stroke-light">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
        </svg>
      </FloatingRoundButton>
    </SlideFromBottom>
    <SlideFromBottom @onCompleted="handleTransitionCompleted" class="z-30">
      <div v-if="showTile" class="container fixed bottom-0 z-10 md:hidden">
        <FloatingRoundButton class="absolute -top-[4.5rem] right-2" screenReaderLabel="Close tile" @click="toggleTile">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               class="rotating size-8 rotate-45 stroke-light">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
          </svg>
        </FloatingRoundButton>
        <Tile class="new-report-tile bottom-0 h-[85vh] overflow-auto md:h-[80vh]">
          <Tabs :tabs="contents" :toggleTabList="() => {}" topDivClasses="!pt-6 px-4">
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
  </div>

  <!-- Desktop version -->
  <ul v-if="!isMobile" class="hidden md:absolute md:z-30 md:bottom-3 md:right-3 md:flex md:gap-2 flex-row-reverse">
    <li>
      <SlideFromBottom>
        <SimpleButton v-if="!showTile && transitionCompleted" screenReaderLabel="Open new report tile"
                      class="border border-primary-600 hover:border-primary-700"
                      @click="() => toggleTile('reports')"
        >
          New report
        </SimpleButton>
      </SlideFromBottom>
      <SlideFromBottom @on-completed="handleTransitionCompleted">
        <div v-if="showTile && activeTile == 'reports'"
             class="container fixed bottom-0 z-10 md:max-w-[30vw] md:right-4"
        >
          <FloatingRoundButton class="absolute -top-[4.5rem] right-4" screenReaderLabel="Close tile"
                               @click="toggleTile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 class="rotating size-8 rotate-45 stroke-light">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
            </svg>
          </FloatingRoundButton>

          <Tile class="bottom-0 overflow-auto md:h-[80vh] md:w-[30vw]">
            <Tabs :tabs="{}" :toggleTabList="() => {}">
              <TabPanel>
                <NewReport @cancel="toggleTile"/>
              </TabPanel>
            </Tabs>
          </Tile>
        </div>
      </SlideFromBottom>
    </li>
    <li>
      <SlideFromBottom>
        <SimpleButton :outline="true" v-if="!showTile && transitionCompleted" screenReaderLabel="Open new report tile"
                      @click="() => toggleTile('spots')"
        >
          New spot
        </SimpleButton>
      </SlideFromBottom>
      <SlideFromBottom @on-completed="handleTransitionCompleted">
        <div v-if="showTile && activeTile == 'spots'" class="container fixed bottom-0 z-10 md:max-w-[30vw] md:right-4">
          <FloatingRoundButton class="absolute -top-[4.5rem] right-4" screenReaderLabel="Close tile"
                               @click="toggleTile">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 class="rotating size-8 rotate-45 stroke-light">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
            </svg>
          </FloatingRoundButton>

          <Tile class="bottom-0 overflow-auto md:h-[70vh] md:w-[30vw]">
            <Tabs :tabs="{}" :toggleTabList="() => {}">
              <TabPanel>
                <NewSpot @cancel="toggleTile"/>
              </TabPanel>
            </Tabs>
          </Tile>
        </div>
      </SlideFromBottom>
    </li>
  </ul>
</template>

<style scoped lang="scss">
@use "../../style/transitions" as *;
</style>
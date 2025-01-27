<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels } from "@headlessui/vue"

defineProps<{
  tabs: { [key: string]: string },
  toggleTabList: (s: string) => void,
  tabPanelsClasses?: string,
  topDivClasses?: string
}>()
</script>

<template>
  <div :class="[topDivClasses, 'w-full pt-4 px-4']">
    <TabGroup>
      <TabList class="flex space-x-1 rounded-2xl bg-primary-100 p-1">
        <Tab
            v-for="tab in Object.values(tabs)"
            as="template"
            :key="tab"
            v-slot="{ selected }"
        >
          <button
              :class="[
              'w-full rounded-xl py-1.5 text-sm font-medium leading-5' +
              'focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-600 ' +
               'focus:outline-none focus:ring-2 duration-200',
              selected
                ? 'bg-primary-600 text-light shadow'
                : 'text-primary-600 hover:bg-primary-600/[0.08] hover:text-primary-700',
            ]"
              @click="toggleTabList(tab)"
          >
            {{ tab.charAt(0).toUpperCase() + tab.slice(1) }}
          </button>
        </Tab>
      </TabList>

      <TabPanels :class="[tabPanelsClasses, 'mt-2']">
        <slot></slot>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<style scoped lang="scss">

</style>
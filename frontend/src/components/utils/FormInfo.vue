<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue"

const props = defineProps<{
  suggestions?: string[]
}>()
</script>

<template>
  <Popover class="relative inline-grid">
    <PopoverButton>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
        <path fill-rule="evenodd"
              d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM9 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM6.75 8a.75.75 0 0 0 0 1.5h.75v1.75a.75.75 0 0 0 1.5 0v-2.5A.75.75 0 0 0 8.25 8h-1.5Z"
              clip-rule="evenodd"/>
      </svg>
    </PopoverButton>

    <PopoverPanel
        class="absolute left-1/2 z-10 mt-3 w-64 max-w-sm -translate-x-1/2 transform px-4 bottom-1/4 -translate-y-1/4 sm:px-0 lg:max-w-3xl"
    >
      <div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
        <div class="relative grid gap-8 bg-surface-default p-4 text-xs">
          <ul>
            <li v-for="suggestion in props.suggestions">{{ suggestion }}</li>
          </ul>
        </div>
      </div>
    </PopoverPanel>
  </Popover>
</template>
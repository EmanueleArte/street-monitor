<script setup lang="ts">
import { PopoverPanel } from '@headlessui/vue';
</script>

<template>
    <PopoverPanel class="absolute left-1/2 z-10 mt-3 w-64 max-w-sm -translate-x-1/2 transform px-4 bottom-1/4 -translate-y-1/4 sm:px-0 lg:max-w-3xl">
        <div class="overflow-hidden rounded shadow-lg ring-1 ring-black/5">
            <div class="relative grid gap-8 bg-surface-default p-2 text-xs">
                <slot />
            </div>
        </div>
    </PopoverPanel>
</template>
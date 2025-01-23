<script setup lang="ts">
const props = defineProps<{
  screenReaderLabel: string
}>()
</script>

<template>
  <button type="button"  class="
  relative rounded-full p-1 
  hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black
  md:bg-surface-default md:shadow md:w-10 md:aspect-square md:p-auto
  md:hover:shadow-md md:hover:bg-surface-component md:hover:text-dark-default
  ">
    <span class="absolute -inset-1.5"></span>
    <span class="sr-only">{{ props.screenReaderLabel }}</span>
    
    <slot />
  </button>
</template>

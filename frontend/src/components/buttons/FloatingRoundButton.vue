<script setup lang="ts">
defineProps<{
  screenReaderLabel?: string,
  classes?: string
}>()
</script>

<template>
  <button :class="[classes,
      'w-16 h-16 bg-primary-600 hover:bg-primary-700 text-light duration-300 rounded-full shadow-lg flex items-center justify-center md:w-14 md:h-14']"
  >
    <span class="sr-only">{{ screenReaderLabel }}</span>
    <slot></slot>
  </button>
</template>

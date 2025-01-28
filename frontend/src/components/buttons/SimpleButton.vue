<script setup lang="ts">
defineProps<{
  screenReaderLabel?: string,
  classes?: string
}>()
</script>

<template>
  <button :class="[classes, 'rounded-xl bg-primary-600 text-light px-4 py-2 hover:bg-primary-700 duration-300']">
    <span class="sr-only">{{ screenReaderLabel }}</span>
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">

</style>
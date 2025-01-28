<script setup lang="ts">
defineProps<{
  classes?: string
}>()
</script>

<template>
  <button :class="[classes, 'w-16 h-16 bg-primary-600 rounded-full shadow-lg flex items-center justify-center md:w-14 md:h-14']">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">

</style>
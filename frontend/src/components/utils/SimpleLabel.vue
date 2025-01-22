<script setup lang="ts">
defineProps<{
  attachTo: string
}>()
</script>

<template>
  <label :for="attachTo" class="ml-1 text-sm text-gray-500">
    <slot></slot>
  </label>
</template>

<style scoped lang="scss">

</style>
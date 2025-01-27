<script setup lang="ts">
defineProps<{
  classes?: string,
  checked?: boolean
}>()
</script>

<template>
  <div class="flex items-center">
    <input :checked="checked" type="checkbox" value="" :class="[classes, 'w-4 h-4 text-primary-600 bg-surface-default border-gray-300 rounded-xl duration-300']">
    <label class="ms-2 text-sm">
      <slot></slot>
    </label>
  </div>
</template>

<style scoped lang="scss">

</style>
<script setup lang="ts">
defineProps<{
  id: string,
  classes?: string,
  checked?: boolean
}>()
</script>

<template>
  <div class="flex items-center">
    <input :id="id" :checked="checked" type="checkbox" value=""
           :class="[classes, 'w-4 h-4 text-primary-600 bg-surface-default border-gray-300 rounded-xl duration-300']"
    >
    <label :for="id" class="ms-2 text-sm">
      <slot></slot>
    </label>
  </div>
</template>

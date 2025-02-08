<script setup lang="ts">
defineProps<{
  attachTo?: string
}>()
</script>

<template>
  <label :for="attachTo" class="ml-1 text-sm text-gray-700">
    <slot/>
  </label>
</template>

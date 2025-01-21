<script setup lang="ts">
defineProps<{
  classes?: string
}>()
const emit = defineEmits(["action"])
</script>

<template>
  <button :class="[classes, 'rounded-xl bg-main-600 text-button-text px-4 py-2 hover:bg-main-700 duration-300']"
          @click="emit('action')">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">

</style>
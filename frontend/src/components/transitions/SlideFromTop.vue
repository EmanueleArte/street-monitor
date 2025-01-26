<script setup lang="ts">
const emit = defineEmits(["onCompleted"])
</script>

<template>
  <transition name="slide-top" @afterLeave="emit('onCompleted')">
    <slot></slot>
  </transition>
</template>

<style scoped lang="scss">
.slide-top {
  &-enter-active, &-leave-active {
    transition: transform 0.5s;
  }

  &-enter-from {
    transform: translateY(-100%);
  }

  &-leave-to {
    transform: translateY(-100%);
  }
}
</style>
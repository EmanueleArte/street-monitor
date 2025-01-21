<script setup lang="ts">
const emit = defineEmits(["onCompleted"])
</script>

<template>
  <transition name="slide-bottom" @afterLeave="emit('onCompleted')">
    <slot></slot>
  </transition>
</template>

<style scoped lang="scss">
.slide-bottom-enter-active, .slide-bottom-leave-active {
  transition: transform 0.5s;
}

.slide-bottom-enter-from {
  transform: translateY(100%);
}

.slide-bottom-leave-to {
  transform: translateY(100%);
}
</style>
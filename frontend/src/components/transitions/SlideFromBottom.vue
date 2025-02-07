<script setup lang="ts">
const emit = defineEmits<{
  (e: "onCompleted"): void
}>()
</script>

<template>
  <transition name="slide-bottom" mode="out-in" @afterLeave="emit('onCompleted')">
    <slot/>
  </transition>
</template>

<style scoped lang="scss">
.slide-bottom {
  &-enter-active, &-leave-active {
    transition: transform 0.5s;
  }

  &-enter-from, &-leave-to {
    transform: translateY(110%);
  }
}
</style>
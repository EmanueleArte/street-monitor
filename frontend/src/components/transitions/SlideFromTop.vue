<script setup lang="ts">
const emit = defineEmits(["onCompleted"])
</script>

<template>
  <transition name="slide-top" mode="out-in" @afterLeave="emit('onCompleted')">
    <slot/>
  </transition>
</template>

<style scoped lang="scss">
.slide-top {
  &-enter-active, &-leave-active {
    transition: transform 0.5s;
  }

  &-enter-from, &-leave-to {
    transform: translateY(-100%);
  }
}
</style>
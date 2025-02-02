<script setup lang="ts">

</script>

<template>
  <transition name="slide-right" mode="out-in">
    <slot></slot>
  </transition>
</template>

<style scoped lang="scss">
.slide-right {
  &-enter-active, &-leave-active {
    transition: transform 0.4s;
  }

  &-enter-from, &-leave-to {
    transform: translateX(100%);
  }
}
</style>
<template>
  <transition name="fade" mode="out-in">
    <slot/>
  </transition>
</template>

<style scoped lang="scss">
.fade {
  &-enter-active, &-leave-active {
    transition: opacity 0.1s;
  }

  &-enter-from, &-leave-to {
    opacity: 0;
  }
}
</style>
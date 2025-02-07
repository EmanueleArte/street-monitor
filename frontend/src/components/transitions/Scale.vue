<template>
  <transition name="scale" mode="out-in">
    <slot/>
  </transition>
</template>

<style scoped lang="scss">
.scale {
  &-enter-active, &-leave-active {
    transition: transform 0.2s;
  }

  &-enter-from {
    transform: scale(0%) rotate(45deg);
  }

  &-leave-to {
    transform: scale(0%);
  }
}
</style>
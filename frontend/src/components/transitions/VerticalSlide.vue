<script setup lang="ts">
defineProps<{
  direction: boolean
}>()
</script>

<template>
  <transition name="vertical-slide" mode="out-in"
              :enter-from-class="direction ? 'vertical-slide-enter-from-regular' : 'vertical-slide-enter-from-reverse'"
              :leave-to-class="direction ? 'vertical-slide-leave-to-regular' : 'vertical-slide-leave-to-reverse'"
  >
    <slot/>
  </transition>
</template>

<style scoped lang="scss">
.vertical-slide {
  &-enter-active, &-leave-active {
    transition: transform 0.25s cubic-bezier(0.25, 0.3, 0.8, 1);
  }

  &-enter-from-regular {
    transform: translateX(100%);
  }

  &-leave-to-regular {
    transform: translateX(-100%);
  }

  &-enter-from-reverse {
    transform: translateX(-100%);
  }

  &-leave-to-reverse {
    transform: translateX(100%);
  }
}
</style>
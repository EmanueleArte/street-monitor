<script setup lang="ts">
const emit = defineEmits(["onCompleted"])
</script>

<template>
  <transition name="slide-bottom" @afterLeave="emit('onCompleted')">
    <slot></slot>
  </transition>
</template>

<style scoped lang="scss">
@use "../../style/transitions" as *;
</style>
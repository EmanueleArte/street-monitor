<script setup lang="ts">
import Pin from "@/components/Pin.vue"

defineProps<{
  center: [number, number]
}>()

const iconSize: number = 48
</script>

<template>
  <Pin icon-url="../src/assets/icons/center-pin.png" :icon-size="iconSize" :lat="center[0]" :lng="center[1]"/>
</template>

<style scoped lang="scss">

</style>
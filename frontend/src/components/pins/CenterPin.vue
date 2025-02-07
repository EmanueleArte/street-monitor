<script setup lang="ts">
import Pin from "@/components/pins/Pin.vue"

defineProps<{
  center: [number, number]
}>()

const iconSize: number = 48
</script>

<template>
  <Pin icon-url="../src/assets/icons/center-pin.png" :icon-size="iconSize" :lat="center[0]" :lng="center[1]"
       alt="Center pin"/>
</template>
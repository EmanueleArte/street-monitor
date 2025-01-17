<script setup lang="ts">
import type { IReport } from "@models/reportModel.ts"
import Pin from "@/components/Pin.vue"

const props = defineProps<{
  report: IReport
}>()

const iconSize: number = 64
</script>

<template>
  <Pin :lat="props.report.coordinates[0]" :lng="props.report.coordinates[1]" iconUrl="../src/assets/icons/logo.svg"
       :iconSize="iconSize"/>
</template>

<style scoped lang="scss">

</style>
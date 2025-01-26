<script setup lang="ts">
import type { IReport } from "@models/reportModel.ts"
import Pin from "@/components/pins/Pin.vue"
import { computed } from "vue"
import { formatUnderscoredString } from "@/lib/stringUtility.ts"

const props = defineProps<{
  report: IReport
}>()

const iconSize: number = 48
const iconPath = computed(() => "../src/assets/icons/" + props.report.type + "_pin.png")
</script>

<template>
  <Pin :lat="props.report.coordinates[0]" :lng="props.report.coordinates[1]" :iconUrl="iconPath"
       :iconSize="iconSize" :alt="formatUnderscoredString(report.type)"/>
</template>

<style scoped lang="scss">

</style>
<script setup lang="ts">
import type { IReport } from "@models/reportModel.ts"
import Pin from "@/components/pins/Pin.vue"
import { computed } from "vue"
import { formatUnderscoredString } from "@/lib/stringUtility.ts"
import { string } from "yup";

const props = defineProps<{
  report: IReport
}>()

const iconSize: number = 48

const emit = defineEmits<{
  (e: 'click'): void
}>()

function clickHandler() {
  emit('click')
}

const iconPath = computed<string>(() => "./icons/" + props.report.status + "/" + props.report.type + "_pin.png")
</script>

<template>
  <Pin
      :lat="props.report.coordinates[0]"
      :lng="props.report.coordinates[1]"
      :iconUrl="iconPath"
      :iconSize="iconSize"
      :alt="formatUnderscoredString(report.type)"
      @click="clickHandler"
  />
</template>

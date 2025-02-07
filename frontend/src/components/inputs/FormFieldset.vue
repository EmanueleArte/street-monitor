<script setup lang="ts">
// The following classes are used dynamically:
// grid-cols-1, grid-cols-2
const props = defineProps<{
  legend: string,
  hideLegend?: boolean,
  cols?: number
}>()
</script>

<template>
  <fieldset class="grid gap-y-4 gap-x-2 mt-4" :class="'grid-cols-' + (props.cols || 1)">
    <legend v-if="!props.hideLegend">{{ props.legend }}</legend>
    <slot/>
  </fieldset>
</template>
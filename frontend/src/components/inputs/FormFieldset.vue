<script setup lang="ts">
const props = defineProps<{
    legend: string,
    hideLegend?: boolean,
    cols?: number
}>()
const gridCols: string = "grid-cols-" + (props.cols || 1)
const showLegend: boolean = !props.hideLegend
</script>

<template>
    <fieldset class="grid gap-y-4 gap-x-2 mt-4" :class="gridCols">
        <legend v-if="showLegend">{{ props.legend }}</legend>

        <slot />
    </fieldset>
</template>
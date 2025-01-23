<script setup lang="ts">
const props = defineProps<{
    value: string
}>()
</script>

<template>
    <input
        type="submit"
        :value="props.value"
        class="
        cursor-pointer bg-primary-600 rounded-md text-light border-2 border-primary-600 shadow-md shadow-primary-600/70
        w-full py-2 mt-10
        hover:bg-primary-700 hover:border-primary-700
        "
    >
</template>
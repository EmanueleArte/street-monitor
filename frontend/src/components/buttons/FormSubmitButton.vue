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
        cursor-pointer bg-primary-default rounded-md text-dark-default
        w-full py-1 mt-10
        hover:bg-primary-accent
        "
    >
</template>
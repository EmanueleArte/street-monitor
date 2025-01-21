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
        cursor-pointer bg-primary-default rounded-md text-dark-default border-2 border-primary-default shadow-md shadow-primary-default/70
        w-full py-2 mt-10
        hover:bg-primary-accent hover:border-primary-accent
        "
    >
</template>
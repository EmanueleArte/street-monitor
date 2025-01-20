<script setup lang="ts">
const props = defineProps<{
    value: string
}>()
</script>

<template>
    <input
        type="submit"
        :value="props.value"
        class="bg-primary-default w-full rounded-md py-1 mt-10 text-dark-default hover:bg-primary-accent"    
    >
</template>
<script setup lang="ts">

defineProps({
    text: { type: String, required: true }
})

</script>

<template>
    <button class="absolute bottom-2 h-20 w-32 z-1 bg-primary-600 text-xl text-light rounded-xl">{{ text }}</button>
</template>
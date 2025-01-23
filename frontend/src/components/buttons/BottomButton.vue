<script setup lang="ts">

defineProps({
    text: { type: String, required: true }
})

</script>

<template>
    <button>{{ text }}</button>
</template>
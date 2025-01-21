<script setup lang="ts">
const emit = defineEmits(["toggleMyReports"])

function toggleMyReports() {
  emit("toggleMyReports")
}
</script>

<template>
    <button @click="toggleMyReports"
    class="absolute bottom-2 left-6 h-24 w-40 z-1 bg-main-600 text-xl text-light rounded-xl">My Reports
    </button>
</template>

<style scoped lang="scss">
@use "@/style/vars" as *;
</style>
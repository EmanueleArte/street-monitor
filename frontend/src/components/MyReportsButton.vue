<script setup lang="ts">
const emit = defineEmits(["toggleMyReports"])

function toggleMyReports() {
  emit("toggleMyReports")
}
</script>

<template>
    <button @click="toggleMyReports" class="my-reports-button bg-blue-400 text-xl">My Reports</button>
</template>

<style lang="scss">
@use "../style/vars" as *;

.my-reports-button {
    position: absolute;
    bottom: 2rem;
    left: 1rem;
    z-index: $home_page_buttons_z_index;
    padding: 2rem;
    border: solid 2px white;
    border-radius: 18px;
}
</style>
<script setup ="ts">
import { defineEmits } from "vue"

const emit = defineEmits(["toggleReports"])

function handleClick() {
  emit("toggleReports")
}
</script>

<template>
    <button @click="handleClick" class="my-reports-button bg-blue-400 text-xl">My Reports</button>
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
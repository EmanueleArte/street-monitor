<script setup lang="ts">
import NavBar from "@/components/NavBar.vue"
import { ref } from "vue"
import { RouterView } from "vue-router"

const page = ref("Home")

const changePage = (newPage) => {
    page.value = newPage
}
</script>

<template>
<!--    <NavBar @selected-page="changePage"></NavBar>-->
    <RouterView />
</template>

<style lang="scss">
@use "./style/tailwind" as *;

body {
  margin: 0;
}
</style>
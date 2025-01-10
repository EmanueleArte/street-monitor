<script setup>
import NavBar from "@/components/NavBar.vue"
import HomePage from "@/pages/HomePage.vue"
import MoviesPage from "@/pages/MoviesPage.vue"
import NotFoundPage from "@/pages/NotFound.vue"
import { ref } from "vue"
import { RouterView } from "vue-router"

const page = ref("Home")

const changePage = (newPage) => {
    page.value = newPage
}
</script>

<template>
    <NavBar @selected-page="changePage"></NavBar>
<!--    <HomePage v-if="page === 'Home'" />-->
<!--    <MoviesPage v-else-if="page === 'Movies'" />-->
<!--    <NotFoundPage v-else />-->
    <RouterView />
</template>

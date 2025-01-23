<script setup lang="ts">
import HomeContainer from "@/components/HomeContainer.vue"
import NavBar from "@/components/NavBar.vue"
import NotificationsContainer from "@/components/notifications/NotificationsContainer.vue";
import { ref } from "vue"

const currentPage = ref<string>("home")
</script>

<template>
  <NavBar @change="(page) => currentPage = page" />
  <HomeContainer v-if="currentPage == 'home'"/>
  <NotificationsContainer v-if="currentPage == 'notifications'"/>
</template>

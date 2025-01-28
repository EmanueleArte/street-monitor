<script setup lang="ts">
import HomeContainer from "@/components/HomeContainer.vue"
import NavBar from "@/components/NavBar.vue"
import NotificationsContainer from "@/components/notifications/NotificationsContainer.vue"
import ProfileContainer from "@/components/ProfileContainer.vue"
import Aside from "@/components/Aside.vue"
import { ref } from "vue"
import { useAuthStore } from "@/stores/auth.store"

const authStore = useAuthStore()

if (JSON.stringify(authStore.get()) === "{}") {
  authStore.logout()
}

const currentPage = ref<string>("home")
const asidePage = ref<string | undefined>(undefined)

function openPage(page: string) {
  asidePage.value = asidePage.value == page ? undefined : page
}
</script>

<template>
  <NavBar @change="(page) => currentPage = page" @open="openPage" />
  <HomeContainer v-if="currentPage == 'home'"/>
  <NotificationsContainer v-if="currentPage == 'notifications'"/>
  <ProfileContainer v-if="currentPage == 'profile'" />


  <Aside v-if="asidePage">
    <NotificationsContainer v-if="asidePage == 'notifications'" />

    <ProfileContainer v-if="asidePage == 'profile'" />
  </Aside>
</template>

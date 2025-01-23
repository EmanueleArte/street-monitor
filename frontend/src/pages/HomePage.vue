<script setup lang="ts">
import HomeContainer from "@/components/HomeContainer.vue"
import NavBar from "@/components/NavBar.vue"
import NotificationsContainer from "@/components/notifications/NotificationsContainer.vue"
import Aside from "@/components/Aside.vue"
import { ref } from "vue"

const currentPage = ref<string>("home")
const asidePage = ref<string | undefined>("")

function openPage(page: string) {
  asidePage.value = asidePage.value == page ? undefined : page
}
</script>

<template>
  <NavBar @change="(page) => currentPage = page" @open="openPage" />
  <HomeContainer v-if="currentPage == 'home'"/>
  <NotificationsContainer v-if="currentPage == 'notifications'"/>

  <Aside v-if="asidePage == 'notifications'">
    <NotificationsContainer />
  </Aside>
</template>

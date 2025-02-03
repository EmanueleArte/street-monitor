<script setup lang="ts">
import HomeContainer from "@/components/HomeContainer.vue"
import NavBar from "@/components/NavBar.vue"
import NotificationsContainer from "@/components/notifications/NotificationsContainer.vue"
import ProfileContainer from "@/components/ProfileContainer.vue"
import Aside from "@/components/Aside.vue"
import { ref } from "vue"
import SlideFromRight from "@/components/transitions/SlideFromRight.vue"

import { useAuthStore } from "@/stores/auth.store"
import AdminContainer from "@/components/AdminContainer.vue"
import PopoverPanelWrapper from "@/components/utils/PopoverPanelWrapper.vue"
import SlideFromTop from "@/components/transitions/SlideFromTop.vue"

const authStore = useAuthStore()

if (JSON.stringify(authStore.get()) === "{}") {
  authStore.logout()
}

const currentPage = ref<string>("home")
const asidePage = ref<string | undefined>("")
const whatToShow = ref<string>("")

const openPage = (page: string): void => {
  whatToShow.value = ""
  asidePage.value = asidePage.value == page ? undefined : page
}

const changePage = (page: string): void => {
  whatToShow.value = ""
  currentPage.value = page
}

const homeContainerShow = (what: string): void => {
  whatToShow.value = what
  currentPage.value = "home"
}
</script>

<template>
  <NavBar @change="changePage" @open="openPage"/>
  <HomeContainer :whatToShow="whatToShow"/>
  <SlideFromTop>
    <NotificationsContainer v-if="currentPage === 'notifications'"/>
    <ProfileContainer v-if="currentPage === 'profile'" @showMyReports="homeContainerShow('myReports')" @showMySpots="homeContainerShow('mySpots')"/>
    <AdminContainer v-if="currentPage === 'admin'"/>
  </SlideFromTop>

  <SlideFromRight>
    <Aside v-if="asidePage && asidePage === 'notifications'">
      <NotificationsContainer/>
    </Aside>
    <Aside v-if="asidePage && asidePage === 'profile'">
      <ProfileContainer/>
    </Aside>
    <Aside v-if="asidePage && asidePage === 'admin'">
      <AdminContainer/>
    </Aside>
  </SlideFromRight>
</template>

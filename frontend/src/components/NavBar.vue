<script setup lang="ts">
import { ref } from "vue"
import NavButton from "./NavButton.vue"
import Scale from "@/components/transitions/Scale.vue"
import MySpotsTile from "./MySpotsTile.vue"
import { useAuthStore } from "@/stores/auth.store"

const emit = defineEmits<{
  (e: 'change', page: string): void,
  (e: 'open', page: string): void
}>()

enum Panels {
  ADMIN = 'admin',
  NOTIFICATIONS = 'notifications',
  PROFILE = 'profile'
}

const openPanel = ref<Panels | null>(null)

function openAdminPage() {
  if (window.innerWidth <= 768) { // md
    emit('change', Panels.ADMIN)
  } else {
    emit('open', Panels.ADMIN)
    if (openPanel.value === Panels.ADMIN) {
      openPanel.value = null
    } else {
      openPanel.value = Panels.ADMIN
    }
  }
}

function openNotificationsPage() {
  if (window.innerWidth <= 768) { // md
    emit('change', Panels.NOTIFICATIONS)
  } else {
    emit('open', Panels.NOTIFICATIONS)
    if (openPanel.value === Panels.NOTIFICATIONS) {
      openPanel.value = null
    } else {
      openPanel.value = Panels.NOTIFICATIONS
    }
  }
}

function openProfilePage() {
  if (window.innerWidth <= 768) { // md
    emit('change', Panels.PROFILE)
  } else {
    emit('open', Panels.PROFILE)
    if (openPanel.value === Panels.PROFILE) {
      openPanel.value = null
    } else {
      openPanel.value = Panels.PROFILE
    }
  }
}

</script>

<template>
  <nav class="bg-primary-600 md:bg-transparent w-full md:w-3/4 fixed top-0 md:right-0 md:left-auto left-0 z-50 shadow-md shadow-black/40 md:shadow-none text-light">
    <div class="mx-auto max-w-7xl px-2 md:mx-0 md:max-w-none md:px-0">
      <div class="relative flex h-12 md:content-center p-3 md:justify-between md:h-16">
        <!-- Left part | Website name -->
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden" @click="$emit('change', 'home')">
          StreetMonitor
        </div>
        
        <div class="hidden md:flex gap-2 content-start w-4/5">
          <MySpotsTile />
        </div>

        <!-- Central part | Website logo -->
        <!-- <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex shrink-0 items-center">
            <img class="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company">
          </div>
        </div> -->

        <!-- Right part | Notifications + profile -->
        <div class="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0 md:gap-3">
          <!-- Admin panel -->
          <NavButton v-if="useAuthStore().get().admin" @click="openAdminPage" screen-reader-label="view admin panel">
            <Scale>
              <svg v-if="openPanel !== Panels.ADMIN" class="size-6 md:m-auto" fill="none" viewBox="0 0 24 24"
                   stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                   class="size-6 md:m-auto">
                <path fill-rule="evenodd"
                      d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                      clip-rule="evenodd"/>
              </svg>
            </Scale>
          </NavButton>

          <!-- Notifications -->
          <NavButton @click="openNotificationsPage" screen-reader-label="view notifications">
            <Scale>
              <svg v-if="openPanel !== Panels.NOTIFICATIONS" class="size-6 md:m-auto" fill="none" viewBox="0 0 24 24"
                   stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                   class="size-6 md:m-auto">
                <path fill-rule="evenodd"
                      d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                      clip-rule="evenodd"/>
              </svg>
            </Scale>
          </NavButton>

          <!-- Profile -->
          <NavButton @click="openProfilePage" screen-reader-label="open user menu">
            <Scale>
              <svg v-if="openPanel !== Panels.PROFILE" class="size-6 md:m-auto" xmlns="http://www.w3.org/2000/svg"
                   fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                   class="size-6 md:m-auto">
                <path fill-rule="evenodd"
                      d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                      clip-rule="evenodd"/>
              </svg>
            </Scale>
          </NavButton>
          <!-- <img class="size-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""> -->

        </div>
      </div>
    </div>
  </nav>


</template>

<style scoped lang="scss">
.z-100 {
  z-index: 100;
}
</style>
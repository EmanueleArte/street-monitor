<script setup lang="ts">
import { onMounted, ref, watch } from "vue"
import NavButton from "./buttons/NavButton.vue"
import Scale from "@/components/transitions/Scale.vue"
import MySpotsTile from "@/components/spots/MySpotsTile.vue"
import { useAuthStore } from "@/stores/auth.store"
import axios from "axios"
import type { INotification } from "@models/notificationModel"
import { storeToRefs } from "pinia"

const emit = defineEmits<{
  (e: "change", page: string): void,
  (e: "open", page: string): void
}>()

enum Panels {
  HOME = "home",
  ADMIN = "admin",
  NOTIFICATIONS = "notifications",
  PROFILE = "profile"
}

const windowWidth = ref<number>(window.innerWidth)

const { notifications } = storeToRefs(useAuthStore())
const newNotifications = ref<boolean>(notifications.value.filter((notification: INotification) => !notification.read).length > 0)
watch(notifications, (newValue, oldValue) => {
  newNotifications.value = newValue.length > oldValue.length//notifications.value.filter((notification: INotification) => !notification.read).length > 0
})

const openPanel = ref<Panels | null>(null)

function openAdminPage() {
  if (windowWidth.value <= 768) { // md
    emit('change', Panels.ADMIN)
  } else {
    emit("open", Panels.ADMIN)
  }
  if (openPanel.value === Panels.ADMIN) {
    closePanels()
  } else {
    openPanel.value = Panels.ADMIN
  }
}

function openNotificationsPage() {
  newNotifications.value = false
  if (windowWidth.value <= 768) { // md
    emit('change', Panels.NOTIFICATIONS)
  } else {
    emit("open", Panels.NOTIFICATIONS)
  }
  if (openPanel.value === Panels.NOTIFICATIONS) {
    closePanels()
    // set notifications as read
    useAuthStore().notifications?.filter(n => !n.read).forEach(n => {
      axios.delete<INotification[]>(`http://localhost:3000/users/${useAuthStore().get().username}/notifications/${n._id}`)
        .then(res => {
          const updatedNotificationsIds: string[] = res.data.map((n: INotification) => n._id.toString())
          const updatedNotifications: INotification[] = useAuthStore().notifications?.map((n: INotification) => {
            if (updatedNotificationsIds.includes(n._id.toString())) {
              n.read = true
            }
            return n
          })
          useAuthStore().setNotifications(updatedNotifications)
        })
        .catch(err => console.log(err))
    })
  } else {
    openPanel.value = Panels.NOTIFICATIONS
  }
}

function openProfilePage() {
  if (windowWidth.value <= 768) { // md
    emit('change', Panels.PROFILE)
  } else {
    emit("open", Panels.PROFILE)
  }
  if (openPanel.value === Panels.PROFILE) {
    closePanels()
  } else {
    openPanel.value = Panels.PROFILE
  }
}

function closePanels() {
  if (windowWidth.value <= 768) { // md
    emit('change', Panels.HOME)
  } else {
    emit("open", Panels.HOME)
  }
  openPanel.value = null
}

const navbar = ref<HTMLElement | null>(null)

const handleClickOutside = (event: MouseEvent) => {
  if (navbar.value && openPanel.value) {
    if ((!event.composedPath().includes(navbar.value) && !(event.target as Element).closest(".nav-aside")) || (event.target as Element).closest(".nav-close")) {
      closePanels()
    }
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside)
  window.addEventListener('resize', () => windowWidth.value = window.innerWidth)
})

</script>

<template>
  <nav ref="navbar"
    class="bg-primary-600 md:bg-transparent w-full md:w-3/4 fixed top-0 md:right-0 md:left-auto left-0 z-20 shadow-md shadow-black/40 md:shadow-none text-light">
    <div class="mx-auto max-w-7xl px-2 md:mx-0 md:max-w-none md:px-0">
      <div class="relative flex h-12 md:content-center p-3 md:justify-between md:h-16">
        <!-- Left part | Website name -->
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden" @click="closePanels">
          StreetMonitor
        </div>

        <div class="hidden md:flex gap-2 content-start w-4/5">
          <MySpotsTile />
        </div>

        <!-- Right part | Admin + Notifications + profile -->
        <div class="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0 md:gap-3">
          <!-- Admin panel -->
          <NavButton v-if="useAuthStore().get().admin" @click="openAdminPage" screen-reader-label="view admin panel">
            <Scale>
              <svg v-if="openPanel !== Panels.ADMIN" class="size-6 md:m-auto" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                class="size-6 md:m-auto">
                <path fill-rule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd" />
              </svg>
            </Scale>
          </NavButton>

          <!-- Notifications -->
          <NavButton @click="openNotificationsPage" screen-reader-label="view notifications">
            <Scale>
              <!-- Cross -->
              <svg v-if="openPanel === Panels.NOTIFICATIONS" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                fill="currentColor" class="size-6 md:m-auto">
                <path fill-rule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd" />
              </svg>
              <!-- Silent bell -->
              <svg v-else-if="!newNotifications" class="size-6 md:m-auto" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
              </svg>
              <!-- Sound bell -->
              <span v-else>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-6 md:m-auto">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                </svg>
                <div v-if="newNotifications"
                  class="absolute -end-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-surface-default bg-red-500 text-xs font-bold text-surface-default ">
                  {{ notifications.filter(_ => !_.read).length }}
                </div>
              </span>
            </Scale>
          </NavButton>

          <!-- Profile -->
          <NavButton @click="openProfilePage" screen-reader-label="open user menu">
            <Scale>
              <!-- Cross -->
              <svg v-if="openPanel === Panels.PROFILE" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                fill="currentColor" class="size-6 md:m-auto">
                <path fill-rule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd" />
              </svg>
              <!-- Profile icon -->
              <svg v-else class="size-6 md:m-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </Scale>
          </NavButton>
        </div>
      </div>
    </div>
  </nav>
</template>

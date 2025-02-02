<script setup lang="ts">
import Notification from './Notification.vue'
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()
const notifications = authStore.get()?.notifications || []

const unreadNotifications = notifications?.filter(n => !n.read)
const readNotifications = notifications?.filter(n => n.read)

</script>

<template>
    <section class="h-screen w-screen fixed top-12 bg-surface-default z-50 p-4 pt-7 md:relative md:h-full md:w-full md:top-0 md:m-0 md:pt-0">
        <h1 v-if="notifications?.length > 0" class="text-2xl md:hidden">Notifications</h1>


        <div v-else class="md:m-0 flex flex-col flex-wrap p-10 justify-center h-full text-center text-black/50">

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-14 scale-150 mx-auto">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
            </svg>
            <div class="text-lg text-primary-600 font-medium mt-4">You're all caught up!</div>
            <div class="text-sm text-black/60">No new notifications for now.</div>
        </div>

        <section v-if="unreadNotifications.length > 0">
            <h2 class="hidden">Unread notifications</h2>
            <ul class="gap-1 inline-grid mt-2">
                <li v-for="notification in unreadNotifications">
                    <Notification
                        :read="false"
                        :date="new Date(notification.send_datetime)"
                        :report="notification.report"
                        :favorite-spot="notification.favorite_spot"
                    >
                        {{ notification.content }}
                    </Notification>
                </li>
            </ul>
        </section>

        <section v-if="readNotifications.length > 0">
            <h2 class="relative flex items-center">
                <div class="flex-grow border-t border-black/70"></div>
                    <span class="mx-4 flex-shrink text-black/70 font-medium text-md">Read notifications</span>
                <div class="flex-grow border-t border-black/70"></div>
            </h2>
            <ul class="gap-1 inline-grid mt-2">
                <li v-for="notification in readNotifications">
                    <Notification :read="true" :date="new Date(notification.send_datetime)">
                        {{ notification.content }}
                    </Notification>
                </li>
            </ul>
        </section>
    </section>
</template>
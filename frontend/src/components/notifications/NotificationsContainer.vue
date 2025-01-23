<script setup lang="ts">
import Notification from './Notification.vue'
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()
const notifications = authStore.get()?.notifications

const unreadNotifications = notifications?.filter(n => !n.read)
const readNotifications = notifications?.filter(n => n.read)

</script>

<template>
    <section class="p-4 mt-10 pt-10 md:m-0 md:pt-0">
        <h1 class="text-2xl md:hidden">Notifications</h1>

        <section>
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

        <section v-if="readNotifications && readNotifications.length > 0">
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
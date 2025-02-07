<script setup lang="ts">
import type { INotification } from '@models/notificationModel'
import Notification from './Notification.vue'
import { useAuthStore } from '@/stores/auth.store'
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import NoNotificationsBanner from './NoNotificationsBanner.vue'

const emit = defineEmits(['change']) // Register the emits

const authStore = useAuthStore()
const { notifications } = storeToRefs(authStore)

const unreadNotifications = ref<INotification[]>(getNotifications(notifications.value, false))
const readNotifications = ref<INotification[]>(getNotifications(notifications.value, true))

watch(notifications, (newValue) => {
    unreadNotifications.value = getNotifications(newValue, false)
    readNotifications.value = getNotifications(newValue, true)
}, { deep: true })

function getNotifications(notifications: INotification[], read: boolean): INotification[] {
    return notifications
        .filter(_ => (_.read == undefined && !read) || (_.read && read))
        .sort((n1, n2) => new Date(n2.send_datetime).getTime() - new Date(n1.send_datetime).getTime())
}
</script>

<template>
    <section
        class="nav-aside h-screen w-screen fixed top-12 bg-surface-default z-10 p-4 pt-7 pb-16 md:pb-4 md:relative md:h-full md:w-full md:top-0 md:m-0 md:pt-0 overflow-y-auto">
        <h1 v-if="notifications?.length && notifications?.length > 0" class="text-2xl md:hidden">Notifications</h1>

        <NoNotificationsBanner v-else :full-screen="true" />

        <section v-if="unreadNotifications.length > 0">
            <h2 class="hidden">Unread notifications</h2>
            <ul class="gap-1 inline-grid mt-2">
                <li v-for="notification in unreadNotifications">
                    <Notification :read="false" :date="new Date(notification.send_datetime)"
                        :report="notification.report" :favorite-spot="notification.favorite_spot" @change="(page) => emit('change', page)">
                        {{ notification.content }}
                    </Notification>
                </li>
            </ul>
        </section>

        <section v-if="readNotifications.length > 0">
            <h2 v-if="unreadNotifications.length > 0" class="relative flex items-center">
                <div class="flex-grow border-t border-black/70"></div>
                <span class="mx-4 flex-shrink text-black/70 font-medium text-md">Read notifications</span>
                <div class="flex-grow border-t border-black/70"></div>
            </h2>
            <NoNotificationsBanner v-else :full-screen=false />


            <ul class="gap-1 inline-grid mt-2">
                <li v-for="notification in readNotifications">
                    <Notification :read="true" :date="new Date(notification.send_datetime)"
                        :report="notification.report" :favorite-spot="notification.favorite_spot" @change="(page) => emit('change', page)">
                        {{ notification.content }}
                    </Notification>
                </li>
            </ul>
        </section>
    </section>
</template>
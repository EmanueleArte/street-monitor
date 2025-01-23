<script setup lang="ts">
import Notification from './Notification.vue'

const dates: Date[] = [
    new Date('01/22/2025,10:00:00'),
    new Date('01/23/2025,10:05:00'),
    new Date('01/01/2025,10:00:00'),
    new Date('01/23/2025,7:00:00'),
    new Date('01/23/2025,9:00:00'),
    new Date('01/21/2025,10:00:00'),
    new Date('01/21/2025,23:00:00'),
]
</script>

<template>
    <section class="p-4 mt-10 pt-10 md:m-0 md:pt-0">
        <h1 class="text-2xl md:hidden">Notifications</h1>

        <section>
            <h2 class="hidden">Unread notifications</h2>
            <ul class="gap-1 inline-grid mt-2">
                <li v-for="date in dates.sort((a: Date, b: Date) => b.getTime() - a.getTime())">
                    <Notification :read="false" :date="date">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, quis?
                    </Notification>
                </li>
            </ul>
        </section>

        <section>
            <h2 class="relative flex items-center">
                <div class="flex-grow border-t border-dark-default/85"></div>
                    <span class="mx-4 flex-shrink text-dark-default/85 font-medium text-md">Read notifications</span>
                <div class="flex-grow border-t border-dark-default/85"></div>
            </h2>
            <ul class="gap-1 inline-grid mt-2">
                <li v-for="date in dates.sort((a: Date, b: Date) => b.getTime() - a.getTime())">
                    <Notification :read="true" :date="date">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, quis?
                    </Notification>
                </li>
            </ul>
        </section>
    </section>
</template>
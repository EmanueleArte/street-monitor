<script setup lang="ts">
import Notification from './notifications/Notification.vue'

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
    <ul>
        <li v-for="date in dates.sort((a: Date, b: Date) => b.getTime() - a.getTime())">
            <Notification :read="false" :date="date">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, quis?
            </Notification>
        </li>
    </ul>
</template>
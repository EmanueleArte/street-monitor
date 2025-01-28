<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import type { IUser } from '@models/userModel';
import { ref } from 'vue';

const authStore = useAuthStore()
</script>

<template>
    <h1 class="ml-1 mt-20 md:mt-0">Welcome {{ authStore.get()?.username }}</h1>
    <section class="ml-1 mt-2">
        <div class="flex flex-col md:flex-row">
            <div class="flex flex-col md:flex-row md:space-x-4">
                <div class="flex flex-col">
                    <p class="text-sm">Username</p>
                    <p class="text-lg">mariorossi{{ authStore.get()?.username }}</p>
                    <p class="text-sm">Email</p>
                    <p class="text-lg">mariorossi@example.com{{ authStore.get()?.email }}</p>
                </div>
            </div>
        </div>

        <button @click="() => authStore.logout()">Logout</button>
    </section>
</template>

<style scoped lang="scss">

p {
    box-shadow: inset 0 2px 4px rgb(0 0 0 / 0.05);
}

</style>
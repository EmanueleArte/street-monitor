<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore()
</script>

<template>
    <div class="mt-20 md:mt-0">Welcome {{ authStore.get()?.username }}</div>
</template>
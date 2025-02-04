<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import SimpleButton from '@/components/buttons/SimpleButton.vue';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import SimpleLabel from "@/components/utils/SimpleLabel.vue"

const authStore = useAuthStore()
const reportsNumber = ref<number>(0)

const emits = defineEmits(['showMyReports', 'showMySpots'])

const showMyReports = () => {
  emits('showMyReports')
}

const showMySpots = () => {
  emits('showMySpots')
}

const logout = () => {
  authStore.logout()
}

const countReports = async () => {
  try {
    const data = (await axios.get(`http://localhost:3000/reports/by-user/${authStore.get()?.username}`)).data
    reportsNumber.value = data.length
  } catch (e) {
    console.error(e)
  }
}

onMounted(() => {
  if (!authStore.get()) {
    logout()
  }
  countReports()
})
</script>

<template>
  <div
      class="nav-aside h-screen w-screen fixed top-12 p-8 pt-7 bg-surface-default z-10
      md:relative md:h-full md:w-full md:top-0">
    <h1 class="md:mt-0 text-xl">Welcome, {{ authStore.get()?.username }}</h1>

    <section class="w-full mt-3">
      <div class="flex flex-col">
        <SimpleLabel attachTo="username-field" class="text-xs">Username</SimpleLabel>
        <p id="username-field" class="border w-full rounded-lg text-sm px-2 py-1 bg-surface-component mb-2">{{ authStore.get()?.username }}</p>

        <div class="w-full grid grid-cols-2 gap-4">
          <div class="">
            <SimpleLabel attachTo="username-field" class="text-xs">Name</SimpleLabel>
            <p id="name-field" class="border bg-surface-component rounded-lg text-sm px-2 py-1 mb-2">{{ authStore.get()?.name }}</p>
          </div>
          <div class="">
            <SimpleLabel attachTo="username-field" class="text-xs">Surname</SimpleLabel>
            <p id="surname-field" class="border bg-surface-component rounded-lg text-sm px-2 py-1 mb-2">{{ authStore.get()?.surname }}</p>
          </div>
        </div>

        <SimpleLabel attachTo="email-field" class="text-xs">Email</SimpleLabel>
        <p id="email-field" class="border bg-surface-component w-full rounded-lg text-sm px-2 py-1 mb-2">{{ authStore.get()?.email }}</p>

        <div class="w-full grid grid-cols-2 gap-4">
          <div>
            <SimpleLabel attachTo="reports-number" class="text-xs">Reports made</SimpleLabel>
            <p id="reports-number" class="border bg-surface-component rounded-lg text-sm px-2 py-1">{{ reportsNumber }}</p>
          </div>
          <div>
            <SimpleLabel attachTo="reputation" class="text-xs">Reputation</SimpleLabel>
            <p id="reputation" class="border bg-surface-component rounded-lg text-sm px-2 py-1">{{ authStore.get()?.reputation }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="space-x-4 mt-4 md:hidden">
      <SimpleButton @click="showMyReports" class="nav-close mt-4 shadow-xl">My reports</SimpleButton>
      <SimpleButton @click="showMySpots" class="nav-close mt-4 shadow-xl">My spots</SimpleButton>
    </section>
    <SimpleButton @click="logout" class="mt-4 shadow-xl md:mt-6" :outline="true">Logout</SimpleButton>
  </div>
</template>

<style scoped lang="scss">

</style>
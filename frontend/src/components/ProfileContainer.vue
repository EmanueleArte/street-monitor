<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import SimpleButton from '@/components/buttons/SimpleButton.vue';
import { onMounted, ref } from 'vue';
import axios from 'axios';

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
  <div class="nav-aside h-screen w-screen fixed top-12 pt-7 bg-surface-default z-10 md:relative md:h-full md:w-full md:top-0 md:p-4">
    <h1 class="ml-2 md:mt-0 text-xl">Welcome {{ authStore.get()?.username }}</h1>
    <section class="mx-2 mt-3 shadow-lg p-3 rounded-lg">
        <div class="flex flex-col md:flex-row">
            <div class="flex flex-col md:flex-row md:space-x-4">
                <div class="flex flex-col">
                    <p class="text-xs">Username</p>
                    <p class="inset-shadow w-fit rounded-lg text-sm p-2 mb-2">{{ authStore.get()?.username }}</p>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <p class="text-xs">Name</p>
                            <p class="inset-shadow w-fit rounded-lg text-sm p-2 mb-2">{{ authStore.get()?.name }}</p>
                        </div>
                        <div>
                            <p class="text-xs">Surname</p>
                            <p class="inset-shadow w-fit rounded-lg text-sm p-2 mb-2">{{ authStore.get()?.surname }}</p>
                        </div>
                    </div>
                    <p class="text-xs">Email</p>
                    <p class="inset-shadow w-fit rounded-lg text-sm p-2 mb-2">{{ authStore.get()?.email }}</p>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <p class="text-xs">Reports made</p>
                            <p class="inset-shadow w-fit rounded-lg text-sm p-2">{{ reportsNumber }}</p>
                        </div>
                        <div>
                            <p class="text-xs">Reputation</p>
                            <p class="inset-shadow w-fit rounded-lg text-sm p-2">{{ authStore.get()?.reputation }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="md:hidden">
        <SimpleButton @click="showMyReports" class="nav-close ml-4 mt-4 shadow-xl">My reports</SimpleButton>
        <SimpleButton @click="showMySpots" class="nav-close ml-4 mt-4 shadow-xl">My spots</SimpleButton>
    </section>
    <SimpleButton @click="logout" class="ml-4 mt-4 shadow-xl" :outline="true">Logout</SimpleButton>
  </div>
</template>

<style scoped lang="scss">
p.inset-shadow {
    box-shadow: inset 0px 0px 2px 3px rgba(0, 0, 0, 0.1)
}

</style>
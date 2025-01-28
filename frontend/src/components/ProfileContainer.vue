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
    const data = (await axios.get("http://localhost:3000/reports/by-user/mariorossi")).data //TODO cambiare user (mariorossi) con user corrente loggato
    reportsNumber.value = data.length
  } catch (e) {
    console.error(e)
  }
}

onMounted(() => {
    if (!authStore.get()) {
        //logout()
    }
    countReports
})
</script>

<template>
    <h1 class="ml-2 mt-16 md:mt-0 text-lg">Welcome mariorossi{{ authStore.get()?.username }}</h1>
    <section class="mx-2 mt-3 shadow-lg p-3 rounded-lg">
        <div class="flex flex-col md:flex-row">
            <div class="flex flex-col md:flex-row md:space-x-4">
                <div class="flex flex-col">
                    <p class="text-xs">Username</p>
                    <p class="inset-shadow w-fit rounded-lg text-sm p-2 mb-2">mariorossi{{ authStore.get()?.username }}</p>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <p class="text-xs">Name</p>
                            <p class="inset-shadow w-fit rounded-lg text-sm p-2 mb-2">Mario{{ authStore.get()?.name }}</p>
                        </div>
                        <div>
                            <p class="text-xs">Surname</p>
                            <p class="inset-shadow w-fit rounded-lg text-sm p-2 mb-2">Rossi{{ authStore.get()?.surname }}</p>
                        </div>
                    </div>
                    <p class="text-xs">Email</p>
                    <p class="inset-shadow w-fit rounded-lg text-sm p-2 mb-2">mariorossi@example.com{{ authStore.get()?.email }}</p>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <p class="text-xs">Reports made</p>
                            <p class="inset-shadow w-fit rounded-lg text-sm p-2">{{ reportsNumber }}</p>
                        </div>
                        <div>
                            <p class="text-xs">Reputation</p>
                            <p class="inset-shadow w-fit rounded-lg text-sm p-2">2{{ authStore.get()?.reputation }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section>
        <SimpleButton @click="showMyReports" :classes="'ml-4 mt-4 shadow-xl'">My reports</SimpleButton>
        <SimpleButton @click="showMySpots" :classes="'ml-4 mt-4 shadow-xl'">My spots</SimpleButton>
    </section>
    <SimpleButton @click="logout" :classes="'ml-4 mt-4 shadow-xl !bg-light !text-primary-600 border border-primary-600 hover:!bg-primary-100 hover:border-primary-700 hover:!text-primary-700'">Logout</SimpleButton>
</template>

<style scoped lang="scss">
@use "../style/vars" as *;

p.inset-shadow {
    box-shadow: inset 0px 0px 2px 3px rgba(0, 0, 0, 0.1)
}

</style>
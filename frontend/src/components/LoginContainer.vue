<script setup lang="ts">
import { ref } from 'vue';
import FormInput from './inputs/FormInput.vue'
import axios from 'axios'
import type { IUser } from '@models/userModel'
import { verifyPassword } from '@/lib/passwordManager'
import { router } from '@/router'
import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth.store';
import { storeToRefs } from 'pinia';

interface ILoginForm {
    username: string,
    password: string
}

const form = ref<ILoginForm>({
    username: "",
    password: ""
})

const userStore = useUserStore()
const authStore = useAuthStore()
const loginError = ref<string>("")

const signin = async () => {
    await authStore.login(form.value.username, form.value.password)

    const { user } = storeToRefs(authStore)
    console.log(user)
    // axios.get<IUser>(`http://localhost:3000/users/${form.value.username.trim()}`)
    //     .then(res => {

    //         verifyPassword(form.value.password, res.data.password).then(passwordsMatch => {
    //             if (passwordsMatch) {
    //                 // store user data in session
    //                 userStore.set(res.data)

    //                 console.log(userStore.user)
    //                 // router.push("/")

    //             } else {
    //                 loginError.value = WRONG_INPUTS_ERROR
    //             }
    //         })
    //     })
    //     .catch(error => {
    //         console.log(error)
    //         if (error.response && error.response.status == 404) {
    //             loginError.value = USERNAME_NOT_PRESENT_ERROR
    //         } else {
    //             loginError.value = WRONG_INPUTS_ERROR
    //         }
    //     })
}

</script>

<template>
    <header class="text-l text-primary-default font-bold p-4">StreetMonitor</header>
    <section class="flex flex-col grow justify-start gap-10 px-5 pt-40">
        <div>
            <h1 class="text-3xl font-semibold text-primary-default">Your city needs you!</h1>
            <p class="text-dark-default text-xl">Sign in to make a difference.</p>
        </div>
        
        <p>
            {{ loginError }}
        </p>
        
        <form @submit.prevent="signin">
            <fieldset class="flex flex-col gap-3">
            <legend class="hidden">Account information</legend>

            <FormInput
                fieldName="username"
                label="username"
                placeholder="Insert your username"
                v-model="form.username"
                />
                
            <FormInput 
                fieldName="password"
                label="password"
                type="password"
                placeholder="Insert your password"
                v-model="form.password"
                />
            </fieldset>
            
            <input
                type="submit"
                value="Sign In"
                class="bg-primary-default w-full rounded-md py-1 mt-10 text-dark-default hover:bg-primary-accent"
            />
        </form>
    </section>
</template>
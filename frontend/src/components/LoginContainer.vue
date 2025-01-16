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
    <header>StreetMonitor</header>
    <h1>Your city needs you!</h1>
    <p>Sign in to make a difference.</p>

    <p>
        {{ loginError }}
    </p>

    <form @submit.prevent="signin">
        <fieldset>
            <legend>Account information</legend>

            <FormInput
                fieldName="username"
                label="username / email"
                placeholder="Insert username or email"
                v-model="form.username"
            />

            <FormInput 
                fieldName="password"
                label="password"
                type="password"
                v-model="form.password"
            />
        </fieldset>

        <input type="submit" value="Sign In">
    </form>
</template>
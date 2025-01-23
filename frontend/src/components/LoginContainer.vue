<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth.store'
import FormInput from './inputs/FormInput.vue'
import FormFieldset from './inputs/FormFieldset.vue'
import FormSubmitButton from './buttons/FormSubmitButton.vue';

const authStore = useAuthStore()
const loginError = ref<string>("")

interface ILoginForm {
    username: string,
    password: string
}

const form = ref<ILoginForm>({
    username: "",
    password: ""
})


const signin = async () => {
    authStore.login(form.value.username, form.value.password)
    .catch(err => {
        loginError.value = err.status && err.status == 404
            ? "Username not present"
            : "Username or password not correct"
    })
}

</script>

<template>
        <div>
            <h1 class="text-3xl font-semibold text-primary-600">Your city needs you!</h1>
            <p class="text-xl">Sign in to make a difference.</p>
        </div>
        
        <p
            v-if="loginError != ''"
            class="border-2 border-error-800 rounded-md shadow-md shadow-error-400 bg-red-100 px-2 py-1 text-error-800 capitalize text-sm">
            {{ loginError }}
        </p>

        
        <form @submit.prevent="signin">
            <FormFieldset :cols=1 legend="Account information" hideLegend>

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

            </FormFieldset>
            
            <FormSubmitButton value="Sign In" />
        </form>
</template>
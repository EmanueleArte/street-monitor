<script setup lang="ts">
import { ref } from "vue"
import RegistrationContainer from "@/components/RegistrationContainer.vue"
import LoginContainer from "@/components/LoginContainer.vue"

const signupPage = ref({
    isLoaded: true,
    paragraphText: "Already registered?",
    linkText: "Sign in now"
})

const switchPage = () => {
    signupPage.value.isLoaded = !signupPage.value.isLoaded
    signupPage.value.paragraphText = signupPage.value.isLoaded ? "Already registered?" : "Don't have an account?"
    signupPage.value.linkText = signupPage.value.isLoaded ? "Sign in now" : "Register now"
}
</script>

<template>
    <RegistrationContainer v-if="signupPage.isLoaded" />
    <LoginContainer v-else />

    <footer>
        <span>{{ signupPage.paragraphText }}</span>
        <a href="http://localhost:5173/signup" @click.prevent="switchPage">{{ signupPage.linkText }}</a>
    </footer>
</template>
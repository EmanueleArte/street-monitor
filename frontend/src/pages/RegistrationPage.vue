<script setup lang="ts">
import { ref } from "vue"
import RegistrationContainer from "@/components/RegistrationContainer.vue"
import LoginContainer from "@/components/LoginContainer.vue"

const LOGIN_PARAGRAPH_TEXT: string = "Don't have an account?"
const LOGIN_LINK_TEXT: string = "Register now"
const REGISTRATION_PARAGRAPH_TEXT: string = "Already registered?"
const REGISTRATION_LINK_TEXT: string = "Sign in now"

const signupPage = ref({
    isLoaded: false,
    paragraphText: LOGIN_PARAGRAPH_TEXT,
    linkText: LOGIN_LINK_TEXT
})

const switchPage = () => {
    signupPage.value.isLoaded = !signupPage.value.isLoaded
    signupPage.value.paragraphText = signupPage.value.isLoaded ? REGISTRATION_PARAGRAPH_TEXT : LOGIN_PARAGRAPH_TEXT
    signupPage.value.linkText = signupPage.value.isLoaded ? REGISTRATION_LINK_TEXT : LOGIN_LINK_TEXT
}
</script>

<template>
  <div class="h-screen flex flex-col">
    <RegistrationContainer v-if="signupPage.isLoaded" />
    <LoginContainer v-else />
    
    <footer class="flex justify-center gap-2 py-2">
      <span>{{ signupPage.paragraphText }}</span>
      <a
        href="http://localhost:5173/signup"
        @click.prevent="switchPage"
        class="text-primary-default visited:text-primary-accent"
      >{{ signupPage.linkText }}</a>
    </footer>
  </div>
</template>
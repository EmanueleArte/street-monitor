<script setup lang="ts">
import { ref } from "vue"
import RegistrationContainer from "@/components/RegistrationContainer.vue"
import LoginContainer from "@/components/LoginContainer.vue"
import Fade from "@/components/transitions/Fade.vue"

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

  <!-- background -->
  <div id="background" class="md:grid grid-cols-12 min-h-screen bg-[url('./assets/img/map-wallpaper.jpg')]">

    <!-- login/registration container -->
    <div class="col-start-2 col-span-4 h-full md:flex md:flex-col md:flex-wrap md:p-10 px-0">

    <!-- login/registration inner container -->
    <div class="relative flex flex-col w-full h-screen md:h-full bg-surface-default md:rounded-2xl md:px-10 md:py-5 shadow-lg shadow-black/30">
      <header class="text-l text-primary-600 font-bold p-4">StreetMonitor</header>

        <section class="flex flex-col grow justify-start gap-10 px-5 pt-20">
          <Fade>
            <RegistrationContainer v-if="signupPage.isLoaded"/>
            <LoginContainer v-else/>
          </Fade>
        </section>

        <footer class="flex justify-center gap-2 py-2">
          <span>{{ signupPage.paragraphText }}</span>
          <a href="http://localhost:5173/signup"
             @click.prevent="switchPage"
             class="text-primary-600 visited:text-primary-700"
          >
            {{ signupPage.linkText }}
          </a>
        </footer>
      </div>
    </div>
  </div>

</template>

<style lang="scss" scoped>
// temporary
div#background {
  // background-image: linear-gradient(to left top, #8bc34a, #00b87f, #00a4b5, #0089d0, #1565c0);
  // background-image: url('../assets/img/map-wallpaper.jpg')
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
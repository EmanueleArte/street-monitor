<script setup lang="ts">
import axios from "axios"
import { onMounted, ref, reactive } from "vue"
import FormInput from "../components/inputs/FormInput.vue"

const form = reactive({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    passwordCheck: ""
})

const signup = () => {
    // perform checks
    // ...

    // hash password and store hashed value
    // ...

    axios.post('http://localhost:3000/users', {
        name: form.name,
        surname: form.surname,
        username: form.username,
        email: form.email,
        password: form.password,
        reputation: 0
    })
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })
}
</script>

<template>
  <div class="registrationContainer">
    <form @submit.prevent="signup">
        <fieldset>
            <legend>Personal information</legend>
            
            <FormInput v-model="form.name" field-name="name" label="Name" />
            <FormInput v-model="form.surname" field-name="surname" label="Surname" />
        </fieldset>


        <fieldset>
            <legend>Account information</legend>

            <FormInput v-model="form.username" field-name="username" label="Username" />
            <FormInput v-model="form.email" type="email" field-name="email" label="Email"/>
            <FormInput v-model="form.password" type="password" field-name="password" label="Password"/>
            <FormInput v-model="form.passwordCheck" type="password" field-name="password-check" label="Insert password again"/>
        </fieldset>
        
        <input type="submit" value="Register">
    </form>
  </div>
</template>

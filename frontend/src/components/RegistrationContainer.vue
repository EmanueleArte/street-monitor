<script setup lang="ts">
import axios from "axios"
import { onMounted, ref, reactive } from "vue"
import FormInput from "../components/inputs/FormInput.vue"
import hashPassword from "../lib/passwordManager"

const REQUIRED_FIELD_MESSAGE = "required field"

const form = reactive({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    passwordCheck: ""
})

const errors = reactive({
    name: { message: "" },
    surname: { message: "" },
    username: { message: "" },
    email: { message: "" },
    password: { message: "", suggestions: [""] },
    passwordCheck: { message: "" }
})

const USERNAME_MIN_LENGTH = 6
const MINIMUM_LENGTH_ALLOWED_MESSAGE = "required a minimum length of "
const INVALID_FORMAT_MESSAGE = "invalid format"
const INVALID_PASSWORD_FORMAT_MESSAGE = "password must contain:"
const PASSWORDS_DONT_MATCH_MESSAGE = "passwords don't match"

const emailRegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const passwordRegExp = new RegExp(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)

const resetErrors = () => {
    errors.name.message = ""
    errors.surname.message = ""
    errors.username.message = ""
    errors.email.message = ""
    errors.password.message = ""
    errors.password.suggestions = [""]
    errors.passwordCheck.message = ""

}

const cleanData = () => {
    form.name = form.name.trim()
    form.surname = form.surname.trim()
    form.username = form.username.trim()
    form.email = form.email.trim()
    form.password = form.password.trim()
    form.passwordCheck = form.passwordCheck.trim()
}

const validate = () => {
    let validationFailed = false
    resetErrors()

    if (form.name === "") {
        errors.name.message = REQUIRED_FIELD_MESSAGE
        validationFailed = true
    }

    if (form.surname === "") {
        errors.surname.message = REQUIRED_FIELD_MESSAGE
        validationFailed = true
    }

    if (form.username === "") {
        errors.username.message = REQUIRED_FIELD_MESSAGE
        validationFailed = true
    } else if (form.username.length < USERNAME_MIN_LENGTH) {
        errors.username.message = MINIMUM_LENGTH_ALLOWED_MESSAGE + USERNAME_MIN_LENGTH
        validationFailed = true
    }

    if (form.email === "") {
        errors.email.message = REQUIRED_FIELD_MESSAGE
        validationFailed = true
    } else if (!emailRegExp.test(form.email)) {
        errors.email.message = INVALID_FORMAT_MESSAGE
        validationFailed = true
    }

    if (form.password === "") {
        errors.password.message = REQUIRED_FIELD_MESSAGE
        validationFailed = true
    } else if (!passwordRegExp.test(form.password)) {
        errors.password.message = INVALID_PASSWORD_FORMAT_MESSAGE
        errors.password.suggestions = [
                "at least one upper case letter",
                "at least one lower case letter",
                "at least one digit",
                "at least one symbol (allowed symbols are: ! @ # $ % ^ & *)",
                "at least 8 characters"
            ]
        validationFailed = true
    } else if (form.password != form.passwordCheck) {
        errors.passwordCheck.message = PASSWORDS_DONT_MATCH_MESSAGE
        validationFailed = true
    }

    return !validationFailed
}

const signup = () => {
    // perform checks
    cleanData()
    if (!validate()) {
        return
    }

    // hash password and store hashed value
    hashPassword(form.password).then(hash => {
        axios.post('http://localhost:3000/users', {
            name: form.name,
            surname: form.surname,
            username: form.username,
            email: form.email,
            password: hash,
            reputation: 0
        })
        .then(res => {
            console.log(res)
            // redirect to homepage
        })
        .catch(err => {
            console.log(err)
        })
    })
    .catch(err => console.log(err))
}
</script>

<template>
  <div class="registrationContainer">
    <span>StreetMonitor</span>
    <h1>SignUp</h1>
    <p>Create an account to continue</p>

    <form @submit.prevent="signup">
        <fieldset>
            <legend>Personal information</legend>
            
            <FormInput
                v-model="form.name"
                fieldName="name"
                label="name"
                :error="errors.name" />

            <FormInput
                v-model="form.surname"
                fieldName="surname"
                label="surname"
                :error="errors.surname" />
        </fieldset>


        <fieldset>
            <legend>Account information</legend>

            <FormInput
                v-model="form.username"
                fieldName="username"
                label="username"
                :error="errors.username" />
            <FormInput
                v-model="form.email"
                type="email"
                fieldName="email"
                label="email"
                :error="errors.email" />
            <FormInput
                v-model="form.password"
                type="password"
                fieldName="password"
                label="password"
                :error="errors.password" />
            <FormInput
                v-model="form.passwordCheck"
                type="password"
                fieldName="password-check"
                label="confirm password"
                placeholder="Insert password again"
                :error="errors.passwordCheck" />
        </fieldset>
        
        <input type="submit" value="Register">
    </form>
  </div>
</template>

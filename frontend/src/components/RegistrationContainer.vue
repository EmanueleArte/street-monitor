<script setup lang="ts">
import axios from "axios"
import { onMounted, ref, reactive } from "vue"
import FormInput from "../components/inputs/FormInput.vue"
import hashPassword from "../lib/passwordManager"
import type { IUser } from "@models/userModel"

const REQUIRED_FIELD_MESSAGE: string = "required field"
const USERNAME_MIN_LENGTH: number = 6
const MINIMUM_LENGTH_ALLOWED_MESSAGE: string = "required a minimum length of "
const INVALID_FORMAT_MESSAGE: string = "invalid format"
const INVALID_PASSWORD_FORMAT_MESSAGE: string = "password must contain:"
const PASSWORDS_DONT_MATCH_MESSAGE: string = "passwords don't match"

const emailRegExp: RegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const passwordRegExp: RegExp = new RegExp(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)

interface IRegistrationForm {
    name: string,
    surname: string,
    username: string,
    email: string,
    password: string,
    passwordCheck: string
}

interface IRegistrationError {
    message: string,
    suggestions?: string[]
}

interface IRegistrationErrors {
    name: IRegistrationError,
    surname: IRegistrationError,
    username: IRegistrationError,
    email: IRegistrationError,
    password: IRegistrationError,
    passwordCheck: IRegistrationError
}

const form = ref<IRegistrationForm>({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    passwordCheck: ""
})

const errors = ref<IRegistrationErrors>({
    name: { message: "" },
    surname: { message: "" },
    username: { message: "" },
    email: { message: "" },
    password: { message: "", suggestions: [""] },
    passwordCheck: { message: "" }
})


const resetErrors = () => {
    errors.value.name.message = ""
    errors.value.surname.message = ""
    errors.value.username.message = ""
    errors.value.email.message = ""
    errors.value.password.message = ""
    errors.value.password.suggestions = [""]
    errors.value.passwordCheck.message = ""
}

const cleanData = () => {
    form.value.name = form.value.name.trim()
    form.value.surname = form.value.surname.trim()
    form.value.username = form.value.username.trim()
    form.value.email = form.value.email.trim()
    form.value.password = form.value.password.trim()
    form.value.passwordCheck = form.value.passwordCheck.trim()
}

const validate = (): boolean => {
    let validationFailed: boolean = false
    resetErrors()

    if (form.value.name === "") {
        errors.value.name.message = REQUIRED_FIELD_MESSAGE
        validationFailed = true
    }

    if (form.value.surname === "") {
        errors.value.surname.message = REQUIRED_FIELD_MESSAGE
        validationFailed = true
    }

    if (form.value.username === "") {
        errors.value.username.message = REQUIRED_FIELD_MESSAGE
        validationFailed = true
    } else if (form.value.username.length < USERNAME_MIN_LENGTH) {
        errors.value.username.message = MINIMUM_LENGTH_ALLOWED_MESSAGE + USERNAME_MIN_LENGTH
        validationFailed = true
    }

    if (form.value.email === "") {
        errors.value.email.message = REQUIRED_FIELD_MESSAGE
        validationFailed = true
    } else if (!emailRegExp.test(form.value.email)) {
        errors.value.email.message = INVALID_FORMAT_MESSAGE
        validationFailed = true
    }

    if (form.value.password === "") {
        errors.value.password.message = REQUIRED_FIELD_MESSAGE
        validationFailed = true
    } else if (!passwordRegExp.test(form.value.password)) {
        errors.value.password.message = INVALID_PASSWORD_FORMAT_MESSAGE
        errors.value.password.suggestions = [
                "at least one upper case letter",
                "at least one lower case letter",
                "at least one digit",
                "at least one symbol (allowed symbols are: ! @ # $ % ^ & *)",
                "at least 8 characters"
            ]
        validationFailed = true
    } else if (form.value.password != form.value.passwordCheck) {
        errors.value.passwordCheck.message = PASSWORDS_DONT_MATCH_MESSAGE
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
    hashPassword(form.value.password).then(hash => {
        axios.post('http://localhost:3000/users', {
            name: form.value.name,
            surname: form.value.surname,
            username: form.value.username,
            email: form.value.email,
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
    <header>StreetMonitor</header>
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

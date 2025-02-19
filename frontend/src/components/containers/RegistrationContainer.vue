<script setup lang="ts">
import { ref } from "vue"
import FormInput from "../inputs/FormInput.vue"
import FormFieldset from "../inputs/FormFieldset.vue"
import * as yup from "yup"
import {useAuthStore} from "@/stores/auth.store.ts"
import SimpleButton from "../buttons/SimpleButton.vue"

const authStore = useAuthStore()
const passwordRules: string[] = [
    "at least one upper case letter",
    "at least one lower case letter",
    "at least one digit",
    "at least one symbol (allowed symbols are: ! @ # $ % ^ & *)",
]

yup.setLocale({
    mixed: {
        required: "required field",
    },
    string: {
        min: "must be at least ${min} characters"
    }
})

const schema = yup.object().shape({
    name: yup.string()
        .required(),
    surname: yup.string()
        .required(),
    username: yup.string()
        .required()
        .min(3),
    email: yup.string()
        .required()
        .email(),
    password: yup.string()
        .required()
        .min(6)
        .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, "match"),
    passwordConfirmation: yup.string()
        .oneOf([yup.ref("password"), undefined], "Passwords must match")

})

interface IRegistrationForm {
    name: string,
    surname: string,
    username: string,
    email: string,
    password: string,
    passwordConfirmation: string
}

const form = ref<IRegistrationForm>({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    passwordConfirmation: ""
})

const validationErrors = ref<IRegistrationForm>({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    passwordConfirmation: ""
})

const registrationError = ref<string>("")

interface IErrorObject {
    message: string,
    body?: string,
    serialize(): string
}

class ErrorObject implements IErrorObject {
    message: string
    body?: string | undefined

    constructor(message: string) {
        this.message = message
    }

    serialize(): string {
        return JSON.stringify(this)
    }
}

const signup = () => {
    schema.validate(form.value, {abortEarly: false})
        .then(user => authStore.register(user))
        .catch(e => {
            const temporaryValidationErrors: any = {}

            if (e.status && e.status == 500) {
                console.error(e)
                registrationError.value = "Internal server error. Retry later..."
                return
            }
            if (e.status && e.status == 409) {
                const {username, email} = e.response.data
                const errorObject: IErrorObject = new ErrorObject("")
                if (username) {
                    errorObject.message = "username already present"
                    temporaryValidationErrors["username"] = errorObject.serialize()
                }
                if (email) {
                    errorObject.message = "email already used"
                    temporaryValidationErrors["email"] = errorObject.serialize()
                }
            } else {
                const yupError: yup.ValidationError = e as yup.ValidationError
                yupError.inner.forEach((err) => {
                    if (err.path && !temporaryValidationErrors[err.path]) {
                        const errorObject = new ErrorObject(err.message)

                        if (err.path == "password" && err.message.includes("match")) {
                            errorObject.message = "invalid format"
                            errorObject.body = JSON.stringify(passwordRules)
                        }
                        temporaryValidationErrors[err.path] = errorObject.serialize()
                    }
                })
            }

            validationErrors.value = temporaryValidationErrors

        })
}

const updateValue = (inputName: string, newValue: string) => {
    if (
        inputName != "name" &&
        inputName != "surname" &&
        inputName != "username" &&
        inputName != "email" &&
        inputName != "password" &&
        inputName != "passwordConfirmation") return
    form.value[inputName] = newValue
}
</script>

<template>
  <div>
        <div>
            <h1 class="text-3xl font-semibold text-primary-600">SignUp</h1>
            <p class="text-xl">Create an account to continue.</p>
        </div>

        <p
            v-if="registrationError != ''"
            class="absolute top-20 w-1/2 left-1/2 -translate-x-1/2 border-2 border-error-800 rounded-md shadow-md shadow-error-400 bg-red-100 px-2 py-1 text-error-800 capitalize text-sm">
            {{ registrationError }}
        </p>
        
        <form @submit.prevent="signup">
            <FormFieldset :cols=2 legend="Personal information" hideLegend>
                <FormInput
                    v-model="form.name"
                    fieldName="name"
                    label="name"
                    ratio="1/2"
                    @input="(event) => updateValue('name', event.target.value)"
                    :error="validationErrors.name" />

                <FormInput
                    v-model="form.surname"
                    fieldName="surname"
                    label="surname"
                    ratio="1/2"
                    @input="(event) => updateValue('surname', event.target.value)"
                    :error="validationErrors.surname" />
            </FormFieldset>

            <FormFieldset :cols=1 legend="Account information" hideLegend>
                
                <FormInput
                    v-model="form.username"
                    fieldName="username"
                    label="username"
                    @input="(event) => updateValue('username', event.target.value)"
                    :error="validationErrors.username" />
                <FormInput
                    v-model="form.email"
                    type="email"
                    fieldName="email"
                    label="email"
                    @input="(event) => updateValue('email', event.target.value)"
                    :error="validationErrors.email" />
                <FormInput
                    v-model="form.password"
                    type="password"
                    fieldName="password"
                    label="password"
                    @input="(event) => updateValue('password', event.target.value)"
                    :error="validationErrors.password" />
                <FormInput
                    v-model="form.passwordConfirmation"
                    type="password"
                    fieldName="password-check"
                    label="confirm password"
                    placeholder="Insert password again"
                    @input="(event) => updateValue('passwordConfirmation', event.target.value)"
                    :error="validationErrors.passwordConfirmation" />
            </FormFieldset>
            
            <SimpleButton class="mt-10 w-full">
                Register
            </SimpleButton>
        </form>
  </div>
</template>

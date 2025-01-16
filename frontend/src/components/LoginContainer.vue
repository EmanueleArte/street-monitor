<script setup lang="ts">
import FormInput from './inputs/FormInput.vue';
</script>

<template>
    <span>StreetMonitor</span>
    <h1>Your city needs you!</h1>
    <p>Sign in to make a difference.</p>

    <form @submit.prevent="">
        <fieldset>
            <legend>Account information</legend>

            <FormInput
                fieldName="username"
                label="username / email"
                placeholder="Insert username or email"
            />

            <FormInput 
                fieldName="password"
                label="password"
                type="password"
            />
        </fieldset>

        <input type="submit" value="Sign In">
    </form>
</template>
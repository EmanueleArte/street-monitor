<script setup lang="ts">
import { ref } from 'vue';
import FormInfo from '../FormInfo.vue';
const DEFAULT_INPUT_TYPE: string = "text"

const props = defineProps<{
    label: string,
    fieldName: string,
    modelValue: string,
    type?: string,
    placeholder?: string,
    error?: string,
    ratio?: string
}>()

const errorStyle: string = props.error ? "border-error-800 text-error-800" : ""
const type: string = props.type || DEFAULT_INPUT_TYPE
const isPasswordVisible = ref<boolean>(false)

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}
</script>

<template>
    <div>
        <label :for="props.fieldName" class="flex wrap justify-items-end gap-x-2 text-sm capitalize text-dark-default">
            {{ label }}
            <p
                v-if="props.error"
                class="text-error-800 capitalize text-xs before:content-['*']"    
                >{{ JSON.parse(props.error || "{}").message }}
            </p>

            <FormInfo
                class="text-error-800 justify-self-end"
                v-if="JSON.parse(props.error || '{}').body"
                :suggestions="JSON.parse(JSON.parse(props.error || '{}').body)" />

        </label>

      <div class="relative">
        <input
            :type="type === 'password' && isPasswordVisible ? 'text' : type"
            :placeholder="placeholder || 'Insert ' + label"
            :name="props.fieldName"
            :id="props.fieldName"
            @input="$emit('input', $event)"
            class="w-full border-2 rounded-md px-2 py-2 mt-1 bg-surface-component focus:outline-primary-600"
            :class="errorStyle"
        />
        <button
            v-if="type === 'password'"
            type="button"
            @click="togglePasswordVisibility"
            class="absolute inset-y-0 right-0 px-3 pt-1 flex items-center text-sm leading-5"
        >
          <svg v-if="isPasswordVisible" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="size-6 stroke-gray-400">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="size-6 stroke-gray-400">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </button>
      </div>
    </div>

</template>
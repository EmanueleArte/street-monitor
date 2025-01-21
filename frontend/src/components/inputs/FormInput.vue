<script setup lang="ts">
const DEFAULT_INPUT_TYPE: string = "text"

const props = defineProps<{
    label: string,
    fieldName: string,
    modelValue: string,
    type?: string,
    placeholder?: string,
    error?: {
        message: string,
        suggestions?: string[]
    },
    ratio?: string
}>()

const errorStyle: string = props.error?.message ? "border-red-800 text-red-800" : ""


</script>

<template>
    <div class="inline-grid">
        <label :for="props.fieldName" class="text-sm capitalize text-dark-default">
            {{ label }}
        </label>
        <p
            v-if="error"
            class="text-red-800 capitalize text-xs"    
        >{{ error.message }}
            <ul v-if="error.suggestions && error.suggestions.length > 1">
                <li v-for="suggestion in error.suggestions">{{ suggestion }}</li>
            </ul>
        </p>
        <input
        :type="type || DEFAULT_INPUT_TYPE"
        :placeholder="placeholder || 'Insert ' + label"
        :name="props.fieldName"
        :id="props.fieldName"
        v-model="props.modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
        class="w-full border-2 rounded-md px-2 py-1 mt-1 bg-surface-component text-dark-default focus:outline-primary-default focus:text-dark-default"
        :class="errorStyle"
        />
    </div>

</template>
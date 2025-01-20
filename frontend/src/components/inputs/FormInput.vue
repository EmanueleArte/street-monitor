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

const withRatio: string = "basis-" + props.ratio || "full"
</script>

<template>
    <p v-if="error">{{ error.message }}
        <ul v-if="error.suggestions && error.suggestions.length > 1">
            <li v-for="suggestion in error.suggestions">{{ suggestion }}</li>
        </ul>
    </p>
    <label
        class="text-sm inline-grid capitalize text-dark-default"
        
    >
        {{ label }}
        <input
        :type="type || DEFAULT_INPUT_TYPE"
        :placeholder="placeholder || 'Insert ' + label"
        :name="props.fieldName"
        :id="props.fieldName"
        v-model="props.modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="border-2 rounded-md px-2 py-1 mt-1 bg-surface-component text-dark-default focus:outline-primary-default w-full"
        />
    </label>
</template>
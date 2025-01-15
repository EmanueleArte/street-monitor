<script setup lang="ts">
const DEFAULT_INPUT_TYPE: String = "text"
const props = defineProps([
    'type',
    'label',
    'fieldName',
    'placeholder',
    'modelValue',
    'error'])
</script>

<template>
    <p v-if="error">{{ error.message }}
        <ul v-if="error.suggestions && error.suggestions.length > 1">
            <li v-for="suggestion in error.suggestions">{{ suggestion }}</li>
        </ul>
    </p>
    <label>{{ label }}</label>
    <input
        :type="type || DEFAULT_INPUT_TYPE"
        :placeholder="placeholder || 'Insert ' + label"
        :name="props.fieldName"
        :id="props.fieldName"
        v-model="props.modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>
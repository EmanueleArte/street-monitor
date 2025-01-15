<script setup lang="ts">
const DEFAULT_INPUT_TYPE: String = "text"
const props = defineProps([
    'type',
    'label',
    'field-name',
    'placeholder',
    'modelValue',
    'error'])
</script>

<template>
    <p v-if="error">{{ error }}</p>
    <label>{{ label }}</label>
    <input
        :type="type || DEFAULT_INPUT_TYPE"
        :placeholder="placeholder || 'Insert ' + label"
        :name="props.field-name"
        :id="props.field-name"
        v-model="props.modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>
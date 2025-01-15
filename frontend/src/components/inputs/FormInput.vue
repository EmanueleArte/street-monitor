<script setup lang="ts">
const DEFAULT_INPUT_TYPE: String = "text"
const props = defineProps(['type', 'label', 'field-name', 'modelValue'])
</script>

<template>
    <label>{{ props.label }}</label>
    <input
        v-model="props.modelValue"
        :type="type || DEFAULT_INPUT_TYPE"
        :name="props.field-name"
        :id="props.field-name"
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>
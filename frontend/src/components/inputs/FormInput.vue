<script setup lang="ts">
import FormInfo from '../FormInfo.vue';
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

const errorStyle: string = props.error?.message ? "border-error-default text-error-default" : ""
const type: string = props.type || DEFAULT_INPUT_TYPE
</script>

<template>
    <div class="">
        <label :for="props.fieldName" class="flex wrap justify-items-end gap-x-2 text-sm capitalize text-dark-default">
            {{ label }}
            <p
                v-if="error?.message"
                class="text-error-default capitalize text-xs before:content-['*']"    
                >{{ error.message }}


            </p>
            <FormInfo
                class="text-error-default justify-self-end"
                v-if="error?.suggestions && error.suggestions?.length > 1"
                :suggestions="props.error?.suggestions" />

        </label>


        <input
        :type="type"
        :placeholder="placeholder || 'Insert ' + label"
        :name="props.fieldName"
        :id="props.fieldName"
        v-model="props.modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
        class="w-full border-2 rounded-md px-2 py-2 mt-1 bg-surface-component text-dark-default focus:outline-primary-default focus:text-dark-default"
        :class="errorStyle"
        />

    </div>

</template>
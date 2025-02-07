<script setup lang="ts">
// text-primary-600
const props = defineProps<{
  // classes?: string,
  screenReaderLabel?: string,
  outline?: boolean,
  size?: string
}>()

const buttonSize: string = convertSizeToPadding(props.size)
const buttonStyle: string = props.outline ?
  'bg-surface-component text-primary-600 border border-primary-600 hover:bg-primary-100 hover:border-primary-700' :
  'bg-primary-600 text-light hover:bg-primary-700'

function convertSizeToPadding(size: string | undefined): string {
  if (!size) return 'px-4'
  if (size === 'small') return 'px-0'
  if (size === 'big') return 'px-8'
  return 'px-4'
}
</script>

<template>
  <button
    class="rounded-lg py-2 duration-300 disabled:cursor-not-allowed disabled:opacity-75"
    :class="[buttonStyle, buttonSize]"
  >
    <span class="sr-only">{{ screenReaderLabel }}</span>
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">

</style>
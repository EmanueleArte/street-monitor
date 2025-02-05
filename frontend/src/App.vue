<script setup lang="ts">
import { RouterView } from "vue-router"
</script>

<template>
  <RouterView/>
</template>

<style lang="scss">
@use "./style/tailwind" as *;

body {
  margin: 0;
  overflow: hidden;
}
</style>
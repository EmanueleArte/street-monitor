<script setup lang="ts">
import Map from "@/components/Map.vue"
import FloatingRoundButton from "@/components/buttons/FloatingRoundButton.vue"

</script>

<template>
  <div class="homeContainer">
    <Map :zoom="12" :usePosition=true></Map>
    <FloatingRoundButton class="z-50 fixed bottom-4 right-4">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="size-8">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    </FloatingRoundButton>
  </div>
</template>

<style lang="scss">
@use "../style/tailwind" as *;
</style>
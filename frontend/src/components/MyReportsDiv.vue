<script setup lang="ts">
import { defineProps } from "vue"

const props = defineProps({
  isVisible: { type: Boolean, required: true }
})
</script>

<template>
    <div v-show="isVisible" class="my-reports-div bg-blue-400">
        My reports:
    </div>
</template>

<style lang="scss">
@use "../style/vars" as *;

.my-reports-div {
    position: absolute;
    bottom: 0;
    left: 0.4rem;
    right: 0.4rem;
    height: 60%;
    z-index: $home_page_divs_z_index;
    padding: 0.8rem;
    border: solid 2px white;
    border-bottom : none;
    border-radius: 18px 18px 0 0;
}

</style>
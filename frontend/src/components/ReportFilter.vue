<script setup lang="ts">
import type { IReport } from "@models/reportModel.ts"
import { onMounted, onUnmounted, ref } from "vue"
import SlideFromTop from "@/components/transitions/SlideFromTop.vue"

const props = defineProps<{
  reports?: IReport[]
}>()

const show = ref<boolean>(true)
const observer = ref<MutationObserver | null>(null)

const observeTile = () => {
  observer.value = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        const element = document.querySelector<HTMLElement>(".tile")
        show.value = !element;
      }
    })
  })

  observer.value.observe(document.body, { childList: true, subtree: true })
}

onMounted(observeTile)
onUnmounted(() => {
  observer.value?.disconnect()
})
</script>

<template>
  <SlideFromTop>
    <div v-if="show" class="absolute w-screen top-10 p-4">
      <div class="w-full bg-surface-default shadow-lg rounded-xl p-4">
        filter
      </div>
    </div>
  </SlideFromTop>
</template>

<style scoped lang="scss">

</style>
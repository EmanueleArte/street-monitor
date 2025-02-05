<script setup lang="ts">
import { ref } from "vue"
import Camera from "simple-vue-camera"
import SlideFromBottom from "@/components/transitions/SlideFromBottom.vue"
import SimpleButton from "@/components/buttons/SimpleButton.vue"
import FloatingRoundButton from "@/components/buttons/FloatingRoundButton.vue"

defineProps<{
  resolution: { width: number, height: number }
  snapshot?: Blob | null
}>()
const emit = defineEmits(["update:snapshot"])

const cameraRef = ref<InstanceType<typeof Camera>>()
const cameraOpen = ref<boolean>(false)

const openCamera = () => {
  cameraOpen.value = true
}

const closeCamera = () => {
  cameraOpen.value = false
}

const takeSnapshot = async () => {
  const blob = await cameraRef.value?.snapshot()
  emit("update:snapshot", blob)
  closeCamera()
}
</script>

<template>
  <SimpleButton @click="openCamera">Take picture</SimpleButton>

  <SlideFromBottom @on-completed="() => {}">
    <div v-if="cameraOpen" class="w-screen h-screen fixed z-50 top-0 left-0 bg-black flex flex-col justify-between">
      <section class="md:h-[80vh]">
        <camera ref="cameraRef" :resolution="resolution" :autoplay="true"></camera>
      </section>

      <section class="h-full flex flex-col justify-center">
        <div class="relative flex flex-row justify-center items-center">
          <FloatingRoundButton classes="!w-20 !h-20" @click="takeSnapshot">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white"
                 class="size-10">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"/>
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"/>
            </svg>
          </FloatingRoundButton>
          <svg @click="closeCamera" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke-width="1.5"
               stroke="white" class="size-12 absolute right-16 md:right-1/3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
          </svg>
        </div>
      </section>
    </div>
  </SlideFromBottom>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Camera from "simple-vue-camera"
import SlideFromBottom from "@/components/transitions/SlideFromBottom.vue"
import SimpleButton from "@/components/buttons/SimpleButton.vue"

defineProps<{
  resolution: { width: number; height: number }
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
}
</script>

<template>
  <SimpleButton @action="openCamera">Start camera</SimpleButton>
  <SlideFromBottom @on-completed="() => {}">
    <div v-if="cameraOpen" class="w-screen h-screen fixed z-50 top-0 left-0 bg-black flex flex-col justify-between">
      <SimpleButton @action="closeCamera">Close camera</SimpleButton>
      <camera ref="cameraRef" :resolution="resolution" :autoplay="true"></camera>
      <SimpleButton @action="takeSnapshot">Create snapshot</SimpleButton>
    </div>
  </SlideFromBottom>
</template>

<style scoped lang="scss">

</style>
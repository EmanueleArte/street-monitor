<script setup lang="ts">
import Pin from "@/components/pins/Pin.vue"
import { computed } from "vue"
import { formatUnderscoredString } from "@/lib/stringUtility.ts"
import type { IFavoriteSpot } from "@models/favoriteSpotModel.ts"

const props = defineProps<{
  spot: IFavoriteSpot
}>()

const iconSize: number = 48

const emit = defineEmits<{
  (e: 'click'): void
}>()

function clickHandler() {
  emit('click')
}

const iconPath = computed(() => "../src/assets/icons/spot_pin.png")
</script>

<template>
  <Pin
      :lat="props.spot.coordinates[0]"
      :lng="props.spot.coordinates[1]"
      :iconUrl="iconPath"
      :iconSize="iconSize"
      :alt="`Favorite spot: ${formatUnderscoredString(props.spot.label)}`"
      @click="clickHandler"
  />
</template>

<style scoped lang="scss">

</style>
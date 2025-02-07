<script setup lang="ts">
import Pin from "@/components/pins/Pin.vue"
import { computed } from "vue"
import { formatUnderscoredString } from "@/lib/stringUtility.ts"
import type { IFavoriteSpot } from "@models/favoriteSpotModel.ts"
import { LPopup } from "@vue-leaflet/vue-leaflet"

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

const iconPath = computed(() => "./icons/spot_pin.png")
</script>

<template>
  <Pin
      :lat="props.spot.coordinates[0]"
      :lng="props.spot.coordinates[1]"
      :iconUrl="iconPath"
      :iconSize="iconSize"
      :alt="`Favorite spot: ${props.spot.label}`"
  >
    <LPopup class="cursor-pointer hover:text-primary-700 duration-300" :options="{ offset: [0, -30] }"
            @click="clickHandler"
    >
      {{ props.spot.label }}
    </LPopup>
  </Pin>
</template>

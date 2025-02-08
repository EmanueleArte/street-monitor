<script setup lang="ts">
import { formatDate } from "@/lib/stringUtility"
import { usePositionStore } from "@/stores/position.store"
import { useReportStore } from "@/stores/report.store"
import type { IFavoriteSpot } from "@models/favoriteSpotModel"
import type { IReport } from "@models/reportModel"
import axios from "axios"

const props = defineProps<{
  date: Date,
  read: boolean,
  reportId?: string,
  favoriteSpot?: IFavoriteSpot
}>()

const emit = defineEmits<{
  (e: "change", page: string): void,
}>()

console.log(props)


// text-slate-500/65
// text-black/65
// text-primary-600/65
const readOpacity: number = 65

const positionStore = usePositionStore()

function goToReport() {
  axios.get<IReport>("http://localhost:3000/reports/by-id/" + props.reportId)
      .then(report => {
        positionStore.setFlyMainMap(true)
        positionStore.move(report.data.coordinates)
        useReportStore().setReport(report.data)
        emitChange()
      })
}

function goToSpot() {
  if (!props.favoriteSpot) return
  positionStore.setFlyMainMap(true)
  positionStore.move(props.favoriteSpot?.coordinates)
  emitChange()
}

function emitChange() {
  if (window.innerWidth <= 768) { // md
    emit("change", "home")
  }
}

</script>

<template>
  <div class="flex flex-col justify-items-center py-2" :class="`text-black${props.read ? `/${readOpacity}` : ''}`">
    <div class="text-end text-xs leading-tight" :class="`text-slate-500${props.read ? `/${readOpacity}` : ''}`">
      {{ formatDate(props.date) }}
    </div>
    <div class="flex gap-4">
      <div class="flex flex-col justify-center">
        <svg v-if="props.read" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
             stroke-width="1.5" stroke="currentColor" class="size-7">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor" class="size-7">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"/>
        </svg>
      </div>

      <slot/>
    </div>
    <div class="ms-11 flex text-xs leading-tight gap-x-4"
         :class="`text-primary-600${props.read ? `/${readOpacity}` : ''}`"
    >
      <button v-if="props.reportId" @click="goToReport" class="nav-close">Go to report</button>
      <button v-if="props.favoriteSpot" @click="goToSpot" class="nav-close">Go to favorite spot</button>
    </div>
  </div>
</template>
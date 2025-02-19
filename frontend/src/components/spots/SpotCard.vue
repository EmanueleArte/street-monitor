<script setup lang="ts">
import type { IFavoriteSpot } from "@models/favoriteSpotModel.ts"
import { ref, type PropType } from "vue"
import SimpleButton from "@/components/buttons/SimpleButton.vue"
import axios from "axios"
import { usePositionStore } from "@/stores/position.store.ts"
import { useAuthStore } from "@/stores/auth.store.ts"
import type { IUser } from "@models/userModel.ts"

const props = defineProps({
  spot: {type: Object as PropType<IFavoriteSpot>, required: true}
})

const emit = defineEmits<{
  (e: "updateTiles"): void
}>()

const positionStore = usePositionStore()
const authStore = useAuthStore()

const deleteSpot = async () => {
  axios.delete<IUser>(`http://localhost:3000/users/${authStore.get()?.username}/favorites/${props.spot._id}`)
      .then(res => {
        if (res.status !== 200) return
        emit("updateTiles")
      })
      .catch(err => console.error(err))
}

const moveToSpot = () => {
  positionStore.setFlyMainMap(true)
  positionStore.move(props.spot.coordinates)
}

const pillText = ref<string>(props.spot.label)
const deleteButtonIsActive = ref<boolean>(false)

function handleHover() {
  pillText.value = props.spot.coordinates.toLocaleString().replace(",", " ")
  deleteButtonIsActive.value = true
}

function handleLeave() {
  pillText.value = props.spot.label
  deleteButtonIsActive.value = false
}
</script>

<template>
  <article class="p-3 m-2 rounded-lg bg-surface-component shadow-lg md:hidden ">
    <div class="flex items-center justify-center mb-1 w-full">
      <p class="basis-[80%]">{{ spot.label }}</p>
      <SimpleButton @click="deleteSpot"
                    class="!bg-surface-component border-none !rounded-lg basis-[20%] !p-0 flex justify-center items-center text-black"
                    screenReaderLabel="Delete spot"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" class="size-4">
          <path fill-rule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                clip-rule="evenodd"/>
        </svg>
      </SimpleButton>
    </div>
    <p class="text-[0.7rem]"> Lat: {{ spot.coordinates[0] }}</p>
    <p class="text-[0.7rem] mb-2"> Lon: {{ spot.coordinates[1] }}</p>
    <SimpleButton @click="moveToSpot" class="text-[0.7rem] !px-2 !py-1 !rounded-lg">Go to spot</SimpleButton>
  </article>

  <article @mouseover="handleHover" @mouseleave="handleLeave" class="shrink-0 hidden md:flex bg-surface-default rounded-full text-black text-sm md:shadow px-2 py-1
            md:hover:shadow-md md:hover:bg-surface-component md:hover:text-black/70 min-w-28 gap-2 justify-between">
    <button @click="moveToSpot" class="text-nowrap">
      {{ pillText }}
    </button>
    <button class="text-error-800" v-if="deleteButtonIsActive" @click="deleteSpot">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
        <path fill-rule="evenodd"
              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
              clip-rule="evenodd"/>
      </svg>
    </button>
  </article>
</template>
<script setup lang="ts">
import axios from "axios"
import { onMounted, ref } from "vue"
import MovieMiniCard from "@/components/MovieMiniCard.vue"
import replaceByDefault from "@/lib/replaceByDefault"
import { NOT_FOUND_IMAGE } from "@/lib/replaceByDefault"
import Map from "@/components/Map.vue"

const movie = ref({})

const getLastMovie = async () => {
  try {
    const data = (await axios.get("http://localhost:3000/movies/best")).data
    if (data.poster != null && data.poster !== "") {
      data.poster = data.poster.replace("http://ia.media-imdb.com/", "https://m.media-amazon.com/")
    } else {
      data.poster = NOT_FOUND_IMAGE
    }
    movie.value = data
  } catch (e) {
    console.error(e)
  }
}
onMounted(getLastMovie)
</script>

<template>
  <div class="homeContainer">
    <Map />
  </div>
</template>

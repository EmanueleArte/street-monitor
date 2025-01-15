<script setup>
import axios from "axios"
import { onMounted, ref } from "vue"
import replaceByDefault from "@/lib/replaceByDefault"
import { NOT_FOUND_IMAGE } from "@/lib/replaceByDefault"

const props = defineProps(["id"])
const movie = ref({})

const getMovie = async (id) => {
  try {
    const data = (await axios.get("http://localhost:3000/movies/" + id)).data
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
onMounted(() => getMovie(props.id))
</script>

<template>
  <div class="filmCard">
    <div class="filmCardImg">
      <img alt="" :src="movie.poster" @error="replaceByDefault" />
    </div>
    <div class="filmCardTxt">
      <h1>{{ movie.title }}</h1>
      <p>{{ movie.plot }}</p>
    </div>
  </div>
</template>

<style scoped>
.filmCard {
  width: 30%;
  box-sizing: border-box;
  height: 200px;
  display: inline-flex;
  flex-direction: row;
  border: 1px solid gray;
  border-radius: 10px;
  overflow: hidden;
  background-color: #f5f5f5;
}

.filmCard h1 {
  font-size: 22px;
}

.filmCardImg {
  height: 100%;
}

.filmCardImg img {
  height: 100%;
  width: auto;
}

.filmCardTxt {
  padding: 2px;
}
</style>

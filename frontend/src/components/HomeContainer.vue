<script setup>
import axios from "axios"
import { onMounted, ref } from "vue"
import MovieMiniCard from "@/components/MovieMiniCard.vue"
import replaceByDefault from "@/lib/replaceByDefault"
import { NOT_FOUND_IMAGE } from "@/lib/replaceByDefault"

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
    <div class="last">
      <div class="coverImage"><img :src="movie.poster" class="card-img" alt="" @error="replaceByDefault" /></div>
      <div class="pattern"></div>
      <div class="coverText">
        <div>
          <h1>{{ movie.title }}</h1>
          <p>{{ movie.plot }}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid d-flex justify-content-center gap-5">
    <MovieMiniCard id="5692a15524de1e0ce2dfcfa3" />
    <MovieMiniCard id="5692a56f24de1e0ce2dfdd0b" />
    <MovieMiniCard id="5692a57524de1e0ce2dfdd14" />
  </div>
</template>

<style>
.homeContainer {
  margin-bottom: 200px;
}
.last {
  margin: 50px;
  border-radius: 30px;
  box-sizing: border-box;
  overflow: hidden;
}
.last > * {
  width: 100%;
  height: 500px;
}
.coverImage {
  filter: blur(5px);
  position: relative;
  overflow: hidden;
  margin-bottom: -500px;
}
.coverImage img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.pattern {
  position: relative;
  background-image: url("https://pngimg.com/uploads/dot/dot_PNG4.png");
  background-repeat: repeat;
  background-size: 5px;
  opacity: 0.5;
  margin-bottom: -500px;
}
.coverText {
  justify-content: center;
  align-items: center;
  position: relative;
  display: flex;
  flex-direction: column;
  color: white;
}
.coverText div {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  margin: auto;
  padding: 20px 40px;
  text-align: center;
}
</style>

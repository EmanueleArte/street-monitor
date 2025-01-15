<script setup>
import MovieCard from "@/components/MovieCard.vue";
import { NOT_FOUND_IMAGE } from "@/lib/replaceByDefault";
import axios from "axios";
import { onMounted, ref } from "vue";

const movies = ref(null)

const listMovies = async () => {
  try {
    const data = (await axios.get("http://localhost:3000/movies")).data
    data.forEach((movie) => {
      if (movie.poster != null) {
        movie.poster = movie.poster.replace("http://ia.media-imdb.com/", "https://m.media-amazon.com/")
      } else {
        movie.poster = NOT_FOUND_IMAGE
      }
    })
    movies.value = data
  } catch (e) {
    console.error(e)
  }
}

onMounted(listMovies)
</script>

<template>
  <section>
    <div class="row">
      <div class="col">
        <MovieCard v-for="movie in movies" :movie="movie" :key="movie.id" />
      </div>
    </div>
  </section>
</template>

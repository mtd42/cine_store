<script>
import { useMovieStore } from "@/stores/MoviesStore";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const movieStore = useMovieStore();
    const { mostPopularMovies } = storeToRefs(movieStore);
    movieStore.getMostPopularMovies();
    return { movieStore, mostPopularMovies };
  }
};
</script>

<template>
  <div class="popular-items animate__animated animate__fadeInLeft">
    <div class="popular-item" v-for="movie of mostPopularMovies">
      <img :src="movie.image" :alt="movie.title" />
      <div class="popular-item-description">
        <div class="title">{{ movie.title }}</div>
        <div class="overview">{{ movie.overview }}</div>
      </div>
    </div>
  </div>
</template>

<style>
.popular-items {
  border: 1px solid black;
}

.popular-item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  margin-left: 0px;
}

.popular-item:first-child {
  margin-top: 0px;
}

.popular-item:last-child {
  margin-bottom: 0px;
}

.popular-item-description {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  text-align: justify;
}

.title {
  font-weight: bold;
  font-size: 3rem;
  border: 4px solid #e63950;
  color: #f9a619;
  padding: 10px;
  border-radius: 2px;
}

.overview {
  font-weight: bold;
  font-size: 1rem;
  color: rgb(168, 168, 168);
  padding: 10px;
  border-radius: 2px;
}
</style>

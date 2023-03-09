<script>
import { useMovieStore } from "../stores/MoviesStore";
import { storeToRefs } from "pinia";
export default {
  setup() {
    const movieStore = useMovieStore();
    const { favoritesMovies, deleteFavoriteMovie } = storeToRefs(movieStore);
    return { movieStore, favoritesMovies, deleteFavoriteMovie };
  }
};
</script>

<template>
  <div>
    <div
      class="movie-genre-item animate__animated animate__fadeInUpBig"
      v-for="movie of favoritesMovies"
    >
      <img :src="movie.image" :alt="movie.title" />
      <div class="movie-genre-item-description">
        <div class="movie-genre-title">
          <div class="title">{{ movie.title }}</div>
        </div>
        <div class="overview">{{ movie.overview }}</div>
        <div class="favorite" @click="movieStore.deleteFavoriteMovie(movie)" value>
          Supprimer des favoris
        </div>
      </div>
    </div>
  </div>
</template>

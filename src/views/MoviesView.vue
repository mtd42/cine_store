<script>
import { useMovieStore } from "../stores/MoviesStore";
import { storeToRefs } from "pinia";
import { VPagination } from "vuetify/components/VPagination";
export default {
  components: { VPagination },
  setup() {
    const movieStore = useMovieStore();
    const { genres, display, genreId, moviesByGenre, totalPages, pageId } = storeToRefs(movieStore);
    movieStore.getMoviesGenres();
    return { movieStore, genres, display, genreId, moviesByGenre, totalPages, pageId, genreId };
  }
};
</script>

<template>
  <div class="genre-container animate__animated animate__fadeInDown">
    <div class="genre-item-container">
      <div class="genre-item" v-for="genre of genres">
        <div @click="movieStore.getMoviesByGenreIdAndPageId(genre.id, true)">
          {{ genre.name }}
        </div>
      </div>
    </div>
    <div class="movie-genre-container" v-if="display">
      <div>
        <v-pagination
          v-model="pageId"
          :length="totalPages"
          :total-visible="6"
          @click="movieStore.getMoviesByGenreIdAndPageId(genreId, false)"
        >
        </v-pagination>
      </div>
      <div
        class="movie-genre-item animate__animated animate__fadeInUpBig"
        v-for="movie of moviesByGenre"
      >
        <img :src="movie.image" :alt="movie.title" />
        <div class="movie-genre-item-description">
          <div class="movie-genre-title">
            <div class="title">{{ movie.title }}</div>
          </div>
          <div class="overview">{{ movie.overview }}</div>
          <div class="favorite" @click="movieStore.addToFavoriteMovie(movie)" value>
            Ajouter aux favoris
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.genre-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.genre-item-container {
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  flex-direction: row;
  align-items: start;
  padding: 10px;
}

.genre-item {
  color: whitesmoke;
  text-align: center;

  padding: 2px;
  margin: 1px;
  border-bottom: 4px solid #e63950;
}

.genre-item:hover {
  border-bottom: 4px solid #f9a619;
  cursor: pointer;
}

.movie-genre-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.movie-genre-item {
  display: flex;
  margin: 5px;
  margin-left: 0px;
}

.movie-genre-item:first-child {
  margin-top: 0px;
}

.movie-genre-item:last-child {
  margin-bottom: 0px;
}

.movie-genre-item-description {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: justify;
}

.movie-genre-title {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.favorite {
  color: #e63950;
  font-size: 2rem;
  padding: 10px;
}

.favorite:hover {
  cursor: pointer;
  color: #f9a619;
}
</style>

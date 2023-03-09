<script>
import { RouterLink, RouterView } from "vue-router";
import { useMovieStore } from "@/stores/MoviesStore";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const movieStore = useMovieStore();
    const { numberOfFavoriteMovies } = storeToRefs(movieStore);
    return { movieStore, numberOfFavoriteMovies };
  }
};
</script>

<template>
  <header>
    <nav>
      <img src="../assets/logo.png" />
      <RouterLink to="/">Accueil</RouterLink>
      <RouterLink to="/populaires">Top 4 Populaires</RouterLink>
      <RouterLink to="/films">Films par Catégories</RouterLink>
      <RouterLink to="/favoris"
        >Favoris <span class="favoriteMoviesCount">{{ numberOfFavoriteMovies }}</span></RouterLink
      >
    </nav>
  </header>
  <RouterView />
</template>

<style>
header {
  background: #010101;
  display: flex;
}

nav {
  display: flex;
  /* flex-grow: 1; */
  flex-direction: column;
  align-items: center;
  width: 200px;
  position: sticky;
}

nav img {
  width: 128px;
  height: 128px;
}

nav a {
  text-align: center;
  text-decoration: none;
  border-right: 4px solid #eb5468;
  color: white;
  width: 100%;
  margin-top: 10px;
}

nav a:hover {
  color: #f9a619;
  border-right: 4px solid #f9a619;
}

.favoriteMoviesCount {
  /* background: #EB5468; */
  color: #eb5468;
  font-size: 12px;
}
</style>

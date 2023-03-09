import { defineStore } from "pinia";

export const useMovieStore = defineStore("movieStore", {
  state: () => ({
    mostPopularMovies: [],
    moviesByGenre: [],
    favoritesMovies: [],
    genres: [],
    display: false,
    genreId: 0,
    totalPages: 0,
    totalMoviesPerPage: 20,
    pageId: 1
  }),
  getters: {
    numberOfFavoriteMovies() {
      return this.favoritesMovies.length;
    }
  },
  actions: {
    async getMostPopularMovies() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=6bfe7a12173845441820cf25957f79cf&language=fr-FR")`
      );
      const data = await res.json();
      const [movie1, movie2, movie3, movie4] = data.results;
      this.mostPopularMovies = [
        {
          title: movie1.title,
          overview: movie1.overview,
          image: `https://image.tmdb.org/t/p/w500${movie1.poster_path}`
        },
        {
          title: movie2.title,
          overview: movie2.overview,
          image: `https://image.tmdb.org/t/p/w500${movie2.poster_path}`
        },
        {
          title: movie3.title,
          overview: movie3.overview,
          image: `https://image.tmdb.org/t/p/w500${movie3.poster_path}`
        },
        {
          title: movie4.title,
          overview: movie4.overview,
          image: `https://image.tmdb.org/t/p/w500${movie4.poster_path}`
        }
      ];
    },
    async getMoviesGenres() {
      const res = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=6bfe7a12173845441820cf25957f79cf&language=fr"
      );
      const data = await res.json();
      this.genres = data.genres;
      this.moviesByGenre = [];
      this.display = false;
    },
    async getMoviesByGenreIdAndPageId(genreId, isReset) {
      this.display = true;
      this.genreId = genreId;
      this.moviesByGenre = [];
      const pageNumber = isReset ? 1 : this.pageId;
      this.pageId = pageNumber;
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=6bfe7a12173845441820cf25957f79cf&with_genres=${genreId}&page=${pageNumber}&language=fr`
      );
      const data = await res.json();
      for (const result of data.results) {
        const obj = {
          id: result.id,
          title: result.title,
          overview: result.overview,
          image: `https://image.tmdb.org/t/p/w500${result.poster_path}`
        };
        this.moviesByGenre.push(obj);
      }
      this.totalPages = Math.round(data.total_pages / this.totalMoviesPerPage);
    },
    addToFavoriteMovie(movieToAdd) {
      const indexOfCurrentMovie = this.favoritesMovies.findIndex(
        (movie) => movie.id === movieToAdd.id
      );
      if (indexOfCurrentMovie === -1) {
        this.isFav = true;
        this.favoritesMovies.push(movieToAdd);
      }
    },
    deleteFavoriteMovie(movieToDelete) {
      this.favorite = "non-favorite";
      const indexOfMovieToDelete = this.favoritesMovies.findIndex(
        (movie) => movie.id === movieToDelete.id
      );
      this.favoritesMovies.splice(indexOfMovieToDelete, 1);
    }
  }
});

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import MoviesView from "@/views/MoviesView.vue";
import FavoritesView from "@/views/FavoritesView.vue";
import PopularView from "@/views/PopularView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/populaires",
      name: "populaires",
      component: PopularView
    },
    {
      path: "/films",
      name: "films",
      component: MoviesView
    },
    {
      path: "/favoris",
      name: "favoris",
      component: FavoritesView
    }
  ]
});

export default router;

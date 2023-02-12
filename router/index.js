import { createRouter, createWebHashHistory } from "vue-router";
import EstatetView from "../src/views/EstatetView.vue";
import FormAuth from "../src/views/FormAuth.vue";
import DashboardView from "../src/views/DashboardView.vue";
import EstateDetails from "../src/views/EstateDetails.vue";

const routes = [
  { path: "/estate", component: EstatetView },
  { path: "/estate/:id", component: EstateDetails },
  { path: "/login", component: FormAuth },
  { path: "/dashboard", component: DashboardView },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

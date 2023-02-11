import { createRouter, createWebHashHistory } from "vue-router";
import EstatetView from "../src/views/EstatetView.vue";
import FormAuth from "../src/views/FormAuth.vue";
// import App from "../src/App.vue";
const routes = [
  { path: "/estate", component: EstatetView },
  { path: "/login", component: FormAuth },
  //   { path: "/", component: App },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

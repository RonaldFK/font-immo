import { createRouter, createWebHashHistory } from "vue-router";
import TestView from "../src/views/TestView.vue";
import FormAuth from "../src/views/FormAuth.vue";
// import App from "../src/App.vue";
const routes = [
  { path: "/test", component: TestView },
  { path: "/login", component: FormAuth },
  //   { path: "/", component: App },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

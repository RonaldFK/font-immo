import { createRouter, createWebHashHistory } from "vue-router";
import TestView from "../src/views/TestView.vue";
import App from "../src/App.vue";
const routes = [
  { path: "/test", component: TestView },
  { path: "/", component: App },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

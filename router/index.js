import { createRouter, createWebHashHistory } from 'vue-router';
import EstateView from '../src/views/EstateView.vue';
import FormAuth from '../src/views/FormAuth.vue';
import DashboardView from '../src/views/DashboardView.vue';
import EstateDetails from '../src/views/EstateDetails.vue';
// import NavBarEstate from "../src/views/navigate/NavBarEstate.vue";

const routes = [
  {
    path: '/estate',
    component: EstateView,
  },
  {
    path: '/estate/:id',
    component: EstateDetails,
  },
  { path: '/login', component: FormAuth },
  {
    path: '/dashboard',
    component: DashboardView,
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

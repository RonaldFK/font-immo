import { createRouter, createWebHashHistory } from "vue-router";
import EstateView from "../src/views/EstateView.vue";
import FormAuth from "../src/views/FormAuth.vue";
import DashboardView from "../src/views/DashboardView.vue";
import EstateDetails from "../src/views/EstateDetails.vue";
import NavBarEstate from "../src/views/navigate/NavBarEstate.vue";

const routes = [
  {
    path: "/estate",
    components: {
      default: EstateView,
      wiew_two: NavBarEstate,
    },
  },
  {
    path: "/estate/:id",
    component: {
      default: EstateDetails,
      wiew_two: NavBarEstate,
    },
  },
  { path: "/login", component: FormAuth },
  {
    path: "/dashboard",
    components: {
      default: DashboardView,
      wiew_two: EstateDetails,
    },
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

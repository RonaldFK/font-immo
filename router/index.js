import { createRouter, createWebHashHistory } from 'vue-router';
import EstateView from '../src/views/EstateView.vue';
import FormAuth from '../src/views/FormAuth.vue';
import DashboardView from '../src/views/DashboardView.vue';
import EstateDetails from '../src/views/EstateDetails.vue';
import CustomerView from '@/views/CustomerView.vue';
import ModalCreateEstate from '../src/components/modales/ModalCreateEstate.vue';
import ModalCreateCustomer from '../src/components/modales/ModalCreateCustomer.vue';
// import NavBarEstate from "../src/views/navigate/NavBarEstate.vue";

const routes = [
  {
    path: '/',
    component: DashboardView,
  },
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
  { path: '/customer', component: CustomerView },
  { path: '/manager/create-estate', component: ModalCreateEstate },
  { path: '/manager/create-customer', component: ModalCreateCustomer },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

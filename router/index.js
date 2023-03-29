import { createRouter, createWebHashHistory } from 'vue-router';
import EstateView from '../src/views/EstateView.vue';
import Signup from '../src/views/Signup.vue';
import Signin from '../src/views/Signin.vue';
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
  { path: '/signup', component: Signup },
  { path: '/signin', component: Signin },
  {
    path: '/dashboard',
    component: DashboardView,
  },
  { path: '/customer', component: CustomerView },
  { path: '/estate/create-estate', component: ModalCreateEstate },
  { path: '/customer/create-customer', component: ModalCreateCustomer },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

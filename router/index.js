import { createRouter, createWebHashHistory } from 'vue-router';
import EstateView from '../src/views/EstateView.vue';
import Signup from '../src/views/Signup.vue';
import Signin from '../src/views/Signin.vue';
import DashboardView from '../src/views/DashboardView.vue';
import EstateDetails from '../src/views/EstateDetails.vue';
import CustomerView from '@/views/CustomerView.vue';
import ModalCreateEstate from '../src/components/modales/ModalCreateEstate.vue';
import ModalCreateCustomer from '../src/components/modales/ModalCreateCustomer.vue';
import notFound from '../src/views/notFound.vue';
import MyEstate from '../src/views/MyEstate.vue';
import MyForm from '../src/views/MyForm.vue';
// import ConnectionManager from '../src/views/ConnectionManager.vue';
// import Vue from 'vue';
const routes = [
  { path: '/socket', component: MyForm },
  {
    path: '/',
    component: DashboardView,
  },
  {
    path: '/estate',
    component: EstateView,
  },
  {
    path: '/manager/my-estate',
    component: MyEstate,
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
  {
    path: '/customer',
    component: CustomerView,
  },
  {
    path: '/estate/create-estate',
    component: ModalCreateEstate,
  },
  {
    path: '/customer/create-customer',
    component: ModalCreateCustomer,
  },
  { path: '/:pathMatch(.*)*', component: notFound },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// import Vue from 'vue';
// router.beforeEach(() => {
//   if (!Vue?.$cookies?.get('token')) {
//     router.push('/signin');
//
//   }
// });

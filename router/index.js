import { createRouter, createWebHashHistory } from 'vue-router';
import EstateView from '../src/views/estateView/EstateView.vue';
import Signup from '../src/views/signup/Signup.vue';
import Signin from '../src/views/signin/Signin.vue';
import DashboardView from '../src/views/dashboard/DashboardView.vue';
import EstateDetails from '../src/views/estateDetails/EstateDetails.vue';
import CustomerView from '@/views/customer/CustomerView.vue';
import ModalCreateEstate from '../src/components/modales/createEstate/ModalCreateEstate.vue';
import ModalCreateCustomer from '@/components/modales/createCustomer/ModalCreateCustomer.vue';
import notFound from '../src/views/notFound/notFound.vue';
import MyEstate from '../src/views/myEstate/MyEstate.vue';
import ModalHandleEstate from '../src/components/modales/handleEstate/ModalHandleEstate';
// import Vue from 'vue';
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
    path: '/manager/my-estate',
    component: MyEstate,
  },
  {
    path: '/estate/:id',
    component: EstateDetails,
  },
  {
    path: '/estate/modify/:id',
    component: ModalHandleEstate,
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

import { createRouter, createWebHashHistory } from 'vue-router';
import EstateView from '../src/views/EstateView.vue';
import Signup from '../src/views/Signup.vue';
import Signin from '../src/views/Signin.vue';
import DashboardView from '../src/views/DashboardView.vue';
import EstateDetails from '../src/views/EstateDetails.vue';
import CustomerView from '@/views/CustomerView.vue';
import ModalCreateEstate from '../src/components/modales/ModalCreateEstate.vue';
import ModalCreateCustomer from '../src/components/modales/ModalCreateCustomer.vue';
import MyEstate from '../src/views/MyEstate.vue';
// import NavBarEstate from "../src/views/navigate/NavBarEstate.vue";
import Vue from 'vue';
const routes = [
  {
    path: '/',
    component: DashboardView,
    beforeEnter: () => {
      if (!Vue?.$cookies?.get('token')) {
        router.push('/signin');
      }
    },
  },
  {
    path: '/estate',
    component: EstateView,
    beforeEnter: () => {
      if (!Vue?.$cookies?.get('token')) {
        router.push('/signin');
      }
    },
  },
  {
    path: '/manager/my-estate',
    component: MyEstate,
    beforeEnter: () => {
      if (!Vue?.$cookies?.get('token')) {
        router.push('/signin');
      }
    },
  },
  {
    path: '/estate/:id',
    component: EstateDetails,
    beforeEnter: () => {
      if (!Vue?.$cookies?.get('token')) {
        router.push('/signin');
      }
    },
  },
  { path: '/signup', component: Signup },
  { path: '/signin', component: Signin },
  {
    path: '/dashboard',
    component: DashboardView,
    beforeEnter: () => {
      if (!Vue?.$cookies?.get('token')) {
        router.push('/signin');
      }
    },
  },
  {
    path: '/customer',
    component: CustomerView,
    beforeEnter: () => {
      if (!Vue?.$cookies?.get('token')) {
        router.push('/signin');
      }
    },
  },
  {
    path: '/estate/create-estate',
    component: ModalCreateEstate,
    beforeEnter: () => {
      if (!Vue?.$cookies?.get('token')) {
        router.push('/signin');
      }
    },
  },
  {
    path: '/customer/create-customer',
    component: ModalCreateCustomer,
    beforeEnter: () => {
      if (!Vue?.$cookies?.get('token')) {
        router.push('/signin');
      }
    },
  },
  // { path: "*", component: PageNotFound }
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

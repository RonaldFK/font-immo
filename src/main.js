import { createApp } from 'vue';
import '../public/style.css';
import App from './views/app/App.vue';
import { router } from './../router/index';
import VueCookies from 'vue-cookies';
// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/dist/vuetify.min.css';

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(router).use(vuetify).use(VueCookies).mount('#app');

import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';

import Main from './pages/Main.vue';
import About from './pages/About.vue';
import { BootstrapVue } from 'bootstrap-vue'

Vue.use(BootstrapVue);
Vue.use(VueRouter);


Vue.config.productionTip = false


const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Main },
    { path: '/about', component: About }
  ]
});

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
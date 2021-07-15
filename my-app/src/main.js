import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import VueRouter from 'vue-router';

import Main from './pages/Main.vue';
import About from './pages/About.vue';
import { BootstrapVue } from 'bootstrap-vue'

Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(Vuex);


Vue.config.productionTip = false


const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Main },
    { path: '/about', component: About }
  ]
});

const store = new Vuex.Store({
  state: {
    selectedArray: ['Nome Científico', 'Nome Comum'],
    animalRows: [],
    mixedAnimalRows: [],
    displayType: 'display_cards'
  },
  mutations: {
    updateSelectedArray(state, array){
      state.selectedArray = array;
    },
    updateAnimalRows(state, array){
      state.animalRows = array;
    },
    updateMixedAnimalRows(state, array){
      state.mixedAnimalRows = array;
    },
    cleanAnimalRows(state){
      state.animalRows = [];
    },
    updateDisplayType(state, type){
      state.displayType = type;
    },
  }
})

new Vue({
  render: h => h(App),
  router: router,
  store: store
}).$mount('#app')
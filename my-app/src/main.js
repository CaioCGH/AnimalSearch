import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import VueRouter from 'vue-router';

import Main from './pages/Main.vue';
import About from './pages/About.vue';
import Map from './pages/Map.vue';
import { BootstrapVue } from 'bootstrap-vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'YOUR_API_TOKEN',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
 
    //// If you want to set the version, you can do so:
    // v: '3.26',
  }})


Vue.config.productionTip = false


const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Main },
    { path: '/about', component: About },
    { path: '/map', component: Map }
  ]
});

const store = new Vuex.Store({
  state: {
    selectedArrayToCards: ['Nome Científico', 'Nome Comum', 'Observações registradas'],
    selectedArrayToTable: ['Nome Científico', 'Nome Comum'],
    animalRows: [],
    mixedAnimalRows: [],
    displayType: 'display_cards',
    localitiesWrapper: [{chosenLocality: ''}],
    conservationStatusDict:{
      "CR": "(Critically Endangered): Criticamente em Perigo",
      "EN": "(Endangered): Em Perigo",
      "VU": "(Vulnerable): Vulnerável",
      "NT": "(Near Threatened):Quase Ameaçada",
      "DD": "(Data Deficient): Dados Insuficientes",
      "LC": "(Least-Concern): Menos preocupante",
      "CITES-I": "listadas no Apêndice I que contém as espécies mais ameaçadas cujo comércio internacional é proibido.",
      "CITES-II": "listadas no Apêndice II que contém as espécies que embora atualmente não se encontrem necessariamente em perigo de extinção, poderá vir a esta situação a menos que o comércio seja estritamente controlado.",
      "CITES-III": "listadas no Apêndice III que contém as espécies incluídas por requisição de algum país que já regula o comércio destas espécies e que necessita da cooperação de outros países para prevenir a exploração ilegal ou insustentável.",
      "NL": "Não Localizada",
      "NA": "Não se Aplica"
    }
  },
  mutations: {
    updateSelectedArrayToCards(state, array){
      state.selectedArrayToCards = array;
    },
    updateSelectedArrayToTable(state, array){
      state.selectedArrayToTable = array;
    },
    updateAnimalRows(state, array){
      state.animalRows = array;
    },
    updateMixedAnimalRows(state, array){
      state.mixedAnimalRows = array;
    },
    updateDisplayType(state, type){
      state.displayType = type;
    },
    updateLocalitiesWrapper(state, array){
      state.localitiesWrapper = array;
    },
    updateSelectedArrayOnLocalities(state, availableLocalities){
      let selectedArrayWithoutLocalities = state.selectedArrayToTable.filter( element => !availableLocalities.includes(element));
      state.selectedArrayToTable = selectedArrayWithoutLocalities;
      state.selectedArrayToTable.push( ...state.localitiesWrapper.map( (wrapper) => wrapper.chosenLocality));
    }
  }
})

new Vue({
  render: h => h(App),
  router: router,
  store: store
}).$mount('#app')
import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, BTabs } from 'bootstrap-vue'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

Vue.use(BootstrapVue);
Vue.component('b-tabs', BTabs)

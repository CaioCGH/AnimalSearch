<template>
  <div id="app">
        <Navbar />
    <!-- <Header /> -->
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Navbar from './components/Navbar.vue'
// import Header from './components/Header.vue'
import Footer from './components/Footer.vue'



export default {
  components: {
      Navbar,
      //  Header,
        Footer
  }
}
</script>

<style>
  @import './assets/styles/global.css';
</style>
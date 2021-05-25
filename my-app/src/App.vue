<template>
  <div id="app">
    <!-- <Header/>
    <SearchAnimal />
    <GenreSpeciesBoard /> -->
    <Dashboard />
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// import Header from './components/Header.vue'
// import SearchAnimal from './components/SearchAnimal.vue'
// import GenreSpeciesBoard from './components/GenreSpeciesBoard.vue'
import Dashboard from './components/Dashboard.vue'


export default {
  name: 'App',
  components: {
    // Header,
    // SearchAnimal,
    // GenreSpeciesBoard,
    Dashboard
  }
}
</script>

<style>
  @import './assets/styles/global.css';
</style>
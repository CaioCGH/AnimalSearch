<template>
  <div class="hello">
    <Header />
    <div class="container mrgnbtm">
      <div class="row">
        <div class="col-md-8">
          <b-tabs  content-class="mt-4">
            <b-tab title="Banco geral" active><SearchAnimal @searchAnimal="animalSearch($event)" /></b-tab>
            <b-tab title="Wikiaves"><WikiavesSearch @wikiavesSearch="wikiavesSearch($event)" /></b-tab>
            <b-tab title="Ebird"><WikiavesSearch @wikiavesSearch="wikiavesSearch($event)" /></b-tab>
            <b-tab title="I Naturalist"><WikiavesSearch @wikiavesSearch="wikiavesSearch($event)" /></b-tab>
          </b-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue'
import SearchAnimal from './SearchAnimal.vue'
import WikiavesSearch from './WikiavesSearch.vue'
import { BTabs } from 'bootstrap-vue'
import { BTab } from 'bootstrap-vue'


import { getAllUsers, searchAnimal, wikiavesSearch } from '../services/UserService'


export default {
  name: 'Dashboard',
  components: {
    Header,
    SearchAnimal,
    WikiavesSearch, BTabs, BTab
  },
  data() {
      return {
          users: [],
          numberOfUsers: 0
      }
  },
  methods: {
    getAllUsers() {
      getAllUsers().then(response => {
        console.log(response)
        this.users = response
        this.numberOfUsers = this.users.length
      })
    },
    animalSearch(data) {
      console.log("animalSearch()")
      console.log(data);
      searchAnimal(data).then(response => {
        console.log(response);
      });
    },
    wikiavesSearch(data) {
      console.log(data);
      wikiavesSearch(data).then(response => {
        console.log(response);
      });
    },
  }
}
</script>
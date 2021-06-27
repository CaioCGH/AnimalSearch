<template>
  <div class="hello">
    <Header />
    <div class="container mrgnbtm">
      <div class="row">
        <div class="col-md-8">
          <b-tabs  content-class="mt-4">
            <b-tab title="Banco geral" active><SearchAnimal  /></b-tab>
            <b-tab title="Wikiaves"><WikiavesSearch  /></b-tab>
            <b-tab title="Ebird"><EbirdSearch /></b-tab>
            <b-tab title="I Naturalist"><WikiavesSearch  /></b-tab>
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
import EbirdSearch from './EbirdSearch.vue'
import { BTabs } from 'bootstrap-vue'
import { BTab } from 'bootstrap-vue'


export default {
  name: 'Dashboard',
  components: {
    Header,
    SearchAnimal,
    WikiavesSearch, EbirdSearch, BTabs, BTab
  },
  data() {
      return {
          users: [],
          numberOfUsers: 0
      }
  }
}
</script>
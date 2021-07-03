<template>
  <div class="hello">
    <Header />
    <div class="container mrgnbtm">
          <b-tabs  content-class="mt-4">
            <b-tab title="Banco geral Bio-Online" active><BioOnlineSearch  /></b-tab>
            <b-tab title="Wikiaves"><WikiavesSearch  /></b-tab>
            <b-tab title="Ebird"><EbirdSearch /></b-tab>
            <b-tab title="INaturalist"><InaturalistSearch  /></b-tab>
          </b-tabs>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue'
import BioOnlineSearch from './BioOnline/BioOnlineSearch.vue'
import WikiavesSearch from './Wikiaves/WikiavesSearch.vue'
import EbirdSearch from './Ebird/EbirdSearch.vue'
import InaturalistSearch from './Inaturalist/InaturalistSearch.vue'
import { BTabs } from 'bootstrap-vue'
import { BTab } from 'bootstrap-vue'


export default {
  name: 'Dashboard',
  components: {
    Header,
    BioOnlineSearch,
    WikiavesSearch, EbirdSearch, InaturalistSearch, BTabs, BTab
  },
  data() {
      return {
          users: [],
          numberOfUsers: 0
      }
  }
}
</script>
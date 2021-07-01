<template>
  <div class="container">
    <div class="row">
        <div class="col-md-7 mrgnbtm">
          <b-form-group label="Elementos retornados:" v-slot="{ ariaDescribedby }">
            <b-form-checkbox-group
              id="checkbox-group-1"
              v-model="selected"
              :options="options"
              :aria-describedby="ariaDescribedby"
              name="flavour-1"
            ></b-form-checkbox-group>
          </b-form-group>


            <b-tabs  content-class="mt-4">
                <b-tab title="Busca espécie" active><BioOnlineSpeciesSearch  :selected="selected"/></b-tab>
                <b-tab title="Busca local"><BioOnlineLocalitySearch  :selected="selected"/></b-tab>
            </b-tabs>
        </div>
    </div>
  </div>
</template>

<script>


import BioOnlineSpeciesSearch from './BioOnlineSpeciesSearch.vue'
import BioOnlineLocalitySearch from './BioOnlineLocalitySearch.vue'
import { BTabs } from 'bootstrap-vue'
import { BTab } from 'bootstrap-vue'
import { BFormCheckboxGroup, BFormGroup } from 'bootstrap-vue'


export default {
  name: 'SearchAnimal',
  components:{
      BioOnlineSpeciesSearch, BioOnlineLocalitySearch,
       BTabs, BTab, BFormCheckboxGroup, BFormGroup
  },
  data(){
    return{
        selected: [], // Must be an array reference!
        options: [
          { text: 'Taxonomia', value: 'taxonomy' },
          { text: 'Biologia/Ecologia', value: 'biology/ecology' },
          { text: 'Categorias de Ameaça', value: 'concern' },
          { text: 'Observações', value: 'observations' }
        ]
    }
  }
}
</script>
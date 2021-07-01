<template>
  <div class="container">
      <h2>Procurar no Wikiaves</h2>
      <p>Buscar por nome científico ou comum. Tente:</p>
      <ul>
          <li>quero-quero</li>
          <li>papagaio</li>
          <li>Inezia caudata</li>
          <li>Ortalis canicollis</li>
    </ul>
    <div class="row">
        <div class="col-md-7 mrgnbtm">
            <form>
                <div class="row">
                    <div class="form-group col-md-9">
                        <input type="text" class="form-control" v-model="wikiavesSearchTerm" name="wikiavesSearchTerm" id="wikiavesSearchTerm" aria-describedby="emailHelp" placeholder="buscar no Wikiaves" />
                    </div>
                </div>
                <button type="button" @click='wikiavesSearch()' class="btn btn-danger">
                     <span v-show="!loading">Pesquisar</span>
                    <b-spinner v-show="loading" small variant="primary" label="Spinning"></b-spinner>
                    <span v-show="loading">Aguarde, carregando</span>
                </button>
            </form>
        </div>
        <div v-if="hasSearched || wikiavesSearchTermResult.length != 0">
            <WikiavesSearchTermDisambiguation :wikiavesSearchTermResult="wikiavesSearchTermResult" />
        </div>

        <div v-if="hasSearched && wikiavesSearchTermResult.length === 0">
            <div class="card border-primary mb-3 mt-3" >
                <div class="card-body text-primary">
                      Nenhum resultado encontrado para a busca
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>

import { wikiavesSearch } from '../services/UserService'
import { BSpinner } from 'bootstrap-vue'
import WikiavesSearchTermDisambiguation from './WikiavesSearchTermDisambiguation.vue'


export default {
  name: 'WikiavesSearch',
  components:{
      WikiavesSearchTermDisambiguation,
      BSpinner
  },
  data() {
    return {
      wikiavesSearchTerm: '',
      wikiavesSearchTermResult: [],
      animalData : {}, 
      hasSearched: false,
      loading: false
    }
  },
    methods: {
        wikiavesSearch(){
            this.loading = true;
            console.log(this.wikiavesSearchTerm);
            const payload = {
                wikiavesSearchTerm: this.wikiavesSearchTerm
            }
            wikiavesSearch(payload).then(
                (value) => {
                    console.log(value);
                    this.wikiavesSearchTermResult = value;
                    this.hasSearched = true;
                    this.loading = false;
                })
        }
    }
}
</script>
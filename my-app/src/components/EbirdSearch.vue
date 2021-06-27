<template>
  <div class="container">
    <div class="row">
            <h2>Observações da ave no Brasil nos últimos 30 dias</h2>
        <div class="col-md-7 mrgnbtm">
            <form>
                <div class="row">
                    <div class="form-group col-md-9">
                        Nome científico
                        <input type="text" class="form-control" v-model="scientificName" name="wikiavesSearchTerm" id="wikiavesSearchTerm" aria-describedby="emailHelp" placeholder="buscar no Ebird" />
                    </div>
                </div>
                <button type="button" @click='ebirdSearch()' class="btn btn-danger">
                     <span v-show="!loading">Pesquisar</span>
                    <b-spinner v-show="loading" small variant="primary" label="Spinning"></b-spinner>
                    <span v-show="loading">Aguarde, carregando</span>
                </button>
            </form>
        </div>
        <div v-if="hasSearched || observationDataList.length != 0">
            <EbirdObservations :observationDataList="observationDataList" />
        </div>

        <div v-if="hasSearched && observationDataList.length === 0">
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

import { ebirdSearch } from '../services/UserService'
import { BSpinner } from 'bootstrap-vue'
import EbirdObservations from './EbirdObservations.vue'


export default {
  components:{
      EbirdObservations,
      BSpinner
  },
  data() {
    return {
      scientificName: '',
      observationDataList: [],
      hasSearched: false,
      loading: false
    }
  },
    methods: {
        ebirdSearch(){
            this.loading = true;
            console.log(this.scientificName);
            const payload = {
                scientificName: this.scientificName
            }
            ebirdSearch(payload).then(
                (value) => {
                    console.log(value);
                    this.observationDataList = value;
                    this.hasSearched = true;
                    this.loading = false;
                })
        }
    }
}
</script>
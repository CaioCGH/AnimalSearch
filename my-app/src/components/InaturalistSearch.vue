<template>
  <div class="container">
            <h2>Procurar no iNaturalist, últimas 30 observações na cidade de São Paulo</h2>
            <p>Apenas nomes científicos. Tente:</p>
    <div class="row">
        <ul>
          <li>Vanellus chilensis</li>
          <li>Pitangus sulphuratus</li>
          <li>Hydrochoerus hydrochaeris</li>
        </ul>
        <div class="col-md-7 mrgnbtm">
            <form>
                <div class="row">
                    <div class="form-group col-md-9">
                        Nome científico
                        <input type="text" class="form-control" v-model="scientificName" name="wikiavesSearchTerm" id="wikiavesSearchTerm" aria-describedby="emailHelp" placeholder="buscar no Inaturalist" />
                    </div>
                </div>
                <button type="button" @click='inaturalistSearch()' class="btn btn-danger">
                     <span v-show="!loading">Pesquisar</span>
                    <b-spinner v-show="loading" small variant="primary" label="Spinning"></b-spinner>
                    <span v-show="loading">Aguarde, carregando</span>
                </button>
            </form>
        </div>
        <div v-if="hasSearched || observationDataList.length != 0">
            <InaturalistObservations :observationDataList="observationDataList" />
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

import { inaturalistSearch } from '../services/UserService'
import { BSpinner } from 'bootstrap-vue'
import InaturalistObservations from './InaturalistObservations.vue'


export default {
  components:{
      InaturalistObservations,
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
        inaturalistSearch(){
            this.loading = true;
            console.log(this.scientificName);
            const payload = {
                scientificName: this.scientificName
            }
            inaturalistSearch(payload).then(
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
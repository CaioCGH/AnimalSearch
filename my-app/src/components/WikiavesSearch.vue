<template>
  <div class="container">
    <div class="row">
        <div class="col-md-7 mrgnbtm">
        <h2>Buscar espécie no Wikiaves</h2>
            <form>
                <div class="row">
                    <div class="form-group col-md-9">
                        <label htmlFor="exampleInputEmail1">Código no wikiaves</label>
                        <p>Testar:</p>
                        <ul>
                            <li>quero-quero</li>
                            <li>arara-caninde</li>
                            <li>tucano-de-bico-preto</li>
                        </ul>
                        <input type="text" class="form-control" v-model="wikiavesCode" name="wikiavesCode" id="wikiavesCode" aria-describedby="emailHelp" placeholder="wikiavesCode" />
                    </div>
                </div>
                <button type="button" @click='wikiavesSearch()' class="btn btn-danger">
                     <span v-show="!loading">Pesquisar</span>
                    <b-spinner v-show="loading" small variant="primary" label="Spinning"></b-spinner>
                    <span v-show="loading">Aguarde, carregando</span>
                </button>
            </form>
        </div>
        <div v-if="hasSearched && animalData.mainImg !== undefined">
            <WikiavesAnimal :animalData="animalData" />
        </div>
        <div v-if="hasSearched && animalData.mainImg === undefined">
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

import WikiavesAnimal from './WikiavesAnimal.vue'


export default {
  name: 'WikiavesSearch',
  components:{
      WikiavesAnimal,
      BSpinner
  },
  data() {
    return {
      wikiavesCode: '',
      animalData : {}, 
      hasSearched: false,
      loading: false
    }
  },
    methods: {
        wikiavesSearch(){
            this.loading = true;
            console.log(this.wikiavesCode);
            const payload = {
                wikiavesCode: this.wikiavesCode
            }
            wikiavesSearch(payload).then(
                (value) => {
                    console.log(value);
                    this.animalData = value;
                    this.hasSearched = true;
                    this.loading = false;
                })
        }
    }
}
</script>
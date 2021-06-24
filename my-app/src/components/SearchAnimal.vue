<template>
  <div class="container">
    <div class="row">
        <div class="col-md-7 mrgnbtm">
        <h2>Buscar espécie</h2>
            <form>
                <div class="row">
                    <div class="form-group col-md-9">
                        <label htmlFor="exampleInputEmail1">Gênero</label>
                        <input type="text" class="form-control" v-model="genus" name="genus" id="genus" aria-describedby="emailHelp" placeholder="Gênero" />
                    </div>
                    <div class="form-group col-md-9">
                        <label htmlFor="exampleInputPassword1">Espécie</label>
                        <input type="text" class="form-control" v-model="species" name="species" id="lastnspeciesame" placeholder="Espécie" />
                    </div>
                    <div class="form-group col-md-9">
                        <label htmlFor="exampleInputPassword1">Nome comum</label>
                        <input type="text" class="form-control" v-model="commonName" name="commom_name" id="commom_name" placeholder="Nome comum" />
                    </div>
                </div>
                
                <button type="button" @click='searchAnimal()' class="btn btn-danger">
                    <span v-show="!loading">Pesquisar</span>
                    <b-spinner v-show="loading" small variant="primary" label="Spinning"></b-spinner>
                    <span v-show="loading">Aguarde, carregando</span>
                </button>
            </form>
        </div>
        <div v-if="animalRows.length > 0">
            <AnimalRows :animalRows="animalRows" />
        </div>
        <div v-if="animalRows.length == 0 && result">
            
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

import { searchAnimal, wikiavesSearch } from '../services/UserService'
import { BSpinner } from 'bootstrap-vue'
import AnimalRows from './AnimalRows.vue'


export default {
  name: 'SearchAnimal',
  components:{
      AnimalRows,
      BSpinner
  },
  data() {
    return {
      genus: '',
      species: '',
      commonName: '',
      animalRows : [],
      result: false,
      loading: false
    }
  },
    methods: {
        searchAnimal(){
            this.loading = true;
            
            const payload = {
                genus: this.genus.trim(),
                species: this.species.trim(),
                commonName: this.commonName.trim()
            }
            searchAnimal(payload).then(
                (value) => {
                    this.animalRows = value;
                    this.result = true;
                    this.loading = false;
                })
      },
      clearForm() {
          this.genus = "";
          this.species = "";
          this.commonName = "";
      },
      wikiavesSearch(){
            console.log(this.wikiavesCode);
            console.log("in wikiavessearch");
            const payload = {
                wikiavesCode: this.commonName
            }
            wikiavesSearch(payload).then(
                (value) => {
                    console.log("hdsfsds");
                    console.log(value);
                    this.animalData = value;
                    this.result = true;
                })
        }
  }
}
</script>
<template>
<div>
    <h2>Buscar espécie</h2>
        <form>
            <div class="row">
                <div class="form-group col-md-9">
                    <label >Gênero</label>
                    <select v-model="chosenGenus" @change="update">
                        <option v-for="genus in genera" :key="genus.id">
                            {{ genus }}
                        </option>
                    </select>
                </div>
                <div class="form-group col-md-9">
                    <label >Espécie</label>
                    <select v-model="chosenSpecies" @change="update">
                        <option v-for="species in speciesList" :key="species.id">
                            {{ species }}
                        </option>
                    </select>
                </div>
                <div class="form-group col-md-9">
                    <label >Nome comum</label>
                    <select v-model="chosenCommonName" @change="update">
                        <option v-for="commonName in commonNames" :key="commonName.id">
                            {{ commonName }}
                        </option>
                    </select>
                </div>
            </div>
            
            <button type="button" @click='searchAnimal()' class="btn btn-danger">
                <span v-show="!loading">Pesquisar</span>
                <b-spinner v-show="loading" small variant="primary" label="Spinning"></b-spinner>
                <span v-show="loading">Aguarde, carregando</span>
            </button>
        </form>
        
        <div v-if="animalRows.length > 0">
            <AnimalRows :animalRows="animalRows" :selectedArray="selectedArray"/>
        </div>
        <div v-if="animalRows.length == 0 && result">
            <div class="card border-primary mb-3 mt-3" >
                <div class="card-body text-primary">
                        Nenhum resultado encontrado para a busca
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { searchAnimal, getGeneraSpeciesCommonName } from './BioOnlineService'
import { BSpinner } from 'bootstrap-vue'
import AnimalRows from './AnimalRows.vue'

    export default {
  name: 'BioOnlineSpeciesSearch',
  props: ['selectedArray'],
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
      loading: false,
      chosenGenus: '',
      chosenSpecies: '',
      chosenCommonName: '',
      generaSpeciesDict: {},
      genera: [],
      speciesList: [],
      commonNames: []
    }
  },
  created() {
       this.feedGeneraSpeciesCommonNameDropdown();
  },
    methods: {
        searchAnimal(){
            this.loading = true;
            
            const payload = {
                genus: this.chosenGenus.trim(),
                species: this.chosenSpecies.trim(),
                commonName: this.chosenCommonName.trim()
            }
            searchAnimal(payload).then(
                (value) => {
                    this.animalRows = value;
                    this.result = true;
                    this.loading = false;
                })
      },
      feedGeneraSpeciesCommonNameDropdown(){
            getGeneraSpeciesCommonName().then(
                (value) => {
                    this.generaSpeciesDict = value.generaSpeciesDict;
                    this.genera = Object.keys(value.generaSpeciesDict);
                    this.commonNames = value.commonNames;
                })
      },
      update(){
          console.log("updating..." + this.chosenGenus + this.chosenSpecies +this.chosenCommonName );
          this.speciesList = this.generaSpeciesDict[this.chosenGenus];
      }
  }
}
</script>
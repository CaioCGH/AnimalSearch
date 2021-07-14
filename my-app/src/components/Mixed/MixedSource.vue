<template>
<div>
        <form>
            <div class="row">
                <div class="form-group col-md-9">
                    <label >Gênero</label>
                    <select v-model="chosenGenus" @change="update">
                        <option v-for="genus in genera" :key="genus.id">
                            {{ genus }}
                        </option>
                    </select>
                    <b-spinner
          v-show="loadingSelectables"
          small
          variant="primary"
          label="Spinning"
        ></b-spinner>
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
                    <b-spinner
          v-show="loadingSelectables"
          small
          variant="primary"
          label="Spinning"
        ></b-spinner>
        {{ loadingSelectables }}
                </div>
            </div>

<div class="mb-4">
            <b-button
            @click='searchAnimal()'
            variant="primary" class="mr-2" 
            :disabled="chosenGenus == '' && chosenCommonName == ''">
                <span v-show="!loading">Pesquisar</span>
                <b-spinner v-show="loading" small variant="primary" label="Spinning"></b-spinner>
                <span v-show="loading">Aguarde, carregando</span>
            </b-button>
            
            <b-button
            @click='clearForms()'
            variant="outline-secondary" class="mr-2">
                <span v-show="!loading">Limpar campos</span>
            </b-button>

            </div>
           
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

import { searchAnimal, getGeneraSpeciesCommonName } from '../BioOnline/BioOnlineService'
import AnimalRows from '../BioOnline/AnimalRows.vue'

    export default {
  name: 'BioOnlineSpeciesSearch',
  props: ['selectedArray'],
  components:{
      AnimalRows,
  },
  data() {
    return {
      genus: null,
      species: null,
      commonName: null,
      animalRows : [],
      result: false,
      loading: false,
      loadingDownload: false,
      loadingSelectables:true,
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
                    this.loadingSelectables = false;
                })
      },
      update(){
          this.speciesList = this.generaSpeciesDict[this.chosenGenus];
      },
      clearForms(){
        this.chosenGenus = '';
        this.chosenSpecies =  '';
        this.chosenCommonName =  '';
      }
  }
}
</script>
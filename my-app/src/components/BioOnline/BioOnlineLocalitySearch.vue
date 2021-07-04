<template>
<div>
        <form>
            <div class="row">
                <div class="form-group col-md-9">
                    <b-form-checkbox
                        id="checkbox-1"
                        v-model="status"
                        name="checkbox-1"
                        value="only_names"
                        unchecked-value="not_only_names">
                            Apenas lista de espécies
                    </b-form-checkbox>
                    <label >Nome: </label>
                    
                    <select v-model="chosenLocality" @change="update">
                        <option v-for="locality in localities" :key="locality.id">
                            {{ locality }}
                        </option>
                    </select>
                </div>
            </div>
            
            <button type="button" @click='bioOnlineSearchAnimalsInLocality()' class="btn btn-danger mb-4">
                <span v-show="!loading">Pesquisar</span>
                <b-spinner v-show="loading" small variant="primary" label="Spinning"></b-spinner>
                <span v-show="loading">Aguarde, carregando</span>
            </button>

            <button type="button" @click='clearForms()' class="btn btn-light">
                <span v-show="!loading">Limpar campos</span>
            </button>
        </form>
        <div v-if="status === 'not_only_names' && animalRows.length > 0">
            <AnimalRows :animalRows="animalRows" :selectedArray="selectedArray"/>
        </div>
        <div v-if="status === 'only_names' && animalRows.length > 0">
                        <div class="card border-primary" >
                            <div class="card-body">

                        <tr v-for="animalRow in animalRows" :key="animalRow.id"> 
                            <td class="mb=8">{{animalRow['Gênero']}} {{animalRow['Espécie']}}</td>
                            <td>{{animalRow['Nome Comum']}}</td>
                        </tr>
        </div>
        </div>
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

import { bioOnlineSearchAnimalsInLocality, getBioOnlineLocalities } from './BioOnlineService'
import { BSpinner, } from 'bootstrap-vue'
import { BFormCheckbox } from 'bootstrap-vue'

import AnimalRows from './AnimalRows.vue'

    export default {
  name: 'BioOnlineLocalitySearch',
  props: ['selectedArray'],
  components:{
      AnimalRows,
      BSpinner, BFormCheckbox
  },
  data() {
    return {
      genus: '',
      species: '',
      commonName: '',
      localities : [],
      chosenLocality: null,
      animalRows: [],
      result: false,
      loading: false,
      status: 'not_only_names'
    }
  },
  created() {
       this.feedBioOnlineLocalities();
  },
    methods: {
        bioOnlineSearchAnimalsInLocality(){
            this.loading = true;
            
            const payload = {
                locality: this.chosenLocality.trim()
            }
            bioOnlineSearchAnimalsInLocality(payload).then(
                (value) => {
                    this.animalRows = value;
                    this.result = true;
                    this.loading = false;
                })
      },
        feedBioOnlineLocalities(){
            getBioOnlineLocalities().then(
                (value) => {
                    console.log(value);
                    this.localities = value.localities;
                })
      },
      clearForms() {
          this.chosenLocality = null;
      },
      update(){
          console.log("updating..." + this.chosenLocality);
      }
  }
}
</script>
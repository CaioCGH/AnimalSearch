<template>
<div class="card border-primary mb-3" >
    <div class="card-body text-primary">
        <p>{{result.nome}}</p>
        <div @click='wikiavesSearchWid(result.wid)'>
            {{result.label}}
            <b-spinner v-show="loading" small variant="primary" label="Spinning"></b-spinner>
        </div>
        <div v-if="hasSearched && animalData.mainImg !== undefined">
            <WikiavesAnimal :animalData="animalData" />
        </div>
        </div>
    </div>
</template>
<script>

import  WikiavesAnimal  from './WikiavesAnimal.vue'
import { wikiavesSearchWid } from './WikiavesService'
import { BSpinner } from 'bootstrap-vue'

export default {
    props: ['result'],
        components:{
      WikiavesAnimal,
      BSpinner
  },
  data() {
    return {
      wikiavesSearchTerm: '',
      animalData : {}, 
      hasSearched: false,
      loading: false
    }
  },
        methods: {
        wikiavesSearchWid(wid){
            this.loading = true;
            const payload = {
                wid: wid
            }
            wikiavesSearchWid(payload).then(
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

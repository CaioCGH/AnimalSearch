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
                <button type="button" @click='wikiavesSearch()' class="btn btn-danger">Pesquisar</button>
            </form>
        </div>
        <div v-if="result">
            <WikiavesAnimal :animalData="animalData" />
        </div>

    </div>
    </div>
</template>

<script>

import { wikiavesSearch } from '../services/UserService'
import WikiavesAnimal from './WikiavesAnimal.vue'


export default {
  name: 'WikiavesSearch',
  components:{
      WikiavesAnimal
  },
  data() {
    return {
      wikiavesCode: '',
      animalData : {},
      result: false
    }
  },
    methods: {
        wikiavesSearch(){
            console.log(this.wikiavesCode);
            console.log("in wikiavessearch");
            const payload = {
                wikiavesCode: this.wikiavesCode
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
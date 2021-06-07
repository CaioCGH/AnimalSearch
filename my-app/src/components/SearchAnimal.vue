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
                <button type="button" @click='searchAnimal()' class="btn btn-danger">Pesquisar</button>
            </form>
        </div>
        <div v-if="animalRows.length > 0">
            <AnimalRows :animalRows="animalRows" />
        </div>

    </div>
    </div>
</template>

<script>

import { searchAnimal, wikiavesSearch } from '../services/UserService'
import AnimalRows from './AnimalRows.vue'


export default {
  name: 'SearchAnimal',
  components:{
      AnimalRows
  },
  data() {
    return {
      genus: '',
      species: '',
      commonName: '',
      animalRows : [],
      result: false
    }
  },
    methods: {
        searchAnimal(){
            console.log(this.commonName)
            const payload = {
                genus: this.genus,
                species: this.species,
                commonName: this.commonName
            }
            searchAnimal(payload).then(
                (value) => {
                    console.log("fdsnfdsjffks")
                    console.log(value);
                    this.animalRows = value;
                    this.result = true;
                })
      },
      createUser() {
          const payload = {
              firstName: this.firstName,
              lastName: this.lastName,
              email: this.email
          }
          this.$emit('createUser', payload)
          this.clearForm();
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
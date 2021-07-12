<template>
  <div>
    <form>
      <div class="row">
        <div class="form-group col-md-9">
          <b-form-group label="Formato do resultado:" v-slot="{ ariaDescribedby }">
      <b-form-radio v-model="display_type" :aria-describedby="ariaDescribedby" name="display_type" value="display_cards">Lista de cartões</b-form-radio>
      <b-form-radio v-model="display_type" :aria-describedby="ariaDescribedby" name="display_type" value="display_table">Tabela</b-form-radio>
           </b-form-group>
          <label>Nome: </label>

          <select v-model="chosenLocality" @change="update">
            <option v-for="locality in localities" :key="locality.id">
              {{ locality }}
            </option>
          </select>
        </div>
      </div>

      <div class="mb-4">
            <b-button
            @click='bioOnlineSearchAnimalsInLocality()'
            variant="primary" class="mr-2" 
            :disabled='chosenLocality == null'>
                <span v-show="!loading">Pesquisar</span>
                <b-spinner v-show="loading" small variant="primary" label="Spinning"></b-spinner>
                <span v-show="loading">Aguarde, carregando</span>
            </b-button>

            <b-button
            v-b-modal="'downloadListModal'"
            class="mr-2"
            :disabled='chosenLocality == null'>
                <span v-show="!loading">Baixar lista</span>
                <b-spinner v-show="loadingDownload" small variant="primary" label="Spinning"></b-spinner>
                <span v-show="loading">Aguarde, carregando</span>
            </b-button>

            <b-button
            @click='clearForms()'
            variant="outline-secondary" class="mr-2">
                <span v-show="!loading">Limpar campos</span>
            </b-button>

            </div>
            <SelectDataFormat :locality="chosenLocality" :animalRows="animalRows" :selectedArray="selectedArray"/>
    </form>
    <div v-if="display_type === 'display_cards' && animalRows.length > 0">
      <AnimalRows :animalRows="animalRows" :selectedArray="selectedArray" />
    </div>
    <div v-if="display_type === 'display_table' && animalRows.length > 0">
      <BioOnlineTableRows :animalRows="animalRows" :selectedArray="selectedArray" />
    </div>
  </div>
</template>

<script>
import {
  bioOnlineSearchAnimalsInLocality,
  getBioOnlineLocalities,
  downLoadList,
} from "./BioOnlineService";
import BioOnlineTableRows from './BioOnlineTableRows.vue'
import SelectDataFormat from './SelectDataFormat.vue'
import AnimalRows from "./AnimalRows.vue";

export default {
  name: "BioOnlineLocalitySearch",
  props: ["selectedArray"],
  components: {
    AnimalRows,
    BioOnlineTableRows,
    SelectDataFormat
  },
  data() {
    return {
      genus: "",
      species: "",
      commonName: "",
      localities: [],
      chosenLocality: null,
      animalRows: [],
      result: false,
      loading: false,
      loadingDownload: false,
      display_type: "display_cards",
    };
  },
  created() {
    this.feedBioOnlineLocalities();
  },
  methods: {
    bioOnlineSearchAnimalsInLocality() {
      this.loading = true;

      const payload = {
        locality: this.chosenLocality.trim(),
      };
      bioOnlineSearchAnimalsInLocality(payload).then((value) => {
        this.animalRows = value;
        this.result = true;
        this.loading = false;
      });
    },
    downLoadList(){
            this.loadingDownload = true;
            
            const payload = {
                genus: this.chosenGenus.trim(),
                species: this.chosenSpecies.trim(),
                commonName: this.chosenCommonName.trim()
            }
            downLoadList(payload).then(
                (value) => {
                    console.log("value");
                    (value)
                    console.log(value);
                    this.result = true;
                    this.loading = false;
                });
      },
    feedBioOnlineLocalities() {
      getBioOnlineLocalities().then((value) => {
        console.log(value);
        this.localities = value.localities;
      });
    },
    clearForms() {
      this.chosenLocality = null;
    },
    update() {
      console.log("updating..." + this.chosenLocality);
    },
  },
};
</script>
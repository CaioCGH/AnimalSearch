<template>
  <div>
    <form>
      <b-form-select
        v-model="chosenLocality"
        :options="localities"
        @change="update"
      ></b-form-select>
    </form>

    <div class="mb-4 mt-2" >
      <b-button
        @click="bioOnlineSearchAnimalsInLocality()"
        variant="primary"
        class="mr-2"
        :disabled="chosenLocality == ''"
      >
        <span v-show="!loading">Pesquisar</span>
        <b-spinner
          v-show="loading"
          small
          variant="primary"
          label="Spinning"
        ></b-spinner>
        <span v-show="loading">Aguarde, carregando</span>
      </b-button>

      <b-button
        v-b-modal="'downloadListModal'"
        class="mr-2"
        :disabled="chosenLocality == ''"
      >
        <span v-show="!loading">Baixar lista</span>
        <b-spinner
          v-show="loadingDownload"
          small
          variant="primary"
          label="Spinning"
        ></b-spinner>
        <span v-show="loading">Aguarde, carregando</span>
      </b-button>

      <b-button @click="clearForms()" variant="outline-secondary" class="mr-2">
        <span v-show="!loading">Limpar campos</span>
      </b-button>
    </div>
    <SelectDataFormat :locality="chosenLocality" />
  </div>
</template>

<script>
import {
  bioOnlineSearchAnimalsInLocality,
  getBioOnlineLocalities,
  downLoadList,
} from "./BioOnlineService";
import SelectDataFormat from "./SelectDataFormat.vue";

export default {
  components: {
    SelectDataFormat,
  },
  data() {
    return {
      localities: [{ value: "", text: "Localidade" }],
      chosenLocality: "",
      result: false,
      loading: false,
      loadingDownload: false,
    };
  },
  created() {
    this.feedBioOnlineLocalities();
  },
  methods: {
    bioOnlineSearchAnimalsInLocality() {
      this.loading = true;
      console.log(this.chosenLocality.trim());
      console.log(this.chosenLocality);
      const payload = {
        locality: this.chosenLocality.trim(),
      };
      bioOnlineSearchAnimalsInLocality(payload).then((value) => {
        this.animalRows = value;
        this.result = true;
        this.loading = false;
      });
    },
    downLoadList() {
      this.loadingDownload = true;

      const payload = {
        genus: this.chosenGenus.trim(),
        species: this.chosenSpecies.trim(),
        commonName: this.chosenCommonName.trim(),
      };
      downLoadList(payload).then((value) => {
        console.log("value");
        value;
        console.log(value);
        this.result = true;
        this.loading = false;
      });
    },
    feedBioOnlineLocalities() {
      getBioOnlineLocalities().then((value) => {
        console.log(value);
        this.localities.push(...value.localities);
      });
    },
    clearForms() {
      this.chosenLocality = "";
      this.$store.commit("updateAnimalRows", []);
    },
    update() {
      console.log("updating..." + this.chosenLocality);
    },
  },
  computed: {
    displayType: {
      get() {
        return this.$store.state.displayType;
      },
      set(value) {
        this.$store.commit("updateDisplayType", value);
      },
    },
    animalRows: {
      get() {
        return this.$store.state.animalRows;
      },
      set(value) {
        this.$store.commit("updateAnimalRows", value);
      },
    },
  },
};
</script>
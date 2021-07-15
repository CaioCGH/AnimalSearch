<template>
  <div v-if="locality"><!-- por agum motivo está abrindo o modal duas vezes, a primeira sem props --> 
    <b-modal id="downloadListModal">
      <b-container fluid>
        Selecione o formato do arquivo para baixar:
        <div>
          <b-form-select
            v-model="selectedFormat"
            :options="options"
          ></b-form-select>
        </div>
      </b-container>
      <template #modal-footer="{ cancel }">
        <b-button
          size="sm"
          variant="primary"
          @click="
            download();
            cancel();
          "
        >
          <span v-show="!loading">Baixar lista</span>
          <b-spinner
            v-show="loading"
            small
            variant="primary"
            label="Spinning"
          ></b-spinner>
          <span v-show="loading">Aguarde, carregando</span>
        </b-button>
        <b-button size="sm" variant="danger" @click="cancel()">
          Cancelar
        </b-button>
      </template>
    </b-modal>
  </div>
</template>
<script>
import { downloadFromLocality } from "./BioOnlineService";

export default {
  props: ["locality"],
  data() {
    return {
      loading: false,
      selectedFormat: ".xls",
      options: [
        { text: ".xls" },
        { text: ".csv (em breve)", disabled: true },
        { text: ".pdf (em breve)", disabled: true },
        { text: ".json (em breve)", disabled: true },
      ],
    };
  },
  methods: {
    download() {
      this.loading = true;

      downloadFromLocality(
        this.$props.locality,
        this.$store.state.selectedArray
      ).then((value) => {
        value;
      });
      this.loading = false;
    },
    lol(){
      console.log("opening");
    }
  },
  created(){
this.lol();    
  }
};
</script>

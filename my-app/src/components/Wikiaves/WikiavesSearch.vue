<template>
  <div class="container">
        <SearchSourcesDescription :description="description"/>

    <h2>Procurar no Wikiaves</h2>
    <p>Buscar por nome científico ou comum. Tente:</p>
    <ul>
      <li>quero-quero</li>
      <li>papagaio</li>
      <li>Inezia caudata</li>
      <li>Ortalis canicollis</li>
    </ul>
    <div class="row">
      <div class="col-md-7 mrgnbtm">
        <form>
          <div class="row">
            <div class="form-group col-md-9">
              <input
                type="text"
                class="form-control"
                v-model="wikiavesSearchTerm"
                name="wikiavesSearchTerm"
                id="wikiavesSearchTerm"
                aria-describedby="emailHelp"
                placeholder="buscar no Wikiaves"
              />
              <input v-show="false" />
            </div>
          </div>
          <button
            type="button"
            @click="wikiavesSearch()"
            class="btn btn-danger"
          >
            <span v-show="!loading">Pesquisar</span>
            <b-spinner
              v-show="loading"
              small
              variant="primary"
              label="Spinning"
            ></b-spinner>
            <span v-show="loading">Aguarde, carregando</span>
          </button>
        </form>
      </div>
      <div v-if="hasSearched || wikiavesSearchTermResult.length != 0">
        <WikiavesSearchTermDisambiguation
          :wikiavesSearchTermResult="wikiavesSearchTermResult"
        />
      </div>

      <div v-if="hasSearched && wikiavesSearchTermResult.length === 0">
        <div class="card border-primary mb-3 mt-3">
          <div class="card-body text-primary">
            Nenhum resultado encontrado para a busca
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { wikiavesSearch } from "./WikiavesService";
import { BSpinner } from "bootstrap-vue";
import SearchSourcesDescription from '../SearchSourcesDescription.vue'

import WikiavesSearchTermDisambiguation from "./WikiavesSearchTermDisambiguation.vue";

export default {
  name: "WikiavesSearch",
  components: {
    WikiavesSearchTermDisambiguation,SearchSourcesDescription,
    BSpinner,
  },
  data() {
    return {
      description: "O <a href=\"https://www.wikiaves.com.br/\">WikiAves</a> é um site de conteúdo interativo, direcionado à comunidade brasileira de observadores de aves, com o objetivo de apoiar, divulgar e promover a atividade de observação de aves e a ciência cidadã, fornecendo gratuitamente ferramentas avançadas para controle de registros fotográficos e sonoros, textos, identificação de espécies, comunicação entre observadores, entre outras.\nJuntos construímos continuamente a maior base de dados sobre aves do Brasil na Internet.",
      wikiavesSearchTerm: "",
      wikiavesSearchTermResult: [],
      animalData: {},
      hasSearched: false,
      loading: false,
    };
  },
  methods: {
    wikiavesSearch() {
      this.loading = true;
      console.log(this.wikiavesSearchTerm);
      const payload = {
        wikiavesSearchTerm: this.wikiavesSearchTerm,
      };
      wikiavesSearch(payload).then((value) => {
        console.log(value);
        this.wikiavesSearchTermResult = value;
        this.hasSearched = true;
        this.loading = false;
      });
    },
  },
};
</script>
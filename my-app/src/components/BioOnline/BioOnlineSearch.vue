<template>
  <div class="container">
    <SearchSourcesDescription :description="description"/>
          <b-tabs  v-model="selectedTab" @change="update" content-class="mt-4">
          <b-form-group label="Elementos devolvidos:" v-slot="{ ariaDescribedby }">
            <b-tab title="Simples" active>
              <b-form-checkbox-group
                v-model="selectedArray"
                :options="completeOptions['Básico']"
                :aria-describedby="ariaDescribedby"
                :checked="selectedArray"></b-form-checkbox-group>
              </b-tab>

            <b-tab title="Completo">
              <b-card v-for="category in Object.keys(allSelected)" :key="category.id">
                <b-form-checkbox
                size="lg"
                v-model="allSelected[category]"
                @change="toggleAll(allSelected[category],category)"
                >{{ category }}</b-form-checkbox>
            <b-form-checkbox-group
                v-model="selectedArray"
                :options="completeOptions[category]"
                :aria-describedby="ariaDescribedby"
                :checked="selectedArray"></b-form-checkbox-group>
              </b-card>
            </b-tab>
          </b-form-group>
          </b-tabs>
            <b-tabs  content-class="mt-4">
                <b-tab title="Busca espécie" active><BioOnlineSpeciesSearch   :selectedArray="selectedArray"/></b-tab>
                <b-tab title="Busca local"><BioOnlineLocalitySearch  :selectedArray="selectedArray"/></b-tab>
            </b-tabs>
        </div>
</template>

<script>


import BioOnlineSpeciesSearch from './BioOnlineSpeciesSearch.vue'
import BioOnlineLocalitySearch from './BioOnlineLocalitySearch.vue'
import SearchSourcesDescription from '../SearchSourcesDescription.vue'
import { getBioOnlineColumns } from './BioOnlineService'
import { BTabs } from 'bootstrap-vue'
import { BTab } from 'bootstrap-vue'
import { BFormCheckboxGroup, BFormCheckbox, BFormGroup, BCard } from 'bootstrap-vue'


export default {
  name: 'SearchAnimal',
  components:{
      BioOnlineSpeciesSearch, BioOnlineLocalitySearch, SearchSourcesDescription,
       BTabs, BTab, BFormCheckboxGroup,BFormCheckbox, BFormGroup, BCard
  },
  data(){
    return{
      description: "A <a href=\"https://www.prefeitura.sp.gov.br/cidade/secretarias/meio_ambiente/\">Secretaria Municipal do Verde e do Meio Ambiente</a>, com o objetivo de subsidiar e dar diretrizes às ações ambientais no âmbito do município de São Paulo desenvolve projetos de levantamento da biodiversidade em diversas áreas do seu território. O conhecimento sobre a flora e a fauna silvestres é o ponto de partida para definir áreas prioritárias para a conservação e a elaboração dos planos de manejos das áreas verdes, bem como para dar subsídio às tomadas de decisão relativas ao manejo da fauna silvestre, às análises de estudos e relatórios de impacto ambiental (EIA/RIMA), aos programas e ações de educação ambiental.",
      selectedTab: null,
      selectedArray: ['Nome Científico', 'Nome Comum'],
        completeOptions: [],
        allSelected:{
          "Básico": false,
          "Taxonomia": false,
          "Biologia": false,
          "Categorias de Ameaça": false,
          "Observações registradas": false,
        }
    }
  },
  methods:{
    feedCompleteOptions(){
       getBioOnlineColumns().then(
                (value) => {
                      this.completeOptions = value;
                    })
    },
    update(){
      console.log("updating: " + this.selectedTab);
    },
    toggleAll(checked, category ){
      this.selectedArray = this.selectedArray.filter(n => !this.completeOptions[category].includes(n))
      if(!checked){
        for(var i = 0; i < this.completeOptions[category].length; i++){
          this.selectedArray.push(this.completeOptions[category][i]);
        }
      }
    }
  },
  created(){
    this.feedCompleteOptions();
  }
}
</script>
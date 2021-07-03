<template>
  <div class="container">
    <SearchSourcesDescription :description="description"/>
          <b-tabs  v-model="selectedTab" @change="update" content-class="mt-4">
          <b-form-group label="Elementos devolvidos:" v-slot="{ ariaDescribedby }">
            <b-tab title="Simples" active>
              <b-form-checkbox-group
                id="checkbox-group-1"
                v-model="selectedArray[0]"
                :options="simpleOptions"
                :aria-describedby="ariaDescribedby"
                :checked="selectedArray[0]"></b-form-checkbox-group>
              </b-tab>
            <b-tab title="Classe" >
              <b-form-checkbox-group
                id="checkbox-group-1"
                v-model="selectedArray[1]"
                :options="classOptions"
                :aria-describedby="ariaDescribedby"
                :checked="selectedArray[1]"></b-form-checkbox-group>
              </b-tab>
            <b-tab title="Completo">
            <b-form-checkbox-group
                id="checkbox-group-1"
                v-model="selectedArray[2]"
                :options="completeOptions"
                :aria-describedby="ariaDescribedby"
                :checked="selectedArray[2]"></b-form-checkbox-group>
            </b-tab>
          </b-form-group>
          </b-tabs>

            <b-tabs  content-class="mt-4">
                <b-tab title="Busca espécie" active><BioOnlineSpeciesSearch  :selectedTab="selectedTab" :selected="selectedArray[selectedTab]"/></b-tab>
                <b-tab title="Busca local"><BioOnlineLocalitySearch  :selectedTab="selectedTab" :selected="selectedArray[selectedTab]"/></b-tab>
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
import { BFormCheckboxGroup, BFormGroup } from 'bootstrap-vue'


export default {
  name: 'SearchAnimal',
  components:{
      BioOnlineSpeciesSearch, BioOnlineLocalitySearch, SearchSourcesDescription,
       BTabs, BTab, BFormCheckboxGroup, BFormGroup
  },
  data(){
    return{
      description: "A <a href=\"https://www.prefeitura.sp.gov.br/cidade/secretarias/meio_ambiente/\">Secretaria Municipal do Verde e do Meio Ambiente</a>, com o objetivo de subsidiar e dar diretrizes às ações ambientais no âmbito do município de São Paulo desenvolve projetos de levantamento da biodiversidade em diversas áreas do seu território. O conhecimento sobre a flora e a fauna silvestres é o ponto de partida para definir áreas prioritárias para a conservação e a elaboração dos planos de manejos das áreas verdes, bem como para dar subsídio às tomadas de decisão relativas ao manejo da fauna silvestre, às análises de estudos e relatórios de impacto ambiental (EIA/RIMA), aos programas e ações de educação ambiental.",
      selectedTab: null,
      selectedArray: [
        ['scientificName', 'scientificName', 'IUCN/2021', 'CITES/2021'],
        ['taxonomy', 'biology/ecology', 'concern', 'observations'],
        []
      ],
        simpleOptions: [
          { text: 'Nome científico', value: 'scientificName' },
          { text: 'Nome comum', value: 'scientificName' },
          { text: 'IUCN/2021', value: 'IUCN/2021' },
          { text: 'CITES/2021', value: 'CITES/2021' }
        ],
        classOptions: [
          { text: 'Taxonomia', value: 'taxonomy' },
          { text: 'Biologia/Ecologia', value: 'biology/ecology' },
          { text: 'Categorias de Ameaça', value: 'concern' },
          { text: 'Observações', value: 'observations' }
        ],
        completeOptions: []
    }
  },
  methods:{
    feedCompleteOptions(){
       getBioOnlineColumns().then(
                (value) => {
                    for(const item of value){
                      this.completeOptions.push(
                        {text: item, value: item}
                      )
                    }
                })
    },
    update(){
      console.log("updating: " + this.selectedTab);
    }
  },
  created(){
    this.feedCompleteOptions();
  }
}
</script>
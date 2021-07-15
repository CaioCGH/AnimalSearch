<template>
  <div class="container">
          <b-tabs  v-model="selectedTab"  content-class="mt-4">
          <b-form-group label="Elementos devolvidos:" v-slot="{ ariaDescribedby }">
            <b-spinner
          v-show="loadingColumns"
          small
          variant="primary"
          label="Spinning"
        ></b-spinner>
            <b-tab title="Básico" active>
              <b-form-checkbox-group
                v-model="selectedArray"
                :options="completeOptions['Básico']"
                :aria-describedby="ariaDescribedby"
                :checked="selectedArray"
                ></b-form-checkbox-group>
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
          
        </div>
</template>

<script>

import { getBioOnlineColumns } from './BioOnlineService'


export default {
  components:{
  },
  data(){
    return{
      selectedTab: null,
      loadingColumns: true,
      
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
    toggleAll(checked, category ){
      this.$store.state.selectedArray = this.$store.state.selectedArray.filter(n => !this.completeOptions[category].includes(n))
      if(!checked){
        for(var i = 0; i < this.completeOptions[category].length; i++){
          this.$store.state.selectedArray.push(this.completeOptions[category][i]);
        }
      }
    }
  },
  created(){
    this.feedCompleteOptions();
    this.loadingColumns = false;
  },
  computed:{
    selectedArray:{
      get () {
      return this.$store.state.selectedArray;
    },
    set (value) {
      this.$store.commit('updateSelectedArray', value)
    }

    }
  }
}
</script>
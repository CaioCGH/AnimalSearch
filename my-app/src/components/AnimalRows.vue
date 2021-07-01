<template>
    <div class="container">
        <h2 v-if="animalRows.length === 1"> {{ animalRows.length }} resultado</h2>
        <h2 v-else >{{ animalRows.length }} resultados</h2>
        <div v-for="animalRow in animalRows" :key="animalRow.id"> 
            <div class="card border-primary mb-3" >
                <div class="card-body text-primary">
                    <tr v-for="(value, key) in animalRow" :key="key">
                            <td v-if="shouldDisplay(key)">{{ key }}</td>
                            <td v-if="shouldDisplay(key) && key != 'Observações registradas'">{{ value }}</td>
                            <div v-if="shouldDisplay(key) && key === 'Observações registradas'">
                                <tr  class="card border-primary mb-3" v-for="(value2, key2) in value" :key="key2.id">
                                    <td >{{ key2 }}</td>
                                    <td>{{ value2 }}</td>
                                </tr>
                            </div>
                    </tr>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AnimalRows',
        props: ['animalRows', 'selected'],
        data(){
            return{
                attributeClasses: {
          "Reino":"taxonomy",
"Fi'lo":"taxonomy",
"Subfilo":"taxonomy",
"Classe":"taxonomy",
"Subclasse":"taxonomy",
"Infraclasse":"taxonomy",
"Ordem":"taxonomy",
"Subordem":"taxonomy",
"Família":"taxonomy",
"Subfamília":"taxonomy",
"Tribo/SubTribo":"taxonomy",
"Gênero":"taxonomy",
"Espécie":"taxonomy",
"Subespécie":"taxonomy",
"Autor":"taxonomy",
"Nome Comum":"taxonomy",
"Nome em Inglês":"taxonomy",
"Observações":"taxonomy",
"Natureza":"biology/ecology",
"Natureza (Revisão Invertebrados)":"biology/ecology",
"Endemismo Mata Atlântica":"biology/ecology",
"Endemismo Brasil":"biology/ecology",
"Habitat (Aves: Stotz, ver legenda)":"biology/ecology",
"Sensibilidade  (Aves: Stotz)":"biology/ecology",
"Ocorrência no bioma (AVES - MOREIRA-LIMA, 2013)":"biology/ecology",
"Permanência Federal (CBRO - Aves)":"biology/ecology",
"Aves Migratórias (SOMENZARI et al. 2018)":"biology/ecology",
"Abundância relativa (Anfíbios, Aves)":"biology/ecology",
"Alimentação":"biology/ecology",
"Guilda Alimentar":"biology/ecology",
"Habitat":"biology/ecology",
"Locomoção":"biology/ecology","Decreto Estadual 60.133/2014":"concern",
"Decreto Estadual 63.853/2018":"concern",
"MMA/2014":"concern",
"MMA/2018":"concern",
"IUCN/2014":"concern",
"IUCN/2019.1e2":"concern",
"IUCN/2020":"concern",
"IUCN/2020 (versão 2020-3) ":"concern",
"IUCN/2021 (versão 2021-1) ":"concern",
"CITES/2014":"concern",
"CITES/2019":"concern",
"CITES/2021 ":"concern",
"Observações registradas":"observations"
      }
            }
        },
        methods:{
            shouldDisplay(key){
                return this.$props.selected.includes(this.attributeClasses[key]);
            }
        }
    }
</script>
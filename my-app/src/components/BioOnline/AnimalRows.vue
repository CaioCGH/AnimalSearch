<template>
    <div class="container">
        <h2 v-if="animalRows.length === 1"> {{ animalRows.length }} resultado</h2>
        <h2 v-else >{{ animalRows.length }} resultados</h2>
        <div v-for="animalRow in animalRows" :key="animalRow.id">
            <BioOnlineAnimalCard :animalInfo="animalRow" :selectedArray="selectedArray"
            :key="Date.now() /*key para forçar o componente a recarregar*/"/>
        </div>
    </div>
</template>

<script>
import BioOnlineAnimalCard from './BioOnlineAnimalCard.vue'

    export default {
        name: 'AnimalRows',
        props: ['animalRows', 'selectedArray'],
        components:{
            BioOnlineAnimalCard
        },
        data(){
            return{
            }
        },
        methods:{
            shouldDisplay(key){
                return this.$props.selectedArray.includes(key);
            }
        }
    }
</script>
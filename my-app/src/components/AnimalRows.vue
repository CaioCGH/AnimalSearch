<template>
    <div class="container">
        <h2 v-if="animalRows.length === 1"> {{ animalRows.length }} resultado</h2>
        <h2 v-else >{{ animalRows.length }} resultados</h2>
        <div v-for="animalRow in animalRows" :key="animalRow.id"> 
            <div class="card border-primary mb-3" >
                <div class="card-body text-primary">
                    <tr v-for="(value, key) in animalRow" :key="key">
                        <td>{{ key }}</td>
                        <td v-if="key != 'Observações registradas'">{{ value }}</td>
                        <div v-if="key === 'Observações registradas'">
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
console.log("hahahahaa")
    export default {
        name: 'AnimalRows',
        props: ['animalRows']
     }
</script>
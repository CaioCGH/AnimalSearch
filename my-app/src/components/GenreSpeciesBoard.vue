<template>
  <div class="hello">
    <div class="row mrgnbtm">
        <Species :speciesList="species" />
    </div>
  </div>
</template>

<script>
import Species from './Species.vue'
import { getGenreSpecies } from '../services/UserService'

export default {
  name: 'GenreSpeciesBoard',
  components: {
    Species
  },
  data() {
      return {
          species: [],
          response: {},
          numberOfSpecies: 5
      }
  },
  methods: {
    getGenreSpecies() {
      getGenreSpecies().then(response => {
        console.log(response)
        this.species = response.data.values
        this.response = response
        this.numberOfSpecies = this.species.length
      })
    }
  },
  mounted () {
    this.getGenreSpecies();
  }
}
</script>
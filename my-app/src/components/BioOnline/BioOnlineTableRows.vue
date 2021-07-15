<template>
<div v-if="displayType === 'display_table' && animalRows.length > 0">
    <div>
    <b-table striped hover :items="animalRows" :fields="selectedArray"></b-table>
  </div>
  </div>
</template>
<script>

export default {
    data() {
        return {}
    },
    computed:{
      displayType: {
        get(){
          return this.$store.state.displayType;
        }
      },
      animalRows: {
        get(){
          return this.$store.state.animalRows;
        }
      },
      selectedArray: {
        get(){
          return this.$store.state.selectedArray;
        }
      }
    }
}
</script>
<template>
<div>
    <div>
    <b-table striped hover :items="animalRows" :fields="selectedArray"></b-table>
  </div>
  </div>
</template>
<script>

export default {
      props: ["selectedArray", "animalRows"],

    data() {
        return {}
    },
}
</script>

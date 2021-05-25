<template>
    <div class="container">
        <h2>Species</h2>
        <table class="table table-bordered">
            <tbody>
              <tr v-for="item in speciesList" :key="item.id">
                  <td>{{ item[0] }}</td>
                  <td>{{ item[1] }}</td>
              </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    export default {
        name: 'speciesList',
        props: ['speciesList']
     }
</script>
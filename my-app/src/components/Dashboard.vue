<template>
  <div class="hello">
    <Header />
    <div class="container mrgnbtm">
          <div class="row">
            <div class="col-md-8">
                <SearchAnimal @searchAnimal="animalSearch($event)" />
            </div>
          </div>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue'
import SearchAnimal from './SearchAnimal.vue'
import { getAllUsers, searchAnimal } from '../services/UserService'

export default {
  name: 'Dashboard',
  components: {
    Header,
    SearchAnimal
  },
  data() {
      return {
          users: [],
          numberOfUsers: 0
      }
  },
  methods: {
    getAllUsers() {
      getAllUsers().then(response => {
        console.log(response)
        this.users = response
        this.numberOfUsers = this.users.length
      })
    },
    animalSearch(data) {
      console.log("animalSearch()")
      console.log(data);
      searchAnimal(data).then(response => {
        console.log(response);
        this.getAllUsers();
      });
    },
  }
}
</script>
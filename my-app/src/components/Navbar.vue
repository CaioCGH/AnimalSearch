<template>
  <div>
    <b-navbar toggleable="sm" type="light" variant="light">

      <b-navbar-brand><router-link to="/">FaunaSP</router-link></b-navbar-brand>
        <b-navbar-nav>
          <!-- <b-nav-text><router-link to="/map">Mapa</router-link></b-nav-text> -->
          <b-nav-text><router-link to="/about">Sobre</router-link></b-nav-text>
        </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>

export default {
  components: {
  },
};
</script>
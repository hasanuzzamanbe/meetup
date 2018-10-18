<template>
  <v-footer
  v-if="!loading"
    class="deep-orange darken-3"
    id="fot"
    dark
    height="auto"
  >
    <v-card
      class="flex deep-orange darken-3"
      flat
      tile
    >
      <v-card-actions class="grey darken-3 justify-center">
        &copy;2018 — <strong>From authLab by-Hasanuzzaman</strong>
      </v-card-actions>
    </v-card>
  </v-footer>
</template>
<script>
  export default {
    computed: {     
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>
<style type="text/css" scoped>
  footer#fot {
      margin-top: 400px;
      margin-bottom: -62px;
  }
</style>

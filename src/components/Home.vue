<template>
 <v-container>
 	<v-layout row wrap  class= "mb-2">
 		<v-flex xs12 sm6 class= "text-xs-center">
 		  <v-btn dark router to= "/meetups" class= "deep-orange darken-3">Explore Meetups</v-btn>
 		</v-flex>
 		<v-flex xs12 sm6 class= "text-xs-center">
 		  <v-btn dark router to= "/meetup/new" class= "deep-orange darken-3">Organize Meetup</v-btn>
 		</v-flex>
 	</v-layout>
  <v-layout row wrap>
    <v-flex xs12 class="text-xs-center">
    <v-progress-circular
      indeterminate
      color="green"
      class="primary-text"
      :width="7"
      size="70"
      v-if="loading"
    ></v-progress-circular>
    </v-flex>
  </v-layout>
 	<v-layout row wrap class= "mt-2" v-if="!loading">
 	  <v-carousel>
 	  	<v-carousel-item
   	  	v-for= "(meetup, i) in meetups"
   	  	v-bind:src= "meetup.imageUrl"
   	  	:key= "meetup.id"
   	  	@click= "onLoadMeetup (meetup.id)"
   	  	>
   	  	<div class= "title">
   	  	 	{{meetup.title}}
   	  	</div>
 	  	</v-carousel-item>
 	  </v-carousel>
 	</v-layout>
 	<v-layout row wrap class= "mt-2">
 		<v-flex xs12 sm6 class= "text-xs-center">
 		  <p>Join for awesome meetups</p>
 		</v-flex>
 	</v-layout>
 </v-container>
</template>

<script >
export default {
  computed: {
    meetups () {
      return this.$store.getters.featuredMeetups
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onLoadMeetup (id) {
      this.$router.push('/meetups/' + id)
    }
  }
}
</script>

<style type="text/css" scoped>
	.title {
		position:absolute;
		bottom:50px;
	}
</style>
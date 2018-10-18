<template>
<v-container>
  <v-layout row wrap v-for= "meetup in meetups" :key= "meetup.id">
    <v-flex xs12>
      <v-card class= "info" >
      	<v-container fluid>
      		<v-layout row>
      		  <v-flex xs5 sm4 md3>
      		    <v-card-media
      		      contain
      		      height= "130px"
      		      :src= "meetup.imageUrl"
      		    >      		    
      		    </v-card-media>
      		  </v-flex>
      		  <v-flex xs7 sm8 md9>
      		   <v-card-title primary-title>
      		     <div>
      		     	<h5 class= "white--text mb-0">{{meetup.title}}</h5>
      		     	<div>{{meetup.date | date}} </div>
      		     </div>
      		   </v-card-title>
      		   <v-card-actions>
      		   	  <v-icon light>arrow_forward</v-icon>
      		     <v-btn flat :to= "'/meetups/'+ meetup.id">View Meetup</v-btn>
      		   </v-card-actions>
      		  </v-flex>
      		</v-layout>     	  
      	</v-container>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>
<script type="text/javascript">
  export default {
    computed: {
      meetups () {
        return this.$store.getters.loadedMeetups
      }
    }
  }
</script>

<style scoped>
  .container.fluid {
    margin-bottom: 7px;
}
</style>
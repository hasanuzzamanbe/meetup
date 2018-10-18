<template>
	<v-container>
       <v-layout row wrap v-if="loading">
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
	  <v-layout row wrap v-else>
	    <v-flex xs12>           
	    	<v-card>
	    	  <v-card-title >	    	   
                <template v-if="userIsAuthenticated && userIsCreator ">
                  <v-spacer></v-spacer>
                    <app-edit-dialog :meetup="meetup"></app-edit-dialog>
                    <app-remove :meetup="meetup"></app-remove>
                </template>
	    	  </v-card-title>
	    	    <v-card-media
      		 contain
      		 height= "400px"
      		 :src= "meetup.imageUrl"	
      		 >
      	     </v-card-media>
                 <v-card-title primary-title>
                   <h2 class= "primary--text">{{meetup.title}}</h2>                  
                 </v-card-title>
                 <v-layout row wrap>
                   <v-flex xs12>
                     <v-divider inset ></v-divider>
                   </v-flex>
                 </v-layout>
		    <v-card-text>
		      <div class= "d">{{meetup.date | date}}- {{meetup.location}}</div>
		      <div class= "p">{{meetup.description}}</div>
		    </v-card-text>
	    	</v-card>
	    </v-flex>
	  </v-layout>
	</v-container>
</template>
<script >
      export default {
        props: ['id'],
        computed: {
          meetup () {
            return this.$store.getters.loadedMeetup(this.id)
          },
          userIsAuthenticated () {
            return this.$store.getters.user !== null && this.$store.getters.user !== undefined
          },
          userIsCreator () {
            if (!this.userIsAuthenticated) {
              return false
            }
            return this.$store.getters.user.id === this.meetup.creatorId
          },
          loading () {
             return this.$store.getters.loading
          }
        }
      }
</script>
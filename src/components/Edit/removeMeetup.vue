<template>
  <v-dialog width="350px" persistent v-model="removeDialog">
	<v-btn fab accent slot="activator">
	  <v-icon>delete</v-icon>
	</v-btn>
	<v-card>
	  <v-container class="red darken-4">
	    <v-layout row wrap>
	      <v-flex xs12>
	        <v-card-title dark>
	          Remove Meetup ?          
	        </v-card-title>	          
	      </v-flex>	        
	    </v-layout>
	    <v-layout row wrap>
	      <v-flex xs12>
	        <v-card-text>
	         <p>If you remove this, It can't be undone again.</p>
	        </v-card-text>        
	      </v-flex>        
	    </v-layout>
	    <v-divider></v-divider>
	    <v-layout row wrap>
	      <v-flex xs12>
	       <v-card-actions>
	          <v-btn flat class="blue--text darken-1" @click="removeDialog = false">close</v-btn>
	          <v-btn flat class="blue--text darken-1" @click="remove">Are You Sure</v-btn>
	        </v-card-actions>        
	      </v-flex>      
	    </v-layout>
	  </v-container>	    
	</v-card>	  
  </v-dialog>
</template>
<script>
  export default {
  	props: ['meetup'],
  	data () {
  		return {
  			removeDialog: false, 			
  		}
  	},
  	methods: {		
      remove () {
      	 this.$router.push('/meetups')
         this.$store.dispatch('removeMeetUpData', {
           id: this.meetup.id
         })
       return this.removeDialog = false

      }                      
        
    }
  	
  }
</script>
<template>
<v-container>
	<v-layout row v-if="error">
	  <v-flex xs12 sm6 offset-sm3>
	    <alert-cmp @dismissed="onDismissed" :text="error.message"></alert-cmp>
	  </v-flex>
	</v-layout>
  <v-layout row>
  	<v-flex xs12 sm6 offset-sm3>
  	  <v-card>
  	    <v-card-text>
  	      <v-container>
  	        <form @submit.prevent="onSignIn">
	         <v-layout row>
	        	<v-flex xs12>
	        	    <v-text-field
	        	      name="email"
	        	      label="Mail"
	        	      v-model="email"
	        	      id="id"
	        	    ></v-text-field>
	        	  </v-flex>  
	         </v-layout>
	          <v-layout row>
	        	<v-flex xs12>
	        	    <v-text-field
	        	      type="password"
	        	      name="password"
	        	      label="Password"
	        	      v-model="password"
	        	    ></v-text-field>
	        	  </v-flex>  
	         </v-layout>	         
	         <v-layout row wrap mb-2>
	           <v-flex xs12>
	             <v-btn color="success" type="submit">Sign In</v-btn>
	           </v-flex>
	          </v-layout>
	          <v-layout row wrap>
	            <v-flex xs7>
	           	 <p class="text-md-right">Didn't register yet?</p>
	           	</v-flex>
	           	<v-flex xs5>
	           	<a @click="redirectSignup">Sign up</a>
	           	</v-flex>	            	           
	          </v-layout>	           	         
  	        </form>
  	      </v-container>
  	    </v-card-text>
  	  </v-card>
  	</v-flex>   
  </v-layout>
</v-container>
</template>
<script>
  export default{
    data () {
      return {
        email: '',
        password: ''
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      error () {
        return this.$store.getters.error
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined)
      	  this.$router.push('/')
      }
    },
    methods: {
      onSignIn () {
        this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
      },
      onDismissed () {
      	this.$store.dispatch('clearError')
      },
      redirectSignup () {
      	this.$router.push('/signup')
      }
    }
}
</script>
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
  	        <form @submit.prevent="onSignUp">
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
	          <v-layout row>
	        	<v-flex xs12>
	        	    <v-text-field
	        	      type="password"
	        	      name="confirmPassword"
	        	      label="Confirm Password"
	        	      v-model="confirmPassword"
	        	      :rules="[comparePassword]"
	        	    ></v-text-field>
	        	  </v-flex>  
	         </v-layout>
	         <v-layout row wrap>
	           <v-flex xs12>
	             <v-btn color="success" type="submit">Sign up</v-btn>
	           </v-flex>
	         </v-layout>
	          <v-layout row wrap>
	            <v-flex xs7>
	           	 <p class="text-md-right">Already registered? </p>
	           	</v-flex>
	           	<v-flex xs5>
	           	<a @click="redirectSignIn">Sign In</a>
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
        password: '',
        confirmPassword: ''
      }
    },
    computed: {
      comparePassword () {
        return this.password !== this.confirmPassword ? 'Password Do not match' : ''
      },
      user () {
        return this.$store.getters.user
      },
      error () {
        return this.$store.getters.error
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/')
        }
      }
    },
    methods: {
      onSignUp () {
        this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      },
       redirectSignIn () {
      	this.$router.push('/signin')
      }
    }
}
</script>
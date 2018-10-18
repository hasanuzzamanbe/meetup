<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <p>Hello ! {{Username}} You can Edit Your User Name from Here.</p>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12>
                <form @submit.prevent="updateUserProfile">
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-card-text>
                                <v-text-field
                                        v-if="inputName"
                                        name="Username"
                                        label="Edit User name"
                                        id="Username"
                                        v-model="Username"
                                        required
                                ></v-text-field>
                            </v-card-text>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-card-actions>
                                        <v-btn flat class="blue--text darken-1" @click="editUserName">Edit User Name
                                        </v-btn>
                                        <v-btn flat class="blue--text darken-1" @click.prevent="updateUserProfile">
                                            Update Name
                                        </v-btn>
                                    </v-card-actions>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import * as firebase from 'firebase'

    export default {
        data () {
            return {
                Username: '',
                profile: '',
                inputName: false

            }
        },
        methods: {
            updateUserProfile (name, payload) {
                this.$store.dispatch('userProfileData', name)
                this.inputName = false
            },
            editUserName (Username) {
                var user = firebase.auth().currentUser
                this.Username = user.providerData[0].displayName
                // this.profile = user.providerData[0]
                this.inputName = true
            }
        }
    }
</script>

<template>
    <v-app>
        <v-toolbar dark class="deep-orange darken-3">
            <v-toolbar-side-icon @click.stop="sideNav=!sideNav"></v-toolbar-side-icon>
            <v-toolbar-title>
                <router-link to="/" tag="span" style="cursor:pointer;"> Meetups</router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-xs-only">
                <v-btn flat v-for="item in menuItems"
                       router
                       :to="item.link"
                       :key="item.title"
                >
                    <v-icon>{{item.icon}}</v-icon>
                    {{item.title}}
                </v-btn>
                <v-btn flat v-if="userIsAuthenticated" @click="onLogout">
                    <v-icon>exit_to_app</v-icon>
                    Log out
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-navigation-drawer id="check" v-model="sideNav">
            <v-list>
                <v-list-tile v-for="item in menuItems"
                             :key="item.title"
                             router
                             :to="item.link">
                    <v-list-tile-action>
                        <v-icon>{{item.icon}}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>{{item.title}}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile v-if="userIsAuthenticated">
                    <v-list-tile-action>
                        <v-icon>exit_to_app</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content @click="onLogout">Log out</v-list-tile-content>
                </v-list-tile>

            </v-list>
        </v-navigation-drawer>
        <main>
            <router-view></router-view>
        </main>
        <app-footer></app-footer>
    </v-app>
</template>
<script>
import * as firebase from 'firebase'
export default {
    data () {
        return {
            sideNav: false,
            profile: 'Profile'
        }
    },
    computed: {
        menuItems () {
            let menuItems = [
                {icon: 'face', title: 'Sign in', link: '/signin'},
                {icon: 'lock_open', title: 'Sign up', link: '/signup'}
            ]
            if (this.userIsAuthenticated) {
                menuItems = [
                    {icon: 'supervisor_account', title: 'View Meetups', link: '/meetups'},
                    {icon: 'room', title: 'Organize Meetup', link: '/meetup/new'},
                    {icon: 'person', title: this.username, link: '/profile'}
                ]
            }
            return menuItems
        },
        userIsAuthenticated () {
            return this.$store.getters.user !== null && this.$store.getters.user !== undefined
        },
        username () {
            return this.$store.getters.user.displayName
        }
    },
    methods: {
        onLogout () {
            this.$store.dispatch('logout')
        },
        UserName () {
            if (this.$store.getters.user !== null && this.$store.getters.user !== undefined) {
                var user = firebase.auth().currentUser
                this.profile = user.providerData[0].displayName
                return this.profile
            }
        }
    },
    created: function () {
        this.UserName()
    },
    updated: function () {
        this.$nextTick(function () {
            this.UserName()
        })
    },
    name: 'App'
}
</script>
<style type="text/css" scoped>
    #check {
        position: absolute;
        margin-top: 63px !important;
    }
</style>

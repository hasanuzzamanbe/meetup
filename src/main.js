// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'
import DateFilter from './filter/date'
import * as firebase from 'firebase'
import AlertCmp from './components/Shared/Alert.vue'
import AppEdit from './components/Edit/EditMeetUpDetail.vue'
import AppRemove from './components/Edit/removeMeetup.vue'
import AppFooter from './components/footer.vue'

Vue.use(Vuetify, { theme: {
  primary: '#ee44aa',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})

Vue.component('app-remove', AppRemove)
Vue.component('app-footer', AppFooter)
Vue.component('app-edit-dialog', AppEdit)
Vue.component('alert-cmp',AlertCmp)
Vue.filter('date', DateFilter)
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyAI2x2c-87-DaSz7YK1Yxa5QqClAJfOyys',
      authDomain: 'authlab-6bfa9.firebaseapp.com',
      databaseURL: 'https://authlab-6bfa9.firebaseio.com',
      projectId: 'authlab-6bfa9',
      storageBucket: 'gs://authlab-6bfa9.appspot.com',
      messagingSenderId: '275080779337'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadMeetups')
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {imageUrl: '', title: '', id: '', date: new Date(), location: ''},
      {imageUrl: '', title: '', id: '', date: new Date(), location: ''}
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setLoadedMeetups (state,payload) {
      state.loadedMeetups = payload
    },
    updateMeetup (state, payload) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id
      })
      if (payload.title) {
        meetup.title = payload.title
      }
      if (payload.description) {
        meetup.description = payload.description
      }
       if (payload.date) {
        meetup.date = payload.date
      }
    },
    removeMeetup (state, payload) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id
      })
      let index = this.state.loadedMeetups.indexOf(meetup)
      var p = state.loadedMeetups.splice(index,1)
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    loadMeetups ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
      .then((data) => {
        const meetups = []
        const obj = data.val()
        for (let key in obj) {
          meetups.push({
            id: key,
            title: obj[key].title,
            description: obj[key].description,
            location: obj[key].location,
            imageUrl: obj[key].imageUrl,
            date: obj[key].date,
            creatorId: obj[key].creatorId
          })
        }
        commit('setLoading', false)
        commit('setLoadedMeetups',meetups)
      })
      .catch(
        (error) => {
          commit('setLoading', true)
        })
    },
    createMeetup ({commit, getters}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      let imageUrl
      let key
      firebase.database().ref('meetups').push(meetup)
      .then((data) => {
        key = data.key
        return key
      })
      .then(key => {
        const filename = payload.image.name
        const ext = filename.slice(filename.lastIndexOf('.'))
        return firebase.storage().ref('meetups/' + key + ext).put(payload.image)
      })
      .then(filedata => {
        let imagePath = filedata.metadata.fullPath;
        // creating ref to our image file and get the url
        return firebase.storage().ref().child(imagePath).getDownloadURL();
      })
      .then(url => {
        imageUrl = url;
        return firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl});
      })
      .then(() => {
        commit('createMeetup', {
          ...meetup,
          imageUrl: imageUrl,
          id: key
        })
    })
   },
    updateMeetUpData ({commit}, payload) {
       commit('setLoading', true)
       const updateObj = {}
       if (payload.title) {
        updateObj.title = payload.title
       }
        if (payload.description) {
        updateObj.description = payload.description
       }
        if (payload.date) {
        updateObj.date = payload.date
       }
       firebase.database().ref('meetups').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateMeetup', payload)
         })
    },
    removeMeetUpData ({commit}, payload) {
         let idImage = 'meetups' + '/' + payload.id + '.' + 'jpg'
         console.log(idImage)
         let storageRef = firebase.storage().ref(idImage);
         storageRef.delete()
         .then(() => {
          console.log('success')
         })

         commit('setLoading', true)
         let id = 'meetups' + '/' + payload.id
         let firebaseRef = firebase.database().ref(id);

         firebaseRef.remove()
         .then(() => {
          commit('setLoading', false)
         })

         commit('removeMeetup', payload)
    },  
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.user.uid,
            registeredMeetups: []
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
        }
      )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.user.uid,
            registeredMeetups:[]
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error=>{
          commit('setLoading', false);
          commit('setError', error)         
        }
      )
    },
    userProfileData (name, payload) {
      var Username = payload.value;
      var user = firebase.auth().currentUser;
      user.updateProfile({
      // displayName: "Jane Q. User",
      // photoURL: "https://example.com/jane-q-user/profile.jpg"
         displayName: Username

      })
      .then(function() {
        console.log('updated')
      })
      .catch(function(error) {
        console.log(error)
      });
      console.log(name)
      console.log(payload.value)

    },

    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, registeredMeetups: []})
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
  },

  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    }
  }
})
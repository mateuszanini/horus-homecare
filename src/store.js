import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user')),
    loading: false,
    error: null,
    online: null,
    saved: null,
    newBeatDate: null,
    newBeatTime: null,
    newBeatBeats: null,
    offlineBeats: localStorage.getItem('offlineBeats')
  },

  mutations: {
    setUser(state, payload) {
      localStorage.setItem('user', JSON.stringify(payload))
      state.user = JSON.parse(localStorage.getItem('user'))
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    },
    setSaved(state, payload) {
      state.saved = payload
    },
    clearSaved(state) {
      state.saved = null
    },
    setOnline(state, payload) {
      state.online = payload
    },
    setNewBeatDate(state, payload) {
      state.newBeatDate = payload
    },
    setNewBeatTime(state, payload) {
      state.newBeatTime = payload
    },
    setNewBeatBeats(state, payload) {
      state.newBeatBeats = payload
    },
    setOfflineBeats(state, payload) {
      state.offlineBeats.push(payload)
    }
  },

  actions: {
    userIsAuthenticated({
      getters
    }) {
      return getters.user !== null && getters.user !== undefined
    },
    signUserIn({
      commit
    }) {
      commit('setLoading', true)
      commit('clearError')

      var provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithPopup(provider).then(
          result => {
            commit('setLoading', false)
            const newUser = {
              uid: result.user.uid,
              displayName: result.user.displayName,
              photoURL: result.user.photoURL,
              email: result.user.email,
              gender: result.additionalUserInfo.profile.gender,
              given_name: result.additionalUserInfo.profile.given_name
            }
            commit('setUser', newUser)
          })
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    logout({
      commit
    }) {
      commit('setLoading', true)
      firebase.auth().signOut()
      commit('setUser', null)
      commit('setLoading', false)
    },
    isOnline({
      commit
    }) {
      const status = navigator.onLine ? true : false;
      commit('setOnline', status)
      return status
    },
    saveBeats({
      getters,
      commit
    }) {
      const uid = getters.user.uid;
      const date = getters.newBeatDate;
      const time = getters.newBeatTime;
      const beats = getters.newBeatBeats;

      const newBeatKey = firebase.database().ref().child('beats/' + uid).push().key;

      if (!getters.online) {
        firebase.database().ref('beats/' + uid + '/' + newBeatKey).set({
          date: date,
          time: time,
          beats: beats
        });
      } else {
        var localBeats = localStorage.getItem("offlineBeats");
        localBeats = JSON.parse(localBeats);
        if (localBeats === null || localBeats === undefined) {
          localBeats = [];
        }

        var newBeat = {
          date: date,
          time: time,
          beats: beats
        };

        localBeats.push({
          date: date,
          time: time,
          beats: beats
        });
        localStorage.setItem("offlineBeats", JSON.stringify(localBeats));

        console.log(localStorage.getItem('offlineBeats'));
    
        // var beatsJson = [];
        // beatsJson.push({
        //   date: date,
        //   time: time,
        //   beats: beats
        // })
        // commit('setOfflineBeats', beatsJson)        
        // console.log(getters.offlineBeats);
        // console.log(JSON.stringify(beatsJson))
        // return
        // if (localStorage.getItem('offlineBeats')) {
        //   localStorage.setItem('offlineBeats', localStorage.getItem('offlineBeats') + "," + beatsJson)
        // } else {
        //   localStorage.setItem('offlineBeats', "[" + beatsJson + "]")
        // }

        // console.log(JSON.parse(localStorage.getItem('offlineBeats')))

        // localStorage.setItem('user', JSON.stringify(payload))
        // state.user = JSON.parse(localStorage.getItem('user'))
      }

      commit('setSaved', true)

      commit('setNewBeatDate', null)
      commit('setNewBeatTime', null)
      commit('setNewBeatBeats', null)

      commit('setLoading', false)
    }
  },
  getters: {
    user(state) {
      return state.user
    },
    loading(state) {
      return state.loading
    },
    error(state) {
      return state.error
    },
    online(state) {
      return state.online
    },
    saved(state) {
      return state.saved
    },
    newBeatDate(state) {
      return state.newBeatDate
    },
    newBeatTime(state) {
      return state.newBeatTime
    },
    newBeatBeats(state) {
      return state.newBeatBeats
    },
    getOfflineBeats(state) {
      return state.offlineBeats
    }
  }
})

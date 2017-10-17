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
    offlineBeats: JSON.parse(localStorage.getItem('offlineBeats'))
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
      var localBeats = localStorage.getItem("offlineBeats");
      localBeats = JSON.parse(localBeats);
      if (localBeats === null || localBeats === undefined) {
        localBeats = [];
      }
      localBeats.push(payload);
      localStorage.setItem("offlineBeats", JSON.stringify(localBeats));
      state.offlineBeats = JSON.parse(localStorage.getItem('offlineBeats'))
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

      const newBeat = {
        date: getters.newBeatDate,
        time: getters.newBeatTime,
        beats: getters.newBeatBeats
      };

      const newBeatKey = firebase.database().ref().child('beats/' + uid).push().key;

      if (!getters.online) {
        firebase.database().ref('beats/' + uid + '/' + newBeatKey).set(newBeat);
      } else {
        commit('setOfflineBeats', newBeat)
      }

      commit('setSaved', true)

      commit('setNewBeatDate', null)
      commit('setNewBeatTime', null)
      commit('setNewBeatBeats', null)

      commit('setLoading', false)
      console.log(getters.getOfflineBeats)
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

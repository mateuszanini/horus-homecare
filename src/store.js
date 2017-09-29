import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user')),
    loading: false,
    error: null
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
    // autoSignIn({
    //   commit
    // }, payload) {
    //   commit('setUser', {
    //     user
    //   })
    // },
    logout({
      commit
    }) {
      commit('setLoading', true)
      firebase.auth().signOut()
      commit('setUser', null)
      commit('setLoading', false)
    },
    clearError({
      commit
    }) {
      commit('clearError')
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
    }
  }
})

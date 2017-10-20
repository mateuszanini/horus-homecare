import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import {
  GoogleCharts
} from 'google-charts'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user')),
    loading: false,
    error: null,
    online: null,
    saved: null,
    sincronized: null,
    newBeatDate: null,
    newBeatTime: null,
    newBeatBeats: null,
    offlineBeats: JSON.parse(localStorage.getItem('offlineBeats')),
    savedBeats: JSON.parse(localStorage.getItem('savedBeats'))
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
    setSincronized(state, payload) {
      state.sincronized = payload
    },
    clearSincronized(state) {
      state.sincronized = null
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
      if (payload == null) {
        state.offlineBeats = payload
      } else {
        var localBeats = JSON.parse(localStorage.getItem("offlineBeats"));
        // localBeats = JSON.parse(localBeats);
        if (localBeats === null || localBeats === undefined) {
          localBeats = [];
        }
        localBeats.push(payload);
        localStorage.setItem("offlineBeats", JSON.stringify(localBeats));
        state.offlineBeats = JSON.parse(localStorage.getItem('offlineBeats'))
      }
    },
    setSavedBeats(state, payload) {
      localStorage.setItem("savedBeats", JSON.stringify(payload))
      state.saveBeats = JSON.parse(localStorage.getItem('savedBeats'))
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
      localStorage.setItem('offlineBeats', null)
      localStorage.setItem('savedBeats', null)
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

      if (getters.online) {
        const newBeatKey = firebase.database().ref().child('beats/' + uid).push().key;
        firebase.database().ref('beats/' + uid + '/' + newBeatKey).set(newBeat);
      } else {
        commit('setOfflineBeats', newBeat)
      }

      window.setTimeout(function () {
        commit('setSaved', true)
        commit('setLoading', false)
      }, 1000);

      commit('setNewBeatDate', null)
      commit('setNewBeatTime', null)
      commit('setNewBeatBeats', null)
    },
    sincronizaDados({
      getters,
      commit
    }) {
      var sincronizar = JSON.parse(localStorage.getItem('offlineBeats'));
      if (getters.online === true && sincronizar !== null && sincronizar !== undefined) {
        for (var i = 0; i < sincronizar.length; i++) {
          var obj = sincronizar[i];
          // console.log("Indice: " + i + "\n Beats: " + obj["beats"] + "\n Date: " + obj["date"] + "\n Time: " + obj["time"])
          const uid = getters.user.uid;
          const newBeat = {
            date: obj["date"],
            time: obj["time"],
            beats: obj["beats"]
          };
          const newBeatKey = firebase.database().ref().child('beats/' + uid).push().key;
          firebase.database().ref('beats/' + uid + '/' + newBeatKey).set(newBeat);
        }
        localStorage.removeItem('offlineBeats')
        commit('setOfflineBeats', null)
        commit('setSincronized', true)
      }
    },
    mostraDados({
      getters,
      commit
    }) {
      if (getters.online) {
        const uid = getters.user.uid;
        var ref = firebase.database().ref('beats/' + uid).limitToLast(7);
        ref.on("value", function (snapshot) {
          commit("setSavedBeats", snapshot.val())
        }, function (error) {
          console.log("Error: " + error.code);
        });
      }

      var savedBeats = JSON.parse(localStorage.getItem('savedBeats'));
      if (savedBeats !== null && savedBeats !== undefined) {
        var resultado = [];

        function percorrer(obj) {
          for (var propriedade in obj) {
            if (obj.hasOwnProperty(propriedade)) {
              if (typeof obj[propriedade] == "object") {
                percorrer(obj[propriedade]);
              } else {
                resultado.push(obj[propriedade]);
              }
            }
          }
        }
        percorrer(savedBeats);

        var dataGrafico = [
          ["Data", "Batimentos", {
            role: 'style'
          }, {
            role: 'annotation'
          }]
        ];
        for (var i = 0; i < resultado.length; i = i + 3) {
          var data = resultado[i + 1].split("-");
          var dataFormatada = data[2] + "/" + data[1] + "/" + data[0]
          var batimentos = parseInt(resultado[i]);
          dataGrafico.push([dataFormatada, batimentos, "#4db6ac", batimentos]);
        }

        GoogleCharts.load(drawChart);

        function drawChart() {
          const data = GoogleCharts.api.visualization.arrayToDataTable(dataGrafico);
          var options = {
            title: "Últimas medições de batimentos (bpm)",
            bar: {
              groupWidth: "50%"
            },
            height: 300,
            legend: {
              position: 'none'
            },
            vAxis: {
              minValue: 0,
            }
          };
          const grafico = new GoogleCharts.api.visualization.ColumnChart(document.getElementById('grafico'));
          grafico.draw(data, options);
        }
      }
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
    sincronized(state) {
      return state.sincronized
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
    },
    getSavedBeats(state) {
      return state.savedBeats
    }
  }
})

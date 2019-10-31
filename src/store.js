/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const fbAuth = 'https://identitytoolkit.googleapis.com/v1/accounts:';
const fbApiKey = 'AIzaSyACMW1XwWj2GHUug2CtiK8Rb_vu3oefTyw';

export default new Vuex.Store({
    state: {
      email: null,
      token: null,
      refresh: null
    },
    getters: {
      
    },
    mutations: {
      newUser(state, payload) {
        state.email = payload.email,
        state.token = payload.idToken,
        state.refresh = payload.refreshToken
     }
    },
    actions: {
      signup({ commit }, payload) {
        Vue.http.post(`${fbAuth}signUp?key=${fbApiKey}`, {
          ...payload,
          returnSecureToken: true
        })
          .then(response => {
            return response.json()
          })
          .then(res => {
            console.log(res)
            localStorage.setItem('auth', JSON.stringify(res))
            commit('newUser', res)
          })
          .catch(err => {
          console.log(err)
        })
      }
    }
  }) 
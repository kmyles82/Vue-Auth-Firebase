/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'
import router from './routes'

Vue.use(Vuex);

const fbAuth = 'https://identitytoolkit.googleapis.com/v1/accounts:';
const fbApiKey = 'AIzaSyACMW1XwWj2GHUug2CtiK8Rb_vu3oefTyw';
// const fbToken = 'https://securetoken.googleapis.com/v1/token?key=';

export default new Vuex.Store({
  state: {
    email: null,
    token: null,
    refresh: null,
    user: null
  },
  getters: {
    isAuth(state) {
      if (state.token) {
        return true;
      }
      return false
    },
    user(state) {
      return state.user
    }
  },
  mutations: {
    auth(state, payload) {
      state.email = payload.email,
      state.token = payload.idToken,
      state.refresh = payload.refreshToken

      router.push('/').catch(err => {})
    },
    signOut(state) {
      state.email = null
      state.token = null
      state.refresh = null

      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')

      router.push('/').catch(err => {})
    },
    userInfo(state, payload) {
      state.user = payload 
    }
  },
  actions: {
    signup({
      commit
    }, payload) {
      Vue.http.post(`${fbAuth}signUp?key=${fbApiKey}`, {
          ...payload,
          returnSecureToken: true
        })
        .then(response => {
          return response.json()
        })
        .then(res => {
          // console.log(res)
          localStorage.setItem('token', res.idToken)
          localStorage.setItem('refreshToken', res.refreshToken)
          commit('auth', res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    signin({
      commit
    }, payload) {
      Vue.http.post(`${fbAuth}signInWithPassword?key=${fbApiKey}`, {
          ...payload,
          returnSecureToken: true
        })
        .then(response => {
          return response.json()
        })
        .then(res => {
          // console.log(res)
          console.log('Signed In')
          localStorage.setItem('token', res.idToken)
          localStorage.setItem('refresh', res.refreshToken)
          commit('auth', res)
        })
        .catch(error => {
          console.log(error)
        })
    },
    refreshToken({
      commit
    }) {
      const refreshToken = localStorage.getItem('refresh');
      // console.log(refreshToken)

      if (refreshToken) {
        Vue.http.post('https://securetoken.googleapis.com/v1/token?key=AIzaSyACMW1XwWj2GHUug2CtiK8Rb_vu3oefTyw', {
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        })
          .then(response => response.json())
          .then(res => {
            commit('auth', {
              idToken: res.id_token,
              refreshToken: res.refresh_token
            })
            localStorage.setItem('token', res.id_token)
            localStorage.setItem('refresh', res.refresh_token)
          })
      }
    },
    getUserInfo({ commit }, payload) {
      Vue.http.post(`${fbAuth}lookup?key=${fbApiKey}`, {
        idToken: payload
      })
        .then(response => response.json())
        .then(res => {
          console.log(res.users[0])
          commit('userInfo', res.users[0])
        })
        .catch(err => {
          console.log(err)
      })
    }
  },
})
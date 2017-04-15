/**
 * Created by Administrator on 2017/4/11.
 */
import Vue from 'vue'
import VueCookie from "vue-cookie"

export default {

  state : JSON.parse(VueCookie.get('user')) || {},

  mutations: {
      signIn (state,user) {
          VueCookie.set('user',JSON.stringify(user),{ expires: '30m' })
          Object.assign(state,user)
      },
      logout (state) {
          VueCookie.delete('user');
          Object.keys(state).forEach((item) => { Vue.delete(state, item) });
      }
  },
  getters: {
    getUser (state){
       return state
    }
  },
  actions: {
      signIn ({commit}, user) {
          commit('signIn',user);
      },
      logout ({commit}) {
          commit('logout')
      }
  }

}

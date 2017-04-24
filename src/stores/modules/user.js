/**
 * Created by Administrator on 2017/4/11.
 * 用户登录状态处理
 *
 */
import Vue from 'vue'
import VueCookie from "vue-cookie"

export default {

  state : Object.assign({verifyCodeUrl : '/api/login/validateCode' },JSON.parse(VueCookie.get('user')) || {}),

  mutations: {
      signIn (state,user) {
          VueCookie.set('user',JSON.stringify(user),{ expires: '1h' })
          Object.assign(state,user)
      },
      logout (state) {
          VueCookie.delete('user');
          Object.keys(state).forEach((item) => {
            if(item != 'verifyCodeUrl'){
              Vue.delete(state, item)
            }
          });
      },
      //改变验证码
      changeVerify (state) {
        const url = state.verifyCodeUrl.split('?')[0];
        state.verifyCodeUrl = url+'?rnd='+Math.random();
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
          commit('changeVerify')
      },
      changeVerify ({commit}) {
          commit('changeVerify')
      }
  }

}

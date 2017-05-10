import Vue from 'vue'

/**
 * 获取权限数据列表
 * 主要用控制菜单显示和路由拦截，主要通过code来判断值是否相等
 *
 * */

export default {
  state: {
    elements: []
  },
  getters: {
    getElements (state) {
      return state.elements;
    }
  },
  mutations: {
    // setElements (state,elements) {
    //   Vue.http.get('/api/login/getAuthElements')
    //     .then(res =>{
    //     const msg = res.body;
    //     if(msg.elements){
    //       state.elements = msg.elements;
    //     }
    //   })
    // },

    setElements (state,elements) {
      return state.elements = elements;
    }

  },
  actions: {
    setElements ({commit},elements) {
      //获取权限数据
      commit('setElements',elements)

    }
  }
}

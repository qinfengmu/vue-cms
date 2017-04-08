/**
 * Created by Administrator on 2017/3/11.
 */
export default {
  state: {

    breadCrumbs: ''

  },
  getters: {
    getBreadCrumbs: (state) => state.breadCrumbs
  },
  mutations: {
    setBreadCrumbs: (state, routerMatched) => {
      state.breadCrumbs = routerMatched
    }
  }
}

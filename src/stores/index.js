import Vue from 'vue'
import Vuex from 'vuex';
import sidebarList from './modules/sidebarList'
import breadCrumbs from './modules/breadCrumbs'
import responseStatus from './modules/responseStatus'
import User from './modules/User'
import loading from './modules/loading'
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    User,
    sidebarList,
    breadCrumbs,
    loading,
    responseStatus
  }
})




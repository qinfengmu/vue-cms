import Vue from 'vue'
import Vuex from 'vuex';
import sidebarList from './modules/sidebarList'
import breadCrumbs from './modules/breadCrumbs'
import responseStatus from './modules/responseStatus'
import classify from './modules/classify'
import User from './modules/User'
import loading from './modules/loading'
import permission from './modules/permission'
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    User,
    sidebarList,
    breadCrumbs,
    loading,
    responseStatus,
    classify,
    permission
  }
})




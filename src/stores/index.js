import Vue from 'vue'
import Vuex from 'vuex';
import sidebarList from './sidebarList'
import breadCrumbs from './breadCrumbs'
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {

    sidebarList,
    breadCrumbs

  }
})




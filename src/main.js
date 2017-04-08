// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource  from 'vue-resource'
import stores from './stores'
import router from './router'
//import 'normalize.css'
import './iconfont/iconfont.css'
import './css/bootstrap/css/bootstrap.min.css'
import './filter'
import './elementUi'
import  './less/common.less'
import  components from './components'
import  VueValidator from 'vue-validator'
import { Loading } from 'element-ui'
//Vue.config.productionTip = false


Vue.use(VueValidator);
Vue.use(VueResource);


Object.keys(components).forEach((key) => {
  //注册公共组件，
  Vue.component(`v${key}`, components[key]);

});

//面包屑导航值保存到vuex中
router.afterEach(router => {
  stores.commit('setBreadCrumbs', router.matched)
})
/* eslint-disable no-new */
new Vue({
  store: stores,
  router
}).$mount('#app');

//拦截
Vue.http.options.emulateJSON = true;
Vue.http.interceptors.push( (request, next) => {

  let text = "正在加载...";

  if(request.method.toUpperCase() == 'POST') {
    text = '正在提交...';
  }

  let loadingInstance = Loading.service({
      body: false,
      fullscreen: true,
      text:text,
      lock: false,
      customClass:'ui-loading'
  });

  next((response) => {
      loadingInstance.close();
      text = "正在加载...";
  })
})

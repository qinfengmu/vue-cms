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

//页面登录权限控制，默认需要登录
router.beforeEach(({meta,path},from,next) => {

    let {auth = true } = meta;
    let isLogin = typeof(stores.state.User.userId) != 'undefined' ? true : false;
    if(auth && !isLogin && path !=='/login'){
      return next({path:'/login'});
    }

    if(isLogin && path == '/login'){
      return next({path:'/'});
    }

    next();
})
//面包屑导航值保存到vuex中
router.afterEach( router => {
  stores.commit('setBreadCrumbs',router.matched);
})
/* eslint-disable no-new */
new Vue({
  store: stores,
  router
}).$mount('#app');


//拦截器
Vue.http.options.emulateJSON = true;
Vue.http.interceptors.push( (request, next) => {

  let text = "正在加载...";

  if(request.method.toUpperCase() == 'POST') {
    text = '正在提交...';
  }
  //如果vuex中设置了加载提示文本
  if(stores.state.loading.text != ''){
    text = stores.state.loading.text;
  }
  //全局加载提示
  let loadingInstance = Loading.service({
      body: false,
      fullscreen: true,
      text:text,
      lock: false,
      customClass:'ui-loading'
  });

  setTimeout(function () {
      next((response) => {
        //从vuex取出状态文本
        const statusText = stores.state.responseStatus[response.status];
        //关闭加载
        loadingInstance.close();
        //重置提示文本
        text = "正在加载...";
        stores.dispatch('setLoadingText','');

        response.statusText = typeof(statusText) != 'undefined' ? statusText : response.statusText;

        switch (response.status){
          case 401 :
            stores.dispatch('logout');
            router.replace('/login');
          break;
          default:
          break;
        }

      })
  },500)

})

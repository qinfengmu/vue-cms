import Vue from 'vue'
import Router from 'vue-router'
import App from '../app'
import displaySettingIndex from '../pages/displaySetting'
import displaySettingPage from '../pages/displaySetting/main'
import notice from '../pages/notice'
import station from '../pages/station'
import metroLines from '../pages/metroLines'
import timetable from '../pages/timetable'
import adv from '../pages/adv'
import advMain from '../pages/adv/main'
import advAdd from '../pages/adv/add'
import advDetail from '../pages/adv/detail'
import equipment from '../pages/equipment'
import message from '../pages/message'
import appVersion from '../pages/appVersion'
import logs from '../pages/logs'
import login from '../pages/login'
import notfound from '../pages/error/404'


Vue.use(Router);
/*路由配置*/
const router = new Router({
  routes: [
    {
      path: '/',
      component: App,
      meta: {auth: false, text: '首页'},
      redirect: '/app/setBgImage',
      children: [
        {
          path: '/app',
          meta: {auth: false, text: 'APP显示设置'},
          component: displaySettingIndex,
          redirect: '/app/setBgImage',
          children: [
            {path: 'setBgImage', component: displaySettingPage, meta: {text: ''}},
            // {path: 'setAction', component: displaySettingPage, meta: {text: '主功能设置'}},
            // {path: 'setAdv', component: displaySettingPage, meta: {text: '广告设置'}}
          ]
        },
        {
          path: '/notice',
          meta: {auth: false, text: '公告管理'},
          component: notice,
          children: [
            {path: '', component: require('../pages/notice/main'), meta: {text: ''}},
            {path: 'add', component: require('../pages/notice/add'), meta: {text: '新建公告'}},
            {path: 'edit/:id', name: "noticeEdit", component: require('../pages/notice/add'), meta: {text: '编辑公告'}},
            {
              name: 'noticeDetail',
              path: 'detail/:id',
              component: require('../pages/notice/detail'),
              meta: {text: '公告详情'}
            }
          ]
        },
        {
          path: '/lines',
          meta: {auth: false, text: '线路管理'},
          component: metroLines,
          redirect: '/lines/list',
          children: [
            {path: 'list', component: require('../pages/metroLines/main'), meta: {text: '版本列表'}},
            {path: 'detail/:id', name:"lineDetail", component: require('../pages/metroLines/add'), meta: {text: '版本详情'}},
            {path: 'add',component: require('../pages/metroLines/add'), meta: {text: '新建版本'}},
            {path: 'copy/:id', name:'copy', component: require('../pages/metroLines/add'), meta: {text: '复制新建'}},
            {path: 'edit/:id', name:'edit', component: require('../pages/metroLines/add'), meta: {text: '编辑'}}
          ]
        },
        {
          path: '/station',
          meta: {auth: false, text: '站点管理'},
          component: station
        },
        {
          path: '/timetable',
          meta: {auth: false, text: '时刻表管理'},
          component: timetable,
          children: [

            {path: '', component: require('../pages/timetable/main'), meta: {text: ''}},
            {path: 'upload', component: require('../pages/timetable/add'), meta: {text: '上传时刻表'}},
            {
              name: 'timeTableDetail',
              path: 'detail/:id',
              component: require('../pages/timetable/detail'),
              meta: {text: '时刻表详情'}
            }

          ]
        },
        {
          path: '/adv',
          meta: {auth: false, text: '广告管理'},
          component: adv,
          children: [
            {path: '', component: advMain, meta: {text: ''}},
            {path: 'add', component: advAdd, meta: {text: '新建广告'}},
            {name: 'advDetail', path: 'detail/:id', component: advDetail, meta: {text: '广告详情'}}
          ]
        },
        {
          path: '/equipment',
          meta: {auth: false, text: '设备管理'},
          component: equipment,
          children: [
            {path: '', component: require('../pages/equipment/main'), meta: {text: ''}}
          ]
        },
        {
          path: '/message',
          meta: {auth: false, text: '消息推送'},
          component: message,
          children: [
            {path: '', component: require('../pages/message/main'), meta: {text: ''}},
            {path: 'add', component: require('../pages/message/add'), meta: {text: '推送新消息'}},
            {
              name: 'messageDetail',
              path: 'detail/:id',
              component: require('../pages/message/detail'),
              meta: {text: '消息详情'}
            }
          ]
        },
        {
          path: '/appVersion',
          meta: {auth: false, text: 'App版本管理'},
          component: appVersion,
          children: [

            {path: '', component: require('../pages/appVersion/main'), meta: {text: ''}},
            {path: 'upload', component: require('../pages/appVersion/add'), meta: {text: '上传APK'}},
            {
              name: 'appVersionDetail',
              path: 'detail/:id',
              component: require('../pages/appVersion/detail'),
              meta: {text: '版本详情'}
            }

          ]
        },
        {
          path: '/logs',
          meta: {auth: false, text: '操作日志'},
          component: logs,
          children: [
            {path: '', component: require('../pages/logs/main'), meta: {text: ''}}
          ]
        }

      ]
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/notfound',
      component: notfound
    },
    {
      path: '*',
      redirect: '/app/setBgImage'
    }
  ]
  //mode: 'history',
  //base: '/cms-web'
});

export default router


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
import system from '../pages/system'
import login from '../pages/login'
import notfound from '../pages/error/404'


Vue.use(Router);
/*路由配置*/
const router = new Router({
  routes: [
    {
      path: '/',
      component: App,
      meta: { text: '首页'},
      redirect: '/app/setBgImage',
      children: [
        {
          path: '/app',
          meta: { text: 'APP显示设置'},
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
          meta: { text: '公告管理'},
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
          path: '/content',
          meta: { text: '内容管理'},
          component: system,
          redirect: '/content/service',
          children: [
            {
              path: 'service', component: require('../pages/content/service/index'), meta: {text: '乘客服务'},
              children: [
                {path: '', component: require('../pages/content/service/main'), meta: {text: ''}},
                {path: 'add', component: require('../pages/content/service/add'), meta: {text: '新建内容'}},
                {path: 'detail/:id', name: 'serviceDetail', component: require('../pages/content/service/detail'), meta: {text: '内容详情'}}
              ]
            },
            {
              path: 'knowledge', component: require('../pages/content/knowledge/index'), meta: {text: '地铁知识'},
              children: [
                {path: '', component: require('../pages/content/knowledge/main'), meta: {text: ''}},
                {path: 'add', component: require('../pages/content/knowledge/add'), meta: {text: '新建内容'}},
                {path: 'detail/:id', name: 'knowledgeDetail', component: require('../pages/content/knowledge/detail'), meta: {text: '内容详情'}}
              ]
            },
            {
              path: 'ticket', component: require('../pages/content/ticket/index'), meta: {text: '票务须知'},
              children: [
                {path: '', component: require('../pages/content/ticket/main'), meta: {text: ''}},
                {path: 'add', component: require('../pages/content/ticket/add'), meta: {text: '新建内容'}},
                {path: 'detail/:id', name: 'ticketDetail', component: require('../pages/content/ticket/detail'), meta: {text: '内容详情'}}
              ]
            },
            {
              path: 'operation', component: require('../pages/content/operation/index'), meta: {text: '运营动态'},
              children: [
                {path: '', component: require('../pages/content/operation/main'), meta: {text: ''}},
                {path: 'add', component: require('../pages/content/operation/add'), meta: {text: '新建内容'}},
                {path: 'detail/:id', name: 'operationDetail', component: require('../pages/content/operation/detail'), meta: {text: '内容详情'}}
              ]
            }
          ]
        },
        {
          path: '/lines',
          meta: { text: '线路管理'},
          component: metroLines,
          redirect: '/lines/list',
          children: [
            {path: 'list', component: require('../pages/metroLines/main'), meta: {text: '版本列表'}},
            {path: 'detail/:id', name:"lineDetail", component: require('../pages/metroLines/add'), meta: {text: '版本详情'}},
            {path: 'add',component: require('../pages/metroLines/add'), meta: {text: '新建版本'}},
            {path: 'copy/:id', name:'copyLine', component: require('../pages/metroLines/add'), meta: {text: '复制新建'}},
            {path: 'edit/:id', name:'editLine', component: require('../pages/metroLines/add'), meta: {text: '编辑'}}
          ]
        },
        {
          path: '/station',
          meta: { text: '站点管理'},
          component: station
        },
        {
          path: '/timetable',
          meta: { text: '时刻表管理'},
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
          meta: { text: '广告管理'},
          component: adv,
          children: [
            {path: '', component: advMain, meta: {text: ''}},
            {path: 'add', component: advAdd, meta: {text: '新建广告'}},
            {name: 'advDetail', path: 'detail/:id', component: advDetail, meta: {text: '广告详情'}}
          ]
        },
        {
          path: '/equipment',
          meta: { text: '设备管理'},
          component: equipment,
          children: [
            {path: '', component: require('../pages/equipment/main'), meta: {text: ''}}
          ]
        },
        {
          path: '/message',
          meta: { text: '消息推送'},
          component: message,
          children: [
            {path: '', component: require('../pages/message/main'), meta: {text: ''}},
            {path: 'add', component: require('../pages/message/add'), meta: {text: '推送新消息'}},
            {path: 'copy/:id', name: "copyMessage", component: require('../pages/message/add'), meta: {text: '推送新消息'}},
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
          meta: { text: 'App版本管理'},
          component: appVersion,
          children: [

            {path: '', component: require('../pages/appVersion/main'), meta: {text: ''}},
            {path: 'upload', component: require('../pages/appVersion/add'), meta: {text: '新建APP版本'}},
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
          meta: { text: '操作日志'},
          component: logs,
          children: [
            {path: '', component: require('../pages/logs/main'), meta: {text: ''}}
          ]
        },
        {
          path: '/system',
          meta: { text: '系统管理'},
          component: system,
          redirect: '/system/user',
          children: [
            {
              path: 'user', component: require('../pages/system/user/index'), meta: {text: '用户管理'},
              children: [
                {path: '', component: require('../pages/system/user/main'), meta: {text: ''}},
                {path: 'add', component: require('../pages/system/user/add'), meta: {text: '添加用户'}},
                {path: 'edit/:id', name: 'editUser', component: require('../pages/system/user/edit'), meta: {text: '修改用户信息'}}
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      meta: {auth: false},
      component: login
    },
    {
      path: '/notfound',
      meta: {auth: false},
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


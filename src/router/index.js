import Vue from 'vue'
import Router from 'vue-router'
import App from '../app'
//app显示设置
import displaySettingIndex from '../pages/displaySetting'
import displaySettingPage from '../pages/displaySetting/main'
//通知
import notice from '../pages/notice'
//站点管理
import station from '../pages/station'
//线路管理
import metroLines from '../pages/metroLines'
//时刻表
import timetable from '../pages/timetable'
//广告管理
import adv from '../pages/adv'
import advMain from '../pages/adv/main'
import advAdd from '../pages/adv/add'
import advDetail from '../pages/adv/detail'
//设备管理
import equipment from '../pages/equipment'
//消息管理
import message from '../pages/message'
//版本管理
import appVersion from '../pages/appVersion'
//操作日志
import logs from '../pages/logs'
//系统管理
import system from '../pages/system'
//权限管理
import permission from '../pages/permission'
//登录
import login from '../pages/login'
//404
import notfound from '../pages/error/404'

Vue.use(Router);
/*路由配置*/
/*ps 现在code只控制到菜单
* code中的值是和后台权限控制--页面元素中的code是一一对应的
* */
const router = new Router({
  routes: [
    {
      path: '/',
      component: App,
    //  redirect: '/app/setBgImage',
      children: [
        {
          path:'',
          meta: { text: '首页',code:'noNeedPermission'},
          component: require('../pages/home/index')
        },
        {
          path: '/app',
          meta: { text: 'APP显示设置'},
          component: displaySettingIndex,
          redirect: '/app/setBgImage',
          children: [
            {path: 'setBgImage', component: displaySettingPage, meta: {text: '',code:'appDisplay'}}
            // {path: 'setAction', component: displaySettingPage, meta: {text: '主功能设置'}},
            // {path: 'setAdv', component: displaySettingPage, meta: {text: '广告设置'}}
          ]
        },
        {
          path: '/notice',
          meta: { text: '公告管理'},
          component: notice,
          children: [
            {path: '', component: require('../pages/notice/main'), meta: {text: '' ,code:'notice'}},
            {path: 'add', component: require('../pages/notice/add'), meta: {text: '新建公告',code:'notice'}},
            {path: 'edit/:id', name: "noticeEdit", component: require('../pages/notice/add'), meta: {text: '编辑公告',code:'notice'}},
            {
              name: 'noticeDetail',
              path: 'detail/:id',
              component: require('../pages/notice/detail'),
              meta: {text: '公告详情',code:'notice'}
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
                {path: '', component: require('../pages/content/service/main'), meta: {text: '',code:'content_service'}},
                {path: 'add', component: require('../pages/content/service/add'), meta: {text: '新建内容',code:'content_service'}},
                {path: 'detail/:id', name: 'serviceDetail', component: require('../pages/content/service/detail'), meta: {text: '内容详情',code:'content_service'}},
                {path: 'edit/:id', name: 'editService', component: require('../pages/content/service/add'), meta: {text: '编辑内容',code:'content_service'}}
              ]
            },
            {
              path: 'knowledge', component: require('../pages/content/knowledge/index'), meta: {text: '地铁知识'},
              children: [
                {path: '', component: require('../pages/content/knowledge/main'), meta: {text: '',code:'content_knowledge'}},
                {path: 'add', component: require('../pages/content/knowledge/add'), meta: {text: '新建内容',code:'content_knowledge'}},
                {path: 'detail/:id', name: 'knowledgeDetail', component: require('../pages/content/knowledge/detail'), meta: {text: '内容详情',code:'content_knowledge'}},
                {path: 'edit/:id', name: 'editKnowledge', component: require('../pages/content/knowledge/add'), meta: {text: '编辑内容',code:'content_knowledge'}}
              ]
            },
            {
              path: 'ticket', component: require('../pages/content/ticket/index'), meta: {text: '票务须知'},
              children: [
                {path: '', component: require('../pages/content/ticket/main'), meta: {text: '',code:'content_ticket'}},
                {path: 'add', component: require('../pages/content/ticket/add'), meta: {text: '新建内容',code:'content_ticket'}},
                {path: 'detail/:id', name: 'ticketDetail', component: require('../pages/content/ticket/detail'), meta: {text: '内容详情',code:'content_ticket'}},
                {path: 'edit/:id', name: 'editTicket', component: require('../pages/content/ticket/add'), meta: {text: '编辑内容',code:'content_ticket'}}
              ]
            },
            {
              path: 'operation', component: require('../pages/content/operation/index'), meta: {text: '运营动态'},
              children: [
                {path: '', component: require('../pages/content/operation/main'), meta: {text: '',code:'content_operation'}},
                {path: 'add', component: require('../pages/content/operation/add'), meta: {text: '新建内容',code:'content_operation'}},
                {path: 'detail/:id', name: 'operationDetail', component: require('../pages/content/operation/detail'), meta: {text: '内容详情',code:'content_operation'}},
                {path: 'edit/:id', name: 'editOperation', component: require('../pages/content/operation/add'), meta: {text: '编辑内容',code:'content_operation'}}
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
            {path: 'list', component: require('../pages/metroLines/main'), meta: {text: '版本列表',code:'lines'}},
            {path: 'detail/:id', name:"lineDetail", component: require('../pages/metroLines/add'), meta: {text: '版本详情',code:'lines'}},
            {path: 'add',component: require('../pages/metroLines/add'), meta: {text: '新建版本',code:'lines'}},
            {path: 'copy/:id', name:'copyLine', component: require('../pages/metroLines/add'), meta: {text: '复制新建',code:'lines'}},
            {path: 'edit/:id', name:'editLine', component: require('../pages/metroLines/add'), meta: {text: '编辑',code:'lines'}}
          ]
        },
        {
          path: '/station',
          meta: { text: '站点管理',code:'station'},
          component: station
        },
        {
          path: '/timetable',
          meta: { text: '时刻表管理'},
          component: timetable,
          children: [

            {path: '', component: require('../pages/timetable/main'), meta: {text: '',code:'timetable'}},
            {path: 'upload', component: require('../pages/timetable/add'), meta: {text: '上传时刻表',code:'timetable'}},
            {
              name: 'timeTableDetail',
              path: 'detail/:id',
              component: require('../pages/timetable/detail'),
              meta: {text: '时刻表详情',code:'timetable'}
            }

          ]
        },
        {
          path: '/adv',
          meta: { text: '广告管理'},
          component: adv,
          children: [
            {path: '', component: advMain, meta: {text: '',code:'adv'}},
            {path: 'add', component: advAdd, meta: {text: '新建广告',code:'adv'}},
            {name: 'advDetail', path: 'detail/:id', component: advDetail, meta: {text: '广告详情',code:'adv'}}
          ]
        },
        {
          path: '/equipment',
          meta: { text: '设备管理'},
          component: equipment,
          children: [
            {path: '', component: require('../pages/equipment/main'), meta: {text: '',code:'equipment'}}
          ]
        },
        {
          path: '/message',
          meta: { text: '消息推送'},
          component: message,
          children: [
            {path: '', component: require('../pages/message/main'), meta: {text: '',code:'message'}},
            {path: 'add', component: require('../pages/message/add'), meta: {text: '推送新消息',code:'message'}},
            {path: 'copy/:id', name: "copyMessage", component: require('../pages/message/add'), meta: {text: '推送新消息',code:'message'}},
            {
              name: 'messageDetail',
              path: 'detail/:id',
              component: require('../pages/message/detail'),
              meta: {text: '消息详情',code:'message'}
            }
          ]
        },
        {
          path: '/appVersion',
          meta: { text: 'App版本管理'},
          component: appVersion,
          children: [

            {path: '', component: require('../pages/appVersion/main'), meta: {text: '',code:'appVersion'}},
            {path: 'upload', component: require('../pages/appVersion/add'), meta: {text: '新建APP版本',code:'appVersion'}},
            {
              name: 'appVersionDetail',
              path: 'detail/:id',
              component: require('../pages/appVersion/detail'),
              meta: {text: '版本详情',code:'appVersion'}
            }

          ]
        },
        {
          path: '/logs',
          meta: { text: '操作日志'},
          component: logs,
          children: [
            {path: '', component: require('../pages/logs/main'), meta: {text: '',code:'logs'}}
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
                {path: '', component: require('../pages/system/user/main'), meta: {text: '',code:'system_user'}},
                {path: 'add', component: require('../pages/system/user/add'), meta: {text: '添加用户',code:'system_user'}},
                {path: 'edit/:id', name: 'editUser', component: require('../pages/system/user/edit'), meta: {text: '修改用户信息',code:'system_user'}}
              ]
            },
            {
              path: 'role', component: require('../pages/system/role/index'), meta: {text: '角色管理'},
              children: [
                {path: '', component: require('../pages/system/role/main'), meta: {text: '',code:'system_role'}},
                {path: 'add', component: require('../pages/system/role/add'), meta: {text: '新建角色',code:'system_role'}},
                {path: 'detail/:id',name: 'roleDetail', component: require('../pages/system/role/detail'), meta: {text: '角色详情',code:'system_role'}},
                {path: 'edit/:id', name: 'editRole', component: require('../pages/system/role/add'), meta: {text: '修改角色信息',code:'system_role'}}
              ]
            }
          ]
        },
        {
          path: '/permission',
          meta: { text: '权限管理'},
          component: permission,
          redirect: '/permission/list',
          children: [
            {
              path: 'list', component: require('../pages/permission/list/index'), meta: {text: '权限列表'},
              children: [
                {
                  path: '', component: require('../pages/permission/list/main'), meta: {text: '',code:'permission_list'},
                  children: [
                    {path: 'add', name:"addPermissionNode", component: require('../pages/permission/list/add'), meta: {text: '添加节点',code:'permission_list'}},
                    {path: 'edit/:id', name: 'editPermissionNode', component: require('../pages/permission/list/edit'), meta: {text: '编辑节点',code:'permission_list'}},
                    {path: 'detail/:id', name:"permissionNodeDetail", component: require('../pages/permission/list/detail'), meta: {text: '节点详情',code:'permission_list'}}
                  ]
                }
              ]
            },
            {
              path: 'element', component: require('../pages/permission/element/index'), meta: {text: '页面元素'},
              children: [
                {path: '', component: require('../pages/permission/element/main'), meta: {text: '',code:'permission_element'}},
                {path: 'add', component: require('../pages/permission/element/add'), meta: {text: '添加元素',code:'permission_element'}},
                {path: 'edit/:id', name: 'editElement', component: require('../pages/permission/element/add'), meta: {text: '修改元素',code:'permission_element'}},
                {path: 'detail/:id', name: 'elementDetail', component: require('../pages/permission/element/detail'), meta: {text: '元素详情',code:'permission_element'}}
              ]
            },
            {
              path: 'func', component: require('../pages/permission/func/index'), meta: {text: '功能操作'},
              children: [
                {path: '', component: require('../pages/permission/func/main'), meta: {text: '',code:'permission_func'}},
                {path: 'add', component: require('../pages/permission/func/add'), meta: {text: '添加URL',code:'permission_func'}},
                {path: 'edit/:id', name: 'editFunc', component: require('../pages/permission/func/add'), meta: {text: '修改URL',code:'permission_func'}},
                {path: 'detail/:id', name: 'funcDetail', component: require('../pages/permission/element/detail'), meta: {text: 'URL详情',code:'permission_func'}}

              ]
            }
          ]
        },
        {
          path: '/authorization',
          meta: {text:'无权限',auth: false,code:'noNeedPermission'},
          component: require('../pages/error/authorization')
        }
      ]
    },
    {
      path: '/login',
      meta: {auth: false,code:'noNeedPermission'},
      component: login
    },
    {
      path: '/notfound',
      meta: {auth: false,code:'noNeedPermission'},
      component: notfound
    },

    {
      path: '*',
      redirect: '/notfound'
    }
  ]
  //mode: 'history',
  //base: '/cms-web'
});

export default router


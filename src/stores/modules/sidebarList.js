export default {
  state: {
    sidebarList: [
      {
        name: 'APP显示设置',
        code: 'appDisplay',
        visible:false,
        url: '/app',
        iconClass: 'icon-home'
      },
      {
        name: '公告管理',
        iconClass: 'icon-voice fz20',
        code: 'notice',
        visible:false,
        url: '/notice'

      },
      {
        name: '内容管理',
        iconClass: 'icon-list fz13',
        code: 'content',
        visible:false,
        url: '/content',
        showSubNav: false,
        subNav: [
          {
            name: '乘客服务',
            code: 'content_service',
            visible:false,
            url: '/content/service'
          },
          {
            name: '地铁知识',
            code: 'content_knowledge',
            visible:false,
            url: '/content/knowledge'
          },
          {
            name: '票务须知',
            code: 'content_ticket',
            visible:false,
            url: '/content/ticket'
          },
          {
            name: '运营动态',
            code: 'content_operation',
            visible:false,
            url: '/content/operation'
          }
        ]

      },
      {
        name: '线路管理',
        iconClass: 'icon-road',
        code: 'lines',
        visible:false,
        url: '/lines'
        // showSubNav: false,
        // subNav: [
        //   {
        //     name: '版本列表',
        // code: '',
        // visible:false,
        // url: '/lines/list'
        //   }
        // ]

      },
      {
        name: '站点管理',
        iconClass: 'icon-local fz20',
        code: 'station',
        visible:false,
        url: '/station'

      },
      {
        name: '时刻表管理',
        iconClass: 'icon-clock fz20',
        code: 'timetable',
        visible:false,
        url: '/timetable'
      },
      {
        name: '广告管理',
        iconClass: 'icon-images fz17',
        code: 'adv',
        visible:false,
        url: '/adv'

      },
      {
        name: '设备管理',
        iconClass: 'icon-phone fz20',
        code: 'equipment',
        visible:false,
        url: '/equipment'

      },
      {
        name: '消息推送',
        iconClass: 'icon-send fz17',
        code: 'message',
        visible:false,
        url: '/message'

      },
      {
        name: 'App版本管理',
        iconClass: 'icon-version fz16',
        code: 'appVersion',
        visible:false,
        url: '/appVersion'

      },
      {
        name: '操作日志',
        iconClass: 'icon-logs',
        code: 'logs',
        visible:false,
        url: '/logs'
      },
      {
        name: '系统管理',
        iconClass: 'icon-gear fz20',
        code: 'system',
        visible:false,
        url: '/system',
        showSubNav: false,
        subNav: [
          {
            name: '用户管理',
            code: 'system_user',
            visible:false,
            url: '/system/user'
          },
          {
            name: '角色管理',
            code: 'system_role',
            visible:false,
            url: '/system/role'

          }
        ]
      },
      {
        name: '权限管理',
        iconClass: 'icon-admin fz20',
        code: 'permission',
        visible:false,
        url: '/permission',
        showSubNav: false,
        subNav: [
          {
            name: '权限列表',
            code: 'permission_list',
            visible:false,
            url: '/permission/list'
          },
          {
            name: '页面元素',
            code: 'permission_element',
            visible:false,
            url: '/permission/element'

          },
          {
            name: '功能操作(URL)',
            code: 'permission_func',
            visible:false,
            url: '/permission/func'
          }

        ]
      }
    ]
  },
  getters: {
    getSidebarList (state) { return state.sidebarList}
  },
  mutations: {

  }


}

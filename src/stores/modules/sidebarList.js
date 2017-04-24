export default {
  state: {
    sidebarList: [
      {
        name: 'APP显示设置',
        url: '/app',
        iconClass: 'icon-home'
        // showSubNav: true,
        // subNav: [
        //   {
        //     name: '背景图片设置',
        //     url: '/app/setBgImage'
        //   },
        //   {
        //     name: '主功能设置',
        //     url: '/app/setAction'
        //   },
        //   {
        //     name: '广告设置',
        //     url: '/app/setAdv'
        //   }
        // ]
      },
      {
        name: '公告管理',
        iconClass: 'icon-voice fz20',
        url: '/notice'

      },
      {
        name: '内容管理',
        iconClass: 'icon-list fz13',
        url: '/content',
        showSubNav: false,
        subNav: [
          {
            name: '乘客服务',
            url: '/content/service'
          },
          {
            name: '地铁知识',
            url: '/content/knowledge'
          },
          {
            name: '票务须知',
            url: '/content/ticket'
          },
          {
            name: '运营动态',
            url: '/content/operation'
          }
        ]

      },
      {
        name: '线路管理',
        iconClass: 'icon-road',
        url: '/lines'
        // showSubNav: false,
        // subNav: [
        //   {
        //     name: '版本列表',
        //     url: '/lines/list'
        //   }
        // ]

      },
      {
        name: '站点管理',
        iconClass: 'icon-local fz20',
        url: '/station'

      },
      {
        name: '时刻表管理',
        iconClass: 'icon-clock fz20',
        url: '/timetable'
      },
      {
        name: '广告管理',
        iconClass: 'icon-images fz17',
        url: '/adv'

      },
      {
        name: '设备管理',
        iconClass: 'icon-phone fz20',
        url: '/equipment'

      },
      {
        name: '消息推送',
        iconClass: 'icon-send fz17',
        url: '/message'

      },
      {
        name: 'App版本管理',
        iconClass: 'icon-version fz16',
        url: '/appVersion'

      },
      {
        name: '操作日志',
        iconClass: 'icon-logs',
        url: '/logs'
      },
      {
        name: '系统管理',
        iconClass: 'icon-gear fz20',
        url: '/system',
        showSubNav: false,
        subNav: [
          {
            name: '用户管理',
            url: '/system/user'
          }
        ]
      }
    ]
  },
  getters: {
    getSidebarList (state) { return state.sidebarList}
  }

}

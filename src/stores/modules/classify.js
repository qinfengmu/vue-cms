/**
 * Created by Administrator on 2017/4/25.
 */

export default {

  state : {

    serviceArr: [
      {
        id:1,
        name: '乘车指南'
      },
      {
        id:2,
        name: '乘车须知'
      },
      {
        id:3,
        name: '失物招领'
      },
      {
        id:4,
        name: '便民问答'
      },{
        id:5,
        name: '服务热线'
      }
    ],
    knowledgeArr: [
      {
        id:1,
        name: '地铁知识'
      },
      {
        id:2,
        name: '安全常识'
      },
      {
        id:3,
        name: '乘车应急知识'
      }
    ],
    ticketArr: [
      {
        id:1,
        name: '车票须知'
      },
      {
        id:2,
        name: '票类信息'
      }
    ]

  },
  getters: {
    getClassify (state){ return state}
  },
  mutations: {

  },
  actions: {

  }

}

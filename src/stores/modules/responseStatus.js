/**
 * Created by Administrator on 2017/4/18.
 * 请求错误状态
 *
 */
export default {

  state: {
    401: '请重新登录！',
    403: '无权限！',
    404: '没有找到该请求！',
    408: '请求超时！',
    500: '服务器内部错误！',
    502: '错误网关！',
    503: '服务器不可用！',
    504: '网关超时！'
  },
  getters: {
    getResStatus (state) {
       return state;
    }

  }

}

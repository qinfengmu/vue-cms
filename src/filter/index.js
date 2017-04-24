
import Vue from "vue"
import moment from 'moment'

Vue.filter('date', (date, format) => {

  if(!date) {
  return '';
}
const d = moment(date)
return d.format(format)

});

/*公告管理--状态过滤器*/
Vue.filter('noticeState', (state) => {

  const textArr = ['未发布','已发布','已下线'];

  return textArr[state] ? textArr[state] : '';

})
/*线路管理-站点类型过滤器*/
Vue.filter('pointState', (state) => {

  const textArr = ['站点','连接点','控制点'];

return textArr[state] ? textArr[state] : '';

})
//消息推送--后续动作
Vue.filter('messageAfterOpen', (state) => {

  const textArr = ['打开应用','打开链接','打开指定页面','自定义行为'];

return textArr[state] ? textArr[state] : '';

})

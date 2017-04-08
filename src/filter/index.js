
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

  let stateText = '';

  switch (state) {

    case 0:
      stateText = '未发布';
      break;
    case 1:
      stateText = '已发布';
      break;
    case 2:
    stateText = '已下线';
    break;
  }
  return stateText;

})
/*线路管理-站点类型过滤器*/
Vue.filter('pointState', (state) => {

  let stateText = '';

  switch (state) {

    case 0:
      stateText = '站点';
      break;
    case 1:
      stateText = '连接点';
      break;
    case 2:
    stateText = '控制点';
    break;
  }
  return stateText;

})

/*按需引入element-ui*/
import Vue from 'vue'
import { Message, MessageBox, DatePicker, Progress, Switch} from 'element-ui'
Vue.component(DatePicker.name, DatePicker);
Vue.component(Progress.name, Progress);
Vue.component(Switch.name, Switch);
Vue.prototype.$message = Message;

Vue.prototype.$messageBox = MessageBox;

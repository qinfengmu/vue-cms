/*按需引入element-ui*/
import Vue from 'vue'
import { Message, MessageBox, DatePicker,Loading } from 'element-ui'
Vue.component(DatePicker.name, DatePicker);
Vue.prototype.$message = Message;

Vue.prototype.$messageBox = MessageBox;

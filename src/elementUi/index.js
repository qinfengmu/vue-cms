/*按需引入element-ui*/
import Vue from 'vue'
import { Message, MessageBox, DatePicker, Progress, Switch, Tree, Checkbox,Tabs,tabPane,Table,tableColumn} from 'element-ui'
//日期控件
Vue.component(DatePicker.name, DatePicker);
//进度条
Vue.component(Progress.name, Progress);
//开关
Vue.component(Switch.name, Switch);
//树
Vue.component(Tree.name, Tree);
//复选框
Vue.component(Checkbox.name, Checkbox);
//tabs标签
Vue.component(Tabs.name, Tabs);
Vue.component(tabPane.name, tabPane);
//表格
Vue.component(Table.name, Table);
Vue.component(tableColumn.name, tableColumn);
//提示
Vue.prototype.$message = Message;
//弹出层提示
Vue.prototype.$messageBox = MessageBox;

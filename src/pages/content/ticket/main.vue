<template>
    <div>
      <panel-wrap>
        <search-bar>
          <form @submit.prevent="">
            <dl>
              <dt>商户名称:</dt>
              <dd><input class="f-input" v-model="searchObj.name"/></dd>
            </dl>
            <!--<dl>-->
              <!--<dt>广告分类:</dt>-->
            <!--<dd>-->
              <!--<select class="f-input" v-model="searchObj.type">-->
                <!--<option value="1">1</option>-->
                <!--<option value="2">2</option>-->
              <!--</select>-->
            <!--</dd>-->
            <!--</dl>-->
            <date-picker labelName="发布时间"  v-on:getStartTime="getStartTime"></date-picker>
            <date-picker labelName="下线时间"  v-on:getStartTime="getEndTime"></date-picker>
            <dl>
              <dd><button @click="search()" class="btn btn-blue">查询</button></dd>
            </dl>
          </form>
        </search-bar>

      </panel-wrap>
      <panel-wrap class="panelWrap2">

        <ul class="action-list">
          <!--<li><a href="#" class="btn btn-blue">全选</a></li>-->
          <!--<li><a href="#" class="btn btn-blue">导出列表</a></li>-->
          <li><router-link to="/adv/add" class="btn btn-blue">新建广告</router-link></li>
        </ul>

        <ui-table :headerArray="headerArray" :style="{minHeight:tableMinHeight}">
            <tbody slot="tbody">
              <tr v-for="data in tableData">
                <!--<td><input type="checkbox" :value="data.id" @change="write($event)" v-model="checkedNames"></td>-->
                <td>{{data.name}}</td>
                <td>{{data.info}}</td>
                <td><span class="yellowColor">{{data.clicks}}</span></td>
                <td>{{data.publishTime | date('YYYY-MM-DD HH:mm:ss')}}</td>
                <td>{{data.offTime | date('YYYY-MM-DD HH:mm:ss')}}</td>
                <td><router-link class="blue-fontIcon" title="查看详情" :to="{ name: 'advDetail', params: { id: data.id }}"><i class="iconfont icon-info"></i></router-link></td>
              </tr>
              <tr v-if="tableData == ''" class="text-center">
                  <td colspan="7">无数据</td>
              </tr>
            </tbody>

        </ui-table>
        <pagination ref="pagination" v-if="tableTotalPage > 0" :pages="tableTotalPage" :pageSize="pageSize" v-on:pageChange="getPage"></pagination>
      </panel-wrap>
    </div>
</template>
<style lang="less" scoped>
</style>
<script>
import uiTable from '../../../components/uiTable'
import panelWrap from '../../../components/panelWrap'
import searchBar from '../../../components/searchBar'
import datePicker from '../../../components/datePicker'
import pagination from '../../../components/pagination'
  export default{
      data(){
          return{
              checkedNames: [],
              searchObj: {
                publishTime: '',
                offTime: '',
                name: '',
               // type: ''
              },
              headerArray: [
              //{name: '选择',width:'5%'},
              {name: '商户名称', width:'20%'},
              //{name: '广告分类'},
              {name: '广告描述', width:'25%'},
              {name: '点击次数'},
              {name: '发布时间'},
              {name: '下线时间'},
              {name: '操作'},
             ],
             tableTotalPage:0,
             pageSize: 10,
             tableData: [

             ]

          }
      },
      created () {
        this.getAdvList();
      },
      computed: {

        tableMinHeight () {

          return 42*(this.pageSize+1)+'px';

        }


      },
      components:{
        panelWrap,
        uiTable,
        datePicker,
        searchBar,
        pagination
      },
      methods: {

        getAdvList (page,obj) {

         const searchObj = obj || {};
         page = page || 1;
         this.$http.get('/advertisement/getLists',{params:{pageNum: page, pageSize: this.pageSize, obj: JSON.stringify(searchObj)}})
           .then( (res) =>{
              const msg = res.body;
              if(msg.result.success){
                this.tableData = msg.result.data;
                this.tableTotalPage = msg.result.total;

                if(this.$refs.pagination){
                    this.$refs.pagination.setPaginationData(page);
                }
              }

           }, res => {
                this.$message.error({message: res.statusText });
             })
        },

        getStartTime (time) {
          this.searchObj.publishTime = time;
        },
        getEndTime (time) {
          this.searchObj.offTime = time;
        },
        search (){
          this.getAdvList(1,this.searchObj);
          //console.log(this.startTime)
          //console.log(this.endTime)
        },
        getPage (page) {

          this.getAdvList(page,this.searchObj);

        }
      }
  }
</script>

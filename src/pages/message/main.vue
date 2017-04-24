<template>
    <div>
      <panel-wrap>
        <search-bar>
          <form @submit.prevent="">
            <dl>
              <dt>消息描述:</dt>
              <dd><input v-model="searchObj.appDescribe" class="f-input" /></dd>
            </dl>
            <!--<dl>-->
              <!--<dt>人群:</dt>-->
            <!--<dd>-->
              <!--<select class="f-input" >-->
                <!--<option>全部</option>-->
              <!--</select>-->
            <!--</dd>-->
            <!--</dl>-->
            <date-picker labelName="创建时间"   v-on:getStartTime="getStartTime"></date-picker>
            <date-picker labelName="推送时间"   v-on:getStartTime="getEndTime"></date-picker>
            <!--<dl>-->
              <!--<dt>推送状态:</dt>-->
            <!--<dd>-->
              <!--<select class="f-input" >-->
                <!--<option>全部</option>-->
              <!--</select>-->
            <!--</dd>-->
            <!--</dl>-->

            <dl>
              <dd><button @click="search()" class="btn btn-blue">查询</button></dd>
            </dl>
          </form>
        </search-bar>

      </panel-wrap>
      <panel-wrap class="panelWrap2">

        <ul class="action-list">
          <li><router-link to="/message/add" class="btn btn-blue">推送新消息</router-link></li>
        </ul>

        <ui-table :headerArray="headerArray" :style="{minHeight:tableMinHeight}">
            <tbody slot="tbody">
              <tr v-for="data in tableData">
                <td>{{data.appDescribe}}</td>
                <td>{{data.targetUser == 0 ? '所有人' : '-'}}</td>
                <td>{{data.createTime | date('YYYY-MM-DD HH:mm:ss')}}</td>
                <td>{{data.publishTime | date('YYYY-MM-DD HH:mm:ss')}}</td>
                <td class="action-td">
                  <router-link class="blue-fontIcon" title="详情" :to="{ name: 'messageDetail', params: { id: data.id }}"><i class="iconfont icon-info"></i></router-link>
                  <router-link class="blue-fontIcon" title="复制" :to="{ name: 'copyMessage', params: { id: data.id }}"><i class="iconfont icon-copy"></i></router-link>
                  <!--<a href="" class="red-fontIcon" title="删除"  @click.prevent="deleted(data)"><i class="iconfont icon-delete"></i></a>-->
                </td>
              </tr>
              <tr v-if="tableData == ''" class="text-center">
                  <td colspan="6">无数据</td>
              </tr>
            </tbody>
        </ui-table>
        <pagination ref="pagination" v-if="tableTotalPage > 0" :pages="tableTotalPage" :pageSize="pageSize" v-on:pageChange="getPage"></pagination>
      </panel-wrap>

    </div>
</template>
<style lang="less" scoped>
  @import "../../less/mixins";
  @import "../../less/variables";
</style>
<script>
import uiTable from '../../components/uiTable'
import panelWrap from '../../components/panelWrap'
import searchBar from '../../components/searchBar'
import datePicker from '../../components/datePicker'
import pagination from '../../components/pagination'
  export default{
      data(){
          return{
              checkedNames: [],
              searchObj: {
                appDescribe: '',
                createTime: '',
                publishTime: ''
              },
              headerArray: [
                {name: '消息描述'},
                {name: '人群', width:'20%'},
                {name: '创建时间',width:'20%'},
                {name: '推送时间',width:'20%'},
                //{name: '状态'},
                {name: '操作',width:'10%'}
             ],
             tableTotalPage:0,
             pageSize: 10,
             tableData: [

             ]

          }
      },
      created () {
        this.getLists();
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
        getLists (page,obj) {
         const searchObj = obj || {};
         page = page || 1;
         this.$http.get('/api/appMessage/getLists',{params:{pageNum: page, pageSize: this.pageSize, obj: JSON.stringify(searchObj)}})
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
          this.searchObj.createTime = time;
        },
        getEndTime (time) {
          this.searchObj.publishTime = time;
        },
        search (){
          this.getLists(1,this.searchObj);
        },
        getPage (page) {

          this.getLists(page,this.searchObj);

        }
      }
  }
</script>

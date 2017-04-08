<template>
    <div>
      <panel-wrap>
        <search-bar>
          <form @submit.prevent="">
            <dl>
              <dt>用户名称:</dt>
              <dd><input v-model="searchObj.userName" class="f-input" /></dd>
            </dl>
            <dl>
              <dt>ip地址:</dt>
              <dd><input v-model="searchObj.ip" class="f-input" /></dd>
            </dl>
            <dl>
              <dt>操作:</dt>
              <dd><input v-model="searchObj.operation" class="f-input" /></dd>
            </dl>
            <dl>
              <dt>操作内容:</dt>
              <dd><input v-model="searchObj.optContent" class="f-input" /></dd>
            </dl>
            <date-picker labelName="操作时间"  v-on:getStartTime="getStartTime"></date-picker>
            <dl>
              <dd><button @click="search()" class="btn btn-blue">查询</button></dd>
            </dl>
          </form>
        </search-bar>

      </panel-wrap>
      <panel-wrap class="panelWrap2">

        <ui-table :headerArray="headerArray" :style="{minHeight:tableMinHeight}">
            <tbody slot="tbody">
              <tr v-for="data in tableData">
                <td>{{data.userName}}</td>
                <td>{{data.ip}}</td>
                <td>{{data.operation}}</td>
                <td>{{data.optContent}}</td>
                <td>{{data.optTime | date('YYYY-MM-DD HH:mm:ss')}}</td>
              </tr>
              <tr v-if="tableData == ''" class="text-center">
                  <td colspan="5">无数据</td>
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
                userName: '',
                ip: '',
                operation: '',
                optTime: '',
                optContent: ''
              },
              headerArray: [
              {name: '用户名称',width:'20%'},
              {name: 'ip地址', width:'20%'},
              {name: '操作'},
              {name: '操作内容'},
              {name: '操作时间'},
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
         this.$http.get('/api/operationLog/getLists',{params:{pageNum: page, pageSize: this.pageSize, obj: JSON.stringify(searchObj)}})
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
                this.$message.error({message: res.status+'-'+res.statusText });
             })
        },
        search (){
          this.getLists(1,this.searchObj);
        },
        getStartTime (time) {
          this.searchObj.optTime = time;
        },
        getPage (page) {
          this.getLists(page,this.searchObj);
        }
      }
  }
</script>

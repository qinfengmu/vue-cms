<template>
    <div>
      <panel-wrap>
        <search-bar>
          <form @submit.prevent="">
            <dl>
              <dt>版本名称:</dt>
              <dd><input class="f-input" v-model="searchObj.version"/></dd>
            </dl>            <dl>
              <dt>上传人:</dt>
            <dd><input class="f-input" v-model="searchObj.opUserName"/></dd>
            </dl>
            <date-picker labelName="上传时间"  v-on:getStartTime="getStartTime"></date-picker>
            <dl>
              <dd><button @click="search()" class="btn btn-blue">查询</button></dd>
            </dl>
          </form>
        </search-bar>

      </panel-wrap>
      <panel-wrap class="panelWrap2">

        <ul class="action-list">
          <li><router-link to="/timetable/upload" class="btn btn-blue">上传新文件</router-link></li>
        </ul>

        <ui-table :headerArray="headerArray" :style="{minHeight:tableMinHeight}">
            <tbody slot="tbody">
              <tr v-for="data in tableData">
                <td>{{data.version}}</td>
                <td>{{data.verInfo}}</td>
                <td>{{data.opUserName}}</td>
                <td>{{data.opTime | date('YYYY-MM-DD HH:mm:ss')}}</td>
                <td>
                  <!--<router-link class="blue-fontIcon" title="查看详情" :to="{ name: 'timeTableDetail', params: { id: data.id }}"><i class="iconfont icon-info"></i></router-link>-->
                </td>
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
  .action-list{
    margin-bottom:10px;
    .clearfix();
    li{
      float: left;
      margin-right: 20px;
    }
  }
  .count {
    color:@yellow;
  }
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
                version: '',
                opUserName: '',
                opTime: ''
              },
              headerArray: [
              {name: '版本名称',width:'25%'},
              {name: '版本描述', width:'25%'},
              {name: '上传人'},
              {name: '上传时间' ,width:'20%'},
              {name: '操作',width:'10%'},
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
         this.$http.get('/subwayTime/getLists',{params:{pageNum: page, pageSize: this.pageSize, obj: JSON.stringify(searchObj)}})
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
          this.searchObj.opTime = time;
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

<template>
    <div>
      <panel-wrap class="appVersionSearchBar">
        <search-bar>
          <form @submit.prevent="">
            <dl>
              <dt>版本号:</dt>
              <dd><input  v-model="searchObj.ver"  class="f-input"/></dd>
            </dl>
            <dl>
              <dt>APK简介:</dt>
              <dd><input  v-model="searchObj.apkSynopsis"  class="f-input"/></dd>
            </dl>
            <dl>
              <dt>更新简介:</dt>
              <dd><input  v-model="searchObj.updateSynopsis" class="f-input"/></dd>
            </dl>
            <dl>
              <dt>VersionName:</dt>
              <dd><input  v-model="searchObj.versionName" class="f-input"/></dd>
            </dl>
            <dl>
              <dt>VersionCode:</dt>
              <dd><input  v-model="searchObj.versionCode" class="f-input"/></dd>
            </dl>
            <dl>
              <dt>上传人:</dt>
              <dd><input  v-model="searchObj.opUserName" class="f-input"/></dd>
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
          <li><router-link to="/appVersion/upload" class="btn btn-blue">上传APK</router-link></li>
        </ul>

        <ui-table :headerArray="headerArray" :style="{minHeight:tableMinHeight}">
            <tbody slot="tbody">
              <tr v-for="data in tableData">
                <td>{{data.ver}}</td>
                <td>{{data.apkSynopsis}}</td>
                <td>{{data.updateSynopsis}}</td>
                <td>{{data.versionName}}</td>
                <td>{{data.versionCode}}</td>
                <td>{{data.opUserName}}</td>
                <td>{{data.opTime | date('YYYY-MM-DD HH:mm:ss')}}</td>
                <!--<td><router-link class="blue-fontIcon" title="查看详情" :to="{ name: 'appVersionDetail', params: { id: data.id }}"><i class="iconfont icon-info"></i></router-link></td>-->
              </tr>
              <tr v-if="tableData == ''" class="text-center">
                  <td colspan="8">无数据</td>
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
  .appVersionSearchBar {
    padding-top:0;
    dl {
      margin-top:10px;
    }
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
                ver: '',
                versionName: '',
                versionCode: '',
                opUserName: '',
                updateSynopsis: '',
                apkSynopsis: '',
                opTime: ''
              },
              headerArray: [
              {name: '版本号',width:'15%'},
              {name: 'APK简介', width:'15%'},
              {name: '更新简介'},
              {name: 'VersionName'},
              {name: 'VersionCode'},
              {name: '上传人'},
              {name: '上传时间'}
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
         this.$http.get('/api/apkVersion/getLists',{params:{pageNum: page, pageSize: this.pageSize, obj: JSON.stringify(searchObj)}})
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
        write (t) {
            console.log(t.target.checked);
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

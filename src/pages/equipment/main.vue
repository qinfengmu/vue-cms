<template>
    <div>
      <panel-wrap>
        <search-bar>
          <form @submit.prevent="">
            <dl>
              <dt>系统:</dt>
              <dd><input v-model="searchObj.system" class="f-input" /></dd>
            </dl>
            <dl>
              <dt>系统版本:</dt>
              <dd><input v-model="searchObj.systemVersion" class="f-input" /></dd>
            </dl>
            <dl>
              <dt>型号:</dt>
              <dd><input v-model="searchObj.type" class="f-input" /></dd>
            </dl>
            <dl>
              <dt>名称:</dt>
              <dd><input v-model="searchObj.name" class="f-input" /></dd>
            </dl>
            <dl>
              <dt>设备ID:</dt>
              <dd><input v-model="searchObj.equipmentId" class="f-input" /></dd>
            </dl>
            <dl>
              <dt>手机号:</dt>
              <dd><input v-model="searchObj.phone" class="f-input" /></dd>
            </dl>
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
                <td>{{data.system}}</td>
                <td>{{data.systemVersion}}</td>
                <td>{{data.type}}</td>
                <td>{{data.name}}</td>
                <td>{{data.equipmentId}}</td>
                <td>{{data.phone}}</td>
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
                system: '',
                systemVersion: '',
                name: '',
                type: '',
                equipmentId: '',
                phone: ''
              },
              headerArray: [
              {name: '系统',width:'20%'},
              {name: '系统版本', width:'20%'},
              {name: '型号'},
              {name: '名称'},
              {name: '设备ID'},
              {name: '手机号'}
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
         this.$http.get('/api/equipment/getLists',{params:{pageNum: page, pageSize: this.pageSize, obj: JSON.stringify(searchObj)}})
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
        search (){
          this.getLists(1,this.searchObj);
        },
        getPage (page) {
          this.getLists(page,this.searchObj);
        }
      }
  }
</script>

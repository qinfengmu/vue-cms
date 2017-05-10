<template>
    <div>
      <panel-wrap>
        <search-bar>
          <form @submit.prevent="">
            <dl>
              <dt>元素名称:</dt>
              <dd><input v-model="searchObj.elementName" class="f-input" /></dd>
            </dl>
            <dl>
              <dt>元素编码:</dt>
              <dd><input v-model="searchObj.elementCode" class="f-input" /></dd>
            </dl>
            <dl>
              <dd><button @click="search()" class="btn btn-blue">查询</button></dd>
            </dl>
          </form>
        </search-bar>

      </panel-wrap>
      <panel-wrap class="panelWrap2">
        <ul class="action-list">
          <li><router-link to="/permission/element/add" class="btn btn-blue">添加元素</router-link></li>
        </ul>
        <ui-table :headerArray="headerArray" :style="{minHeight:tableMinHeight}">
            <tbody slot="tbody">
              <tr v-for="data in tableData">
                <td>{{data.elementName}}</td>
                <td>{{data.elementCode}}</td>
                <td>{{data.createTime | date('YYYY-MM-DD HH:mm:ss')}}</td>
                <td>{{data.updateDate | date('YYYY-MM-DD HH:mm:ss')}}</td>
                <td>{{data.operatorName}}</td>
                <td class="action-td">
                  <router-link class="blue-fontIcon" title="查看详情" :to="{ name: 'elementDetail', params: { id: data.elementId }}"><i class="iconfont icon-info"></i></router-link>
                  <router-link class="blue-fontIcon" title="修改" :to="{ name: 'editElement', params: { id: data.elementId }}"><i class="iconfont icon-modify"></i></router-link>
                  <a href="" class="red-fontIcon" title="删除"  @click.prevent="deleted(data)"><i class="iconfont icon-delete"></i></a>
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
  @import "../../../less/mixins";
  @import "../../../less/variables";

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
                elementName: '',
                elementCode: ''
              },
              headerArray: [
              {name: '元素名称',width:'20%'},
              {name: '元素编码', width:'20%'},
              {name: '创建时间'},
              {name: '更新时间'},
              {name: '人员'},
              {name: '操作',width: '10%'},
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
         this.$http.get('/api/permissionElement/getLists',{params:{pageNum: page, pageSize: this.pageSize, obj: JSON.stringify(searchObj)}})
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
         //删除元素
        deleted (data) {
           this.$messageBox.confirm('确定要删除该元素？','提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
              }).then( () => {
                    this.$http.post('/api/permissionElement/delete',{ids: data.elementId})
                   .then( res => {
                       const msg = res.body
                       if(msg.success){
                          this.$message.success({message: '元素删除成功'});
                         this.tableData = _.reject(this.tableData,data);
                         this.tableTotalPage = this.tableTotalPage-1;
                         if(this.tableData.length == 0) {
                            this.search();
                         }
                       }else{
                         this.$message.error({message: '元素删除失败!'});
                       }
                   }, res => {
                      this.$message.error({message: res.statusText });
                   })
              }).catch(() => {});
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

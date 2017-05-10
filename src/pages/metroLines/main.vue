<template>
  <div>
    <ui-panel>
      <span slot="panel-hd">已提交版本</span>
      <div slot="panel-bd">
        <ul class="action-list">
          <li>
            <router-link to="/lines/add" class="btn btn-blue">新建版本</router-link>
          </li>
        </ul>
        <ui-table :headerArray="headerArray">
          <tbody slot="tbody">
          <tr v-for="(data, index) in versionLists">
            <td>{{index+1}}</td>
            <td>{{data.ver}}</td>
            <td>{{data.verName}}</td>
            <td>{{data.verInfo}}</td>
            <td><span class="blueColor">{{data.packSize | storageUnit('KB')}}</span></td>
            <td>{{data.commitTime | date('YYYY-MM-DD HH:mm:ss')}}</td>
            <td class="action-td">
              <router-link class="blue-fontIcon" title="查看详情" :to="{ name: 'lineDetail', params: { id: data.id }}"><i class="iconfont icon-info"></i></router-link>
              <router-link class="blue-fontIcon" title="复制" :to="{ name: 'copyLine', params: { id: data.id }}"><i class="iconfont icon-copy"></i></router-link>
            </td>
          </tr>
          <tr v-if="versionLists == ''" class="text-center">
            <td colspan="6">无数据</td>
          </tr>
          </tbody>
        </ui-table>
        <pagination ref="pagination1" v-if="tableTotalPage > 0" :pages="tableTotalPage" :pageSize="pageSize" v-on:pageChange="getPage"></pagination>
      </div>
    </ui-panel>
    <ui-panel>
      <span slot="panel-hd">草稿版本</span>
      <div slot="panel-bd">
        <ui-table :headerArray="draftHeaderArray">
          <tbody slot="tbody">
          <tr v-for="(data,index) in draftVersionLists">
            <td>{{index+1}}</td>
            <td>{{data.verName}}</td>
            <td>{{data.verInfo}}</td>
            <td>{{data.commitTime | date('YYYY-MM-DD HH:mm:ss')}}</td>
            <td class="action-td">
              <router-link class="blue-fontIcon" title="编辑" :to="{ name: 'editLine', params: { id: data.id }}"><i class="iconfont icon-modify"></i></router-link>
              <router-link class="blue-fontIcon" title="复制" :to="{ name: 'copyLine', params: { id: data.id }}"><i class="iconfont icon-copy"></i></router-link>
              <a href="" class="red-fontIcon" title="删除"  @click.prevent="deleted(data)"><i class="iconfont icon-delete"></i></a>
            </td>
          </tr>
          <tr v-if="draftVersionLists == ''" class="text-center">
            <td colspan="5">无数据</td>
          </tr>
          </tbody>
        </ui-table>
        <pagination ref="pagination2" v-if="draft_tableTotalPage > 0" :pages="draft_tableTotalPage" :pageSize="pageSize" v-on:pageChange="getPage1"></pagination>
      </div>
    </ui-panel>

  </div>

</template>
<style lang="less" scoped>
  @import "../../less/variables";
  @import "../../less/mixins";
</style>
<script>
    import uiPanel from '../../components/uiPanel'
    import uiTable from '../../components/uiTable'
    import addForm from '../../components/addForm'
    import FileUpload from 'vue-upload-component'
    import pagination from '../../components/pagination'
    import { modal,alert } from 'vue-strap'
    import _ from 'lodash'
    export default{
        data(){
            return{
            versionLists: '',
            draftVersionLists: '',
            pageSize: 5,
            tableTotalPage: '',
            draft_tableTotalPage: '',
            headerArray:[
                {name: '版本序号',width:'10%'},
                {name: '版本号',width: '15%'},
                {name: '版本名称',width: '15%'},
                {name: '版本描述'},
                {name: '数据包大小'},
                {name: '提交时间' ,width: '20%'},
                {name: '操作',width:'10%'},
             ]
           }
        },
        components: {
            uiPanel,
            uiTable,
            pagination,
            FileUpload,
            addForm
        },
        computed: {
            draftHeaderArray () {
              return   _.reject(_.reject(this.headerArray,{name: '数据包大小'}),{name: '版本号'});
            }
        },
        created (){

            //初始化读取首页版本列表
            this.getVersionLists(1);
            //初始化读取首页草稿版本列表
            this.getVersionLists(0);

        },
        methods: {

             //定义获取广告列表 state 状态 page： 分页
             getVersionLists (state,page) {
                 this.$http.get('/api/subwayMap/getLists',{params:{pageNum: page || 1, pageSize: this.pageSize, obj: JSON.stringify({ state: state})}})
                 .then( (res) =>{
                    const msg = res.body;
                    if(msg.result.success){

                        if(state == 1){
                            this.versionLists = msg.result.data;
                            this.tableTotalPage = msg.result.total;
                            if(this.$refs.pagination1){
                                this.$refs.pagination1.setPaginationData(page);
                            }
                        }else{
                             this.draftVersionLists = msg.result.data;
                             this.draft_tableTotalPage = msg.result.total;
                             if(this.$refs.pagination2){
                                this.$refs.pagination2.setPaginationData(page);
                             }
                        }
                    }
                 }, res => {
                this.$message.error({message: res.statusText });
             })
             },
             getPage(page){
                  this.getVersionLists(1,page);
             },
             getPage1(page){
                  this.getVersionLists(0,page);
             },
             deleted (data) {
                   this.$messageBox.confirm('确定要删除这个版本？','提示',{
                          confirmButtonText: '确定',
                          cancelButtonText: '取消',
                          type: 'warning'
                   }).then( () => {
                         this.$http.post('/api/subwayMap/delete',{id: data.id})
                         .then( res => {
                             const msg = res.body
                             if(msg.success){
                               this.$message.success({message: '删除成功'});
                               //将data从数组中移除掉
                               this.draftVersionLists = _.reject(this.draftVersionLists,data);
                               this.draft_tableTotalPage = this.draft_tableTotalPage-1;
                               if(this.draftVersionLists.length == 0) {
                                  this.getVersionLists(0);
                               }
                             }else{
                               this.$message.error({message: '删除失败!'});
                             }
                         }, res => {
                            this.$message.error({message: res.statusText });
                         })
                   }).catch(() => {});
             }
        }

    }

</script>

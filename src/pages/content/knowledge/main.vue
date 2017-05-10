<template>
  <div>
    <panel-wrap>
      <search-bar>
        <form @submit.prevent="">
          <dl>
            <dt>标题:</dt>
            <dd><input class="f-input" v-model="searchObj.title"/></dd>
          </dl>
          <dl>
            <dt>分类信息:</dt>
            <dd>

              <select v-model="searchObj.classify" class="f-input">
                <option value="">全部</option>
                <option v-for="opt in classifyArr" :value="opt.id">{{opt.name}}</option>
              </select>
            </dd>
          </dl>

          <dl>
            <dt>显示状态:</dt>
            <dd>
              <select class="f-input" v-model="searchObj.state">
                <option value="">全部</option>
                <option value="false">不可见</option>
                <option value="true">可见</option>
              </select>
            </dd>
          </dl>
          <date-picker labelName="发布时间"  v-on:getStartTime="getStartTime"></date-picker>
          <dl>
            <dd><button @click="search()" class="btn btn-blue">查询</button></dd>
          </dl>
        </form>
      </search-bar>

    </panel-wrap>
    <panel-wrap class="panelWrap2">

      <ul class="action-list">
        <li><router-link to="/content/knowledge/add" class="btn btn-blue">新建内容</router-link></li>
      </ul>

      <ui-table :headerArray="headerArray" :style="{minHeight:tableMinHeight}">
        <tbody slot="tbody">
        <tr v-for="data in tableData">
          <td><img :src="data.imgUrl" height="55" width="99"></td>
          <td>{{data.title}}</td>
          <td>{{ data.classify | classifyTxt(classifyArr)}}</td>
          <td>{{data.sourceInfo}}</td>
          <td>{{data.author}}</td>
          <td>{{data.publishTime | date('YYYY-MM-DD HH:mm:ss')}}</td>
          <td>
            <el-switch
              v-model="data.state"
              on-color="#7AC943"
              off-color="#FA3137"
              on-text="可见"
              off-text="不可见"
              :width="65"
              @change="switchChange(data)">
            </el-switch>
          </td>
          <td class="action-td">
            <router-link class="blue-fontIcon" title="编辑" :to="{ name: 'editKnowledge', params: { id: data.id }}"><i class="iconfont icon-modify"></i></router-link>
            <router-link class="blue-fontIcon" title="查看详情" :to="{ name: 'knowledgeDetail', params: { id: data.id }}"><i class="iconfont icon-info"></i></router-link>
          </td>
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
              searchObj: {
                publishTime: '',
                title: '',
                state: '',
                classify: ''
              },
              headerArray: [
                {name: '封面', width:'15%'},
                {name: '标题',width:'25%'},
                {name: '分类信息'},
                {name: '信息来源'},
                {name: '作者'},
                {name: '发布时间'},
                {name: '显示状态'},
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
          },
         classifyArr () {
            return this.$store.state.classify.knowledgeArr;
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
           this.$http.get('/api/subwayKnowledge/getLists',{params:{pageNum: page, pageSize: this.pageSize, obj: JSON.stringify(searchObj)}})
             .then( (res) =>{
                const msg = res.body;
                if(msg.success){
                  this.tableData = msg.result.data;
                  this.tableTotalPage = msg.result.total;

                  if(this.$refs.pagination){
                      this.$refs.pagination.setPaginationData(page);
                  }
                }else{
                  this.$message.error({message: '查询失败!' });
                }

             }, res => {
                this.$message.error({message: res.statusText });
             })
        },
        getStartTime (time) {
          this.searchObj.publishTime = time;
        },
        switchChange (data) {

          if(!this.firstLoad){
           this.$http.post('/api/subwayKnowledge/updateState',{obj:JSON.stringify({id:data.id,state:data.state,classify:data.classify})})
             .then( res => {
                 const msg = res.body
                 if(msg.success){
                     this.$message.success({message: '操作成功!'});
                 }else{
                    this.$message.error({message: '操作失败!' });
                 }

             }, res => {
              this.$message.error({message: res.statusText });
           })
          }

        },
        search (){
          this.getAdvList(1,this.searchObj);
        },
        getPage (page) {

          this.getAdvList(page,this.searchObj);

        }
      }
  }
</script>

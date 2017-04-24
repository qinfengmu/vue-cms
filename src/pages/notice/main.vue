<template>
    <div>
      <panel-wrap>
        <search-bar>
          <form @submit.prevent="">
            <dl>
              <dt>标题:</dt>
              <dd><input  v-model="searchObj.title" class="f-input"/></dd>
            </dl>            <dl>
              <dt>发布状态:</dt>
            <dd>
              <select class="f-input" v-model="searchObj.state">
                <option value="">全部</option>
                <option value="0">未发布</option>
                <option value="1">已发布</option>
                <option value="2">已下线</option>
              </select>
            </dd>
            </dl>
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
          <li><router-link to="/notice/add" class="btn btn-blue">发布公告</router-link></li>
        </ul>

        <ui-table :headerArray="headerArray" :style="{minHeight:tableMinHeight}">
            <tbody slot="tbody">
              <tr v-for="data in tableData">
                <td>{{data.title}}</td>
                <td><img height="55" width="99" :src="data.imgUrl"></td>
                <td><span :class="stateClass(data.state)">{{data.state | noticeState}}</span></td>
                <td>{{data.isTop == 1 ? '是': '否' }}</td>
                <td>{{data.publishTime | date('YYYY-MM-DD HH:mm:ss')}}</td>
                <td>{{data.offTime | date('YYYY-MM-DD HH:mm:ss')}}</td>
                <td class="action-td">
                  <router-link class="blue-fontIcon" title="查看详情" :to="{ name: 'noticeDetail', params: { id: data.id }}"><i class="iconfont icon-info"></i></router-link>
                  <a href="" v-if="data.state == 1 && data.isTop == 0"  title="置顶" class="blue-fontIcon" @click.prevent="toTop(data)" ><i class="iconfont icon-up"></i></a>
                  <a href="" v-else-if="data.state == 1 && data.isTop == 1" title="取消置顶" class="blue-fontIcon" @click.prevent="offTop(data)" ><i class="iconfont icon-down" style="font-size:24px"></i></a>
                  <a href="" class="red-fontIcon" title="删除" @click.prevent="deleted(data)"><i class="iconfont icon-delete"></i></a>
                </td>
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
              searchObj: {
                publishTime: '',
                publishType: '',
                offTime: '',
                title: '',
                state: ''
              },
              headerArray: [
              {name: '标题',width:'20%'},
              {name: '封面', width:'20%'},
              {name: '发布状态'},
              {name: '是否置顶'},
              {name: '发布时间'},
              {name: '下线时间'},
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
         this.$http.get('/api/notice/getLists',{params:{pageNum: page, pageSize: this.pageSize, obj: JSON.stringify(searchObj)}})
           .then( (res) =>{
              const msg = res.body;
              if(msg.success){
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
          this.getLists(1,this.searchObj);
        },
        getPage (page) {
          this.getLists(page,this.searchObj);
        },
        //删除公告
        deleted (data) {
           this.$messageBox.confirm('确定要删除这条公告？','提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
              }).then( () => {
                    this.$http.post('/api/notice/delete',{id: data.id})
                   .then( res => {
                       const msg = res.body
                       if(msg.success){
                          this.$message.success({message: '公告删除成功'});
                         this.tableData = _.reject(this.tableData,data);
                         this.tableTotalPage = this.tableTotalPage-1;
                         if(this.tableData.length == 0) {
                            this.search();
                         }
                       }else{
                         this.$message.error({message: '删除失败!'});
                       }
                   }, res => {
                      this.$message.error({message: res.statusText });
                   })
              }).catch(() => {});
        },
        //置顶
        toTop (data) {
            this.$http.post('/api/notice/toTop',{id: data.id})
            .then( res => {
                const msg = res.body;
                if(msg.success){
                  this.$message.success({message: '置顶成功'});
                  this.getPage();
                }else{
                  this.$message.error({message: '置顶失败!'});
                }
            }, res => {
              this.$message.error({message: res.statusText });
           })
        },
        offTop (data) {
              this.$http.post('/api/notice/offTop',{id: data.id})
            .then( res => {
                const msg = res.body;
                if(msg.success){
                  this.$message.success({message: '取消置顶成功'});
                  this.getPage();
                }else{
                  this.$message.error({message: '取消置顶失败!'});
                }
            }, res => {
              this.$message.error({message: res.statusText });
           })
        },
         stateClass (state) {
           return state == 1 ? 'blueColor' : 'redColor';
        }
      }
  }
</script>

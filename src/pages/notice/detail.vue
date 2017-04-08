<template>

    <add-form class="w700">
      <ui-table slot="other" class="mb10" :headerArray="headerArray">
        <tbody slot="tbody">
        <tr>
          <td><span class="blueColor">{{data.state | noticeState}}</span></td>
          <td>{{data.publishTime | date('YYYY-MM-DD HH:mm:ss')}}</td>
          <td v-if="data.offType == 0">永不下线</td>
          <td v-else>{{data.offTime | date('YYYY-MM-DD HH:mm:ss')}}</td>
        </tr>

        </tbody>
      </ui-table>
      <div slot="detail">
        <dl>
          <dt>标题内容：</dt>
          <dd class="default">{{data.title}}</dd>
        </dl>
        <dl>
          <dt>文本编辑：</dt>
          <dd class="default">{{data.content}}</dd>
        </dl>
        <dl>
          <dt>封面图片：</dt>
          <dd class="default">
            <img :src="data.imgUrl" width="100" height="60">
          </dd>
        </dl>
        <dl>
          <dt>发布定时：</dt>
          <dd class="default">
            {{data.publishTime | date('YYYY-MM-DD HH:mm:ss')}}<span v-if="data.publishType == 1" style="margin-left:40px">{{data.publishReceiveTime}} 小时内在线设备可以接收到消息</span>
          </dd>
        </dl>
        <dl>
          <dt>下线定时：</dt>
          <dd class="default" v-if="data.offType == 0">永不下线</dd>
          <dd class="default" v-else>{{data.offTime | date('YYYY-MM-DD HH:mm:ss')}}</dd>

        </dl>
        <dl>
          <dt>推送app：</dt>
          <dd class="default">
              {{data.sendToApp == 1 ? '是' : '否'}}
          </dd>
        </dl>
        <div v-if="data.state == 0" class="button-area">
          <a href @click.prevent="publish(1)" class="btn btn-blue">发布</a><router-link v-cloak :to="{ name: 'noticeEdit', params: { id: data.id }}" class="btn btn-blue">编辑</router-link>
        </div>
        <div v-else-if="data.state == 1" class="button-area">
          <a href @click.prevent="publish(2)" class="btn btn-blue">下线</a>
        </div>
      </div>

    </add-form>

</template>
<style lang="less" scoped>
  @import "../../less/mixins";
  @import "../../less/variables";
  .mb10 {
    margin-bottom: 10px;
  }
  .state {
    color: @defaultBlue;
  }
</style>
<script>
import addForm from '../../components/addForm'
import uiTable from '../../components/uiTable'
    export default{
        data(){
            return{
                data:{
                },
                headerArray: [
                  {
                    name: '发布状态'
                  },
                  {
                    name: '发布时间',
                    width: '40%'
                  },
                  {
                    name: '下线时间',
                    width: '40%'
                  }

                ],
            }
        },
        components:{
          addForm,
          uiTable
        },
        created () {
            this.getDetail();
        },
        methods: {
          getDetail () {
             this.$http.get('/api/notice/view',{params:{id: this.$route.params.id}})
             .then( (res) =>{
                 const msg = res.body;
                  if(msg.success){
                    this.data = msg.result;
                  }else{
                    this.$message.error({message: '公告不存在或已被删除!'});
                  }
             })
          },
          publish (state) {
            if(state == 2){
              this.$messageBox.confirm('确定要将此条公告下线？','提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
              }).then( () => {
                  this.publishAjax(state);
              })
            }else{
                this.publishAjax(state);
            }
          },
          publishAjax (state) {

             this.$http.post('/api/notice/updateState',{obj:JSON.stringify({id:this.data.id,state: state})})
            .then( (res) => {

              const msg = res.body;
              if(msg.success){
                  this.$message.success({message: state == 1 ? '发布成功！' : '下线成功！'});
                  this.getDetail();
              }else{
                   this.$message.success({message: state == 1 ? '发布失败！' : '下线失败！'});
              }

            }, res => {
                this.$message.error({message: res.status+'-'+res.statusText });
             })

          }
        }
    }
</script>

<template>

    <add-form class="w700">
      <div slot="detail">
        <dl>
          <dt>消息描述：</dt>
          <dd class="default">{{data.appDescribe}}</dd>
        </dl>
        <dl>
          <dt>标题：</dt>
          <dd class="default">{{data.title}}</dd>
        </dl>
        <dl>
          <dt>消息内容：</dt>
          <dd class="default">{{data.content}}</dd>
        </dl>
        <dl>
          <dt>目标用户：</dt>
          <dd class="default">
              {{data.targetUser == 0 ? '所有人':'-'}}

          </dd>
        </dl>
        <dl>
          <dt>后续动作：</dt>
          <dd class="default">
            {{data.afterOpen | messageAfterOpen}}
            <p v-if="data.action">{{data.action}}</p>
          </dd>
        </dl>
        <dl>
          <dt>创建时间：</dt>
          <dd class="default">
            {{data.createTime | date('YYYY-MM-DD HH:mm:ss')}}
          </dd>
        </dl>  <dl>
          <dt>推送时间：</dt>
          <dd v-if="data.publishType == 0" class="default">
            {{data.publishTime | date('YYYY-MM-DD HH:mm:ss')}}
          </dd>
          <dd v-else class="default">
            {{data.publishTime | date('YYYY-MM-DD HH:mm:ss')}} <span style="margin-left:10px">{{data.publishReceiveTime}}小时内在线设备可以接收到消息</span>
          </dd>
        </dl>

        <dl>
          <dt>提醒方式：</dt>
          <dd class="default">
              <span v-if="data.playLights" style="margin-right:10px">{{data.playLights ? '呼吸灯' : ''}}</span>
              <span v-if="data.playSound" style="margin-right:10px">{{ data.playSound ? '声音' :''}}</span>
              <span v-if="data.playVibrate" style="margin-right:10px">{{data.playVibrate ? '震动' : ''}}</span>
          </dd>
        </dl>

      </div>

    </add-form>

</template>
<style lang="less" scoped>

</style>
<script>
import addForm from '../../components/addForm'
    export default{
        data(){
            return{
                data:{}
            }
        },
        components:{
          addForm
        },
        created () {
            this.getDetail();
        },
        methods: {

          getDetail () {
             this.$http.get('/api/appMessage/view',{params:{id: this.$route.params.id}})
             .then( (res) =>{
                const msg = res.body;
                if(msg.success){
                  this.data = msg.result;
                }else{
                  this.$message.error({message: '消息不存在或已被删除！'})
                }

             }, res => {
                this.$message.error({message: res.statusText });
             })
          },


        }
    }
</script>

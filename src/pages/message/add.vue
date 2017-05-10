<template>

      <add-form class="w705" :isForm="true" v-on:formSubmit="save">

        <div slot="formBody" class="form-body">

          <dl>
            <dt>消息描述：</dt>
            <dd><input  v-model="formObj.appDescribe" class="ipt ipt-large"type="text"/></dd>
          </dl>

          <dl>
            <dt>标题：</dt>
            <dd><input v-model="formObj.title" class="ipt ipt-large"type="text"/></dd>
          </dl>

          <dl>
            <dt>文本编辑：</dt>
            <dd>

              <textarea v-model="formObj.content" class="ipt ipt-large" style="height:200px">

              </textarea>

            </dd>
          </dl>

          <dl>
            <dt>目标用户：</dt>
            <dd>
              <ul class="radio-list">
                <li><input type="radio" v-model="formObj.targetUser" value="0" id="targetUser"><label for="targetUser">全部用户</label></li>
              </ul>

            </dd>
          </dl>
          <dl>
            <dt>后续动作：</dt>
            <dd>

              <ul class="radio-list">
                <li><input type="radio"  v-model="formObj.afterOpen" value="0" id="afterOpen1"><label for="afterOpen1">打开应用</label></li>
                <li><input type="radio"  v-model="formObj.afterOpen" value="1" id="afterOpen2"><label for="afterOpen2">打开链接</label></li>
                <li><input type="radio"  v-model="formObj.afterOpen" value="2" id="afterOpen3"><label for="afterOpen3">打开指定页面</label></li>
                <li><input type="radio"  v-model="formObj.afterOpen" value="3" id="afterOpen4"><label for="afterOpen4">自定义行为</label></li>
              </ul>
              <div v-show="formObj.afterOpen != 0" class="showTime">
                  <input  v-model="formObj.action" class="ipt" style="width:400px" type="text"/>
              </div>

            </dd>
          </dl>
          <dl>
            <dt>推送时间：</dt>
            <dd>

              <ul class="radio-list">
                <li><input type="radio" v-model="formObj.publishType"  @change="setPublishTime" value="0" id="publishType1"><label for="publishType1">立即推送</label></li>
                <li><input type="radio" v-model="formObj.publishType" value="1" id="publishType2"><label for="publishType2">定时推送</label></li>
              </ul>
              <div v-show="formObj.publishType == 1" class="showTime">
                <el-date-picker
                  v-model="formObj.publishTime"
                  type="datetime"
                  placeholder="选择推送时间">
                </el-date-picker>
                <!--@change="datePickerChange"-->
                <input v-model="formObj.publishReceiveTime" class="ipt ipt-small"><span>小时内在线设备可以接收到消息</span>
              </div>

            </dd>
          </dl>
          <dl>
            <dt>提醒方式：</dt>
            <dd>
              <ul class="radio-list">
                <li><input type="checkbox" v-model="formObj.playSound"  id="playSound"><label for="playSound">声音</label></li>
                <li><input type="checkbox" v-model="formObj.playVibrate"  id="playVibrate"><label for="playVibrate">震动</label></li>
                <li><input type="checkbox" v-model="formObj.playLights"  id="playLights"><label for="playLights">呼吸灯</label></li>
              </ul>
            </dd>
          </dl>
        </div>
        <div  class="button-area" slot="buttonArea">
          <button type="submit" class="btn btn-blue">推送</button>
          <router-link to="/notice" class="btn btn-red" replace>取消</router-link>
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
                formObj: {
                    appDescribe: '',
                    title: '',
                    content: '',
                    targetUser: 0,
                    afterOpen: 0,
                    action: '',
                    publishType: 0,
                    publishTime: '',
                    publishReceiveTime: '',
                    playVibrate: true,
                    playLights: true,
                    playSound: true
                }

            }
        },
        components:{
          addForm
        },
        computed: {
           isCopy () {
               return this.$route.name == 'copyMessage';
            },
        },
        created () {
          if(this.isCopy){
              this.getView();
          }
        },
        methods: {

            save () {

                  if(this.formObj.appDescribe == '' || this.formObj.title == '' || this.formObj.content == ''){
                      this.$message.error({message: '推送信息内容不完整!'});
                      return;
                  }
                  if(this.formObj.publishType == 1 && (this.formObj.publishTime == '' || this.formObj.publishReceiveTime == '')){
                      this.$message.error({message: '请输入推送时间和接收时间！'});
                      return;
                  } else {
                      this.formObj.publishTime = new Date(this.formObj.publishTime).getTime();
                  }

                  if(this.formObj.publishTime != '' && this.formObj.publishTime < new Date().getTime()){
                      this.$message.error({message: '下线时间不能早于当前时间!' });
                      return;
                  }

                 this.$http.post('/api/appMessage/insert',{obj:JSON.stringify(this.formObj)})
                 .then( res => {
                     const msg = res.body
                     if(msg.success){
                        this.$message.success({message:'推送成功！'});
                        this.$router.replace('/message');
                     }else{
                        this.$message.success({message:'推送失败！'});
                     }

                 }, res => {
                    this.$message.error({message: res.statusText });
                 })

            },
            getView () {
                 this.$http.get('/api/appMessage/copyAppMessage',{params:{id: this.$route.params.id}})
                 .then( (res) =>{
                    const msg = res.body;
                    if(msg.success){
                      this.formObj = msg.result;
                    }else{
                      this.$message.error({message: '消息不存在或已被删除！'})
                    }

                 }, res => {
                    this.$message.error({message: res.statusText });
                 })
            },
            //选择立即发送时，清空定时发送时间
            setPublishTime () {
                if(this.formObj.publishType == 0){
                  this.formObj.publishTime = '';
                  this.formObj.publishReceiveTime = '';
                }
            },


        }
    }
</script>

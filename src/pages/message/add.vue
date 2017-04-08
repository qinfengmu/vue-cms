<template>

      <add-form class="w700" :isForm="true" v-on:formSubmit="save">

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

            </dd>
          </dl>
          <dl>
            <dt>推送时间：</dt>
            <dd>

              <ul class="radio-list">
                <li><input type="radio" v-model="formObj.publishType" value="0" id="publishType1"><label for="publishType1">立即推送</label></li>
                <li><input type="radio" v-model="formObj.publishType" value="1" id="publishType2"><label for="publishType2">定时推送</label></li>
              </ul>
              <div v-show="formObj.publishType == 1" class="showTime">
                <input v-model="formObj.publishTime" class="ipt ipt-medium"><input v-model="formObj.publishReceiveTime" class="ipt ipt-small"><span>小时内在线设备可以接收到消息</span>
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
          <!--<dl>-->
            <!--<dt>通知栏：</dt>-->
            <!--<dd>-->
              <!--<ul class="radio-list">-->
                <!--<li><input type="checkbox"  value="1" id="send112"><label for="send112">显示</label></li>-->

              <!--</ul>-->

            <!--</dd>-->
          <!--</dl>-->

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
                    playVibrate: false,
                    playLights: false,
                    playSound: false,
                }

            }
        },
        components:{
          addForm
        },
        methods: {

          save () {
           this.$http.post('/api/appMessage/insert',{obj:JSON.stringify(this.formObj)})
           .then( res => {
               const msg = res.body
               if(msg.result.success){
                  alert('添加成功!')
               }else{
                  alert('添加失败!')
               }

           }, res => {
                this.$message.error({message: res.status+'-'+res.statusText });
             })

          }


        }
    }
</script>

<template>
      <add-form  class="w700" :isForm="true" v-on:formSubmit="save">

        <div slot="formBody" class="form-body">

          <dl>
            <dt>商户名称：</dt>
            <dd><input v-model="formObj.name" class="ipt ipt-large"type="text"/></dd>
          </dl>
          <dl>
            <dt>广告分类：</dt>
            <dd>
              <select v-model="formObj.type" class="ipt ipt-large">

                <option value="1">1</option>
                <option value="2">2</option>

              </select>
            </dd>
          </dl>
          <dl>
            <dt>广告描述：</dt>
            <dd><input v-model="formObj.adDescribe" class="ipt ipt-large"type="text"/></dd>
          </dl>
          <dl>
            <dt>展示图片：</dt>
            <dd>
              <div class="upload-area">
                <img v-if="formObj.imgUrl" width="198" height="110" :src="imgUrl">
                <file-upload
                  class="upload-img-btn"
                  :post-action="uploadBtn.postAction"
                  :name="uploadBtn.name"
                  :accept="uploadBtn.accept"
                  :extensions="uploadBtn.extensions"
                  :drop="uploadBtn.drop"
                  :auto="uploadBtn.auto"
                  :multiple="uploadBtn.multiple"
                  :size="uploadBtn.size"
                  :title="uploadBtn.title"
                  :events="uploadBtn.events"
                  v-on:fileUpload="fileUpload"
                  :data="uploadBtn.data">

                </file-upload>
              </div>
            </dd>
          </dl>
          <!--<dl>-->
            <!--<dt>发布定时：</dt>-->
            <!--<dd>-->
              <!--<ul class="radio-list">-->
                <!--<li><input type="radio" v-model="picked" value="1" id="send1"><label for="send1">立即推送</label></li>-->
                <!--<li><input type="radio" v-model="picked" value="2" id="send2"><label for="send2">定时推送</label></li>-->
              <!--</ul>-->
              <!--<div v-show="picked == 2" class="showTime">-->
                <!--<input class="ipt ipt-medium"><input class="ipt ipt-small"><span>小时内在线设备可以接收到消息</span>-->
              <!--</div>-->
            <!--</dd>-->
          <!--</dl>-->
          <!--<dl>-->
            <!--<dt>下线定时：</dt>-->
            <!--<dd>-->
              <!--<ul class="radio-list">-->
                <!--<li><input type="radio" v-model="offLinePicked" value="1" id="offLinePicked1"><label for="offLinePicked1">立即推送</label></li>-->
                <!--<li><input type="radio" v-model="offLinePicked" value="2" id="offLinePicked2"><label for="offLinePicked2">定时推送</label></li>-->
              <!--</ul>-->
              <!--<div v-show="offLinePicked == 2" class="showTime">-->
                <!--<input class="ipt ipt-medium"><input class="ipt ipt-small"><span>小时内在线设备可以接收到消息</span>-->
              <!--</div>-->
            <!--</dd>-->
          <!--</dl>-->
          <!--<dl>-->
            <!--<dt>目标用户：</dt>-->
            <!--<dd>-->
              <!--<ul class="radio-list">-->
                <!--<li><input type="radio"  value="1" id="allUser"><label for="allUser">全部用户</label></li>-->
              <!--</ul>-->
            <!--</dd>-->
          <!--</dl>-->
          <!--<dl>-->
            <!--<dt>后续动作：</dt>-->
            <!--<dd>-->
              <!--<ul class="radio-list">-->
                <!--<li><input type="radio"  v-model="actionPiked" value="1" id="action1"><label for="action1">打开应用</label></li>-->
                <!--<li><input type="radio"  v-model="actionPiked" value="2" id="action2"><label for="action2">打开链接</label></li>-->
                <!--<li><input type="radio"  v-model="actionPiked" value="3" id="action3"><label for="action3">打开指定页面</label></li>-->
                <!--<li><input type="radio"  v-model="actionPiked" value="4" id="action4"><label for="action4">自定义行为</label></li>-->
              <!--</ul>-->
            <!--</dd>-->
          <!--</dl>-->
          <!--<dl>-->
            <!--<dt>推送时间：</dt>-->
            <!--<dd>-->

              <!--<ul class="radio-list">-->
                <!--<li><input type="radio" v-model="sendTimePicked" value="1" id="send11"><label for="send11">立即推送</label></li>-->
                <!--<li><input type="radio" v-model="sendTimePicked" value="2" id="send21"><label for="send21">定时推送</label></li>-->
              <!--</ul>-->
              <!--<div v-show="sendTimePicked == 2" class="showTime">-->
                <!--<input class="ipt ipt-medium"><input class="ipt ipt-small"><span>小时内在线设备可以接收到消息</span>-->
              <!--</div>-->

            <!--</dd>-->
          <!--</dl>-->
          <!--<dl>-->
            <!--<dt>提醒方式：</dt>-->
            <!--<dd>-->
              <!--<ul class="radio-list">-->
                <!--<li><input type="checkbox"  value="1" id="send111"><label for="send111">声音</label></li>-->
                <!--<li><input type="checkbox" value="2" id="send211"><label for="send211">震动</label></li>-->
                <!--<li><input type="checkbox" value="2" id="send212"><label for="send212">呼吸灯</label></li>-->
              <!--</ul>-->
            <!--</dd>-->
          <!--</dl>-->
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
import FileUpload from 'vue-upload-component'
import imgSize from '../../util/imgSize'
    export default{
        data(){
            return{

                formObj: {
                    name: '',
                    type: '1',
                    info: '',
                    imgUrl: ''
                },
                imgUrl: '',
                picked: 1,
                offLinePicked: 1,
                actionPiked: 1,
                sendTimePicked: 1,
                uploadBtn: {
                    accept: 'image/jpg,image/jpeg,image/png',
                    size: 1024 * 1024 * 10,
                    multiple: false,
                    extensions: 'gif,jpg,png',
                    files: [],
                    upload: {},
                    title: '上传图片',
                    drop: false,
                    auto: true,
                    thread: 1,
                    name: 'file',
                    data: {type: "adv"},
                    postAction: '/file/upload',
                    events: {
                        add(file, component) {
                            //component.active = true;
                            file.headers['X-Filename'] = encodeURIComponent(file.name)
                            file.data.finename = file.name
                            imgSize(this,file,component);
                          },
                          progress(file, component) {
                           // console.log('progress ' + file.progress);
                          },
                          after(file, component) {
                            this.$emit('fileUpload',file.response);
                           // console.log('after');
                          },
                          before(file, component) {
                            //console.log('before');
                          }
                    }
                  }
            }
        },
        components:{
          addForm,
          FileUpload
        },
        methods: {

          save () {
           this.$http.post('/advertisement/insert',{obj:JSON.stringify(this.formObj)})
           .then( res => {
               const msg = res.body
               if(msg.result.success){
               this.$message.success({
                  message: '添加成功'
                });

                this.$router.replace('/adv');
               }else{
               this.$message.error({
                  message: '添加失败'
                });
               }
           }, res => {
              this.$message.error({message: res.status+'-'+res.statusText });
           })

          },
          fileUpload (res) {

            if(res.filePath){
                this.formObj.imgUrl = res.filePath;
                this.imgUrl = res.path;
            }else{
               this.$message.error({
                  message: '图片上传失败'
                });
            }

          }


        }
    }
</script>

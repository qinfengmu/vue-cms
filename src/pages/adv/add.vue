<template>
      <add-form  class="w700" :isForm="true" v-on:formSubmit="save">

        <div slot="formBody" class="form-body">

          <dl>
            <dt>商户名称：</dt>
            <dd><input v-model="formObj.name" class="ipt ipt-large"type="text"/></dd>
          </dl>
          <!--<dl>-->
            <!--<dt>广告分类：</dt>-->
            <!--<dd>-->
              <!--<select v-model="formObj.type" class="ipt ipt-large">-->

                <!--<option value="1">1</option>-->
                <!--<option value="2">2</option>-->

              <!--</select>-->
            <!--</dd>-->
          <!--</dl>-->
          <dl>
            <dt>广告描述：</dt>
            <dd><input v-model="formObj.info" class="ipt ipt-large"type="text"/></dd>
          </dl>
          <dl>
            <dt>广告地址：</dt>
            <dd><input v-model="formObj.url" placeholder="例如：http://xxx.xxx.xxx" class="ipt ipt-large"type="text"/></dd>
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
          <dl>
            <dt>发布时间：</dt>
            <dd>
              <ul class="radio-list">
                <li><input type="radio" v-model="formObj.publishType" value="0" id="publishType1"><label for="publishType1">立即发布</label></li>
                <li><input type="radio" v-model="formObj.publishType" value="1" id="publishType2"><label for="publishType2">定时发布</label></li>
              </ul>
              <div v-show="formObj.publishType == 1" class="showTime">
                <el-date-picker
                  v-model="formObj.publishTime"
                  type="datetime"
                  :picker-options="pickerOptions"
                  placeholder="选择发布时间">
                </el-date-picker>
              </div>
            </dd>
          </dl>
          <dl>
            <dt>下线定时：</dt>
            <dd>
              <el-date-picker
                v-model="formObj.offTime"
                type="datetime"
                :picker-options="pickerOptions"
                placeholder="选择下线时间">
              </el-date-picker>
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
          <!--<dl>-->
            <!--<dt>后续动作：</dt>-->
            <!--<dd>-->
              <!--<ul class="radio-list">-->
                <!--<li><input type="radio"  v-model="formObj.afterOpen" value="0" id="afterOpen1"><label for="afterOpen1">打开应用</label></li>-->
                <!--<li><input type="radio"  v-model="formObj.afterOpen" value="1" id="afterOpen2"><label for="afterOpen2">打开链接</label></li>-->
                <!--<li><input type="radio"  v-model="formObj.afterOpen" value="2" id="afterOpen3"><label for="afterOpen3">打开指定页面</label></li>-->
                <!--<li><input type="radio"  v-model="formObj.afterOpen" value="3" id="afterOpen4"><label for="afterOpen4">自定义行为</label></li>-->
              <!--</ul>-->
              <!--<div v-show="formObj.afterOpen != 0" class="showTime">-->
                <!--<input  v-model="formObj.action" class="ipt" style="width:400px" type="text"/>-->
              <!--</div>-->
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

      </add-form>

</template>
<style lang="less" scoped>

</style>
<script>
import addForm from '../../components/addForm'
import FileUpload from 'vue-upload-component'
import imgSize from '../../util/imgSize'
import patterns from '../../util/patterns'
    export default{
        data(){
            return{
                pickerOptions: {
                  disabledDate(time) {
                    return time.getTime() < new Date().getTime() - 8.64e7 ;
                  }
                },
                formObj: {
                    name: '',
                    //type: '1',
                    info: '',
                    imgUrl: '',
                    url: '',
                    publishType: 0,
                    publishTime: '',
                    offTime: '',
                    targetUser: 0,
                    afterOpen: 0,
                    action: '',
                    playVibrate: true,
                    playLights: true,
                    playSound: true
                },
                imgUrl: '',
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

                if(this.formObj.name == '' || this.formObj.info == '' || this.formObj.url == '' ||  this.formObj.imgUrl == ''){
                     this.$message.error({ message: '信息不完整！'});
                     return;
                }

                if(!patterns.url(this.formObj.url)){
                     this.$message.error({ message: '广告地址格式不正确，请重新输入！'});
                     return;
                }

                if(this.formObj.publishType == 1 && this.formObj.publishTime == ''){
                      this.$message.error({ message: '请选择定时发布时间！'});
                      return;
                }

                if(this.formObj.publishType == 1 && this.formObj.publishTime != '' && this.formObj.offTime != ''){
                       this.$message.error({ message: '下线时间不能早于发布时间！'});
                       return;
                }


                this.formObj.publishTime = new Date(this.formObj.publishTime).getTime();
                this.formObj.offTime = new Date(this.formObj.offTime).getTime();

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
                    this.$message.error({message: res.statusText });
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

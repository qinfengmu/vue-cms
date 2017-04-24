<template>
    <div class="w700">
      <add-form :isForm="true" v-on:formSubmit="save">

        <div slot="formBody" class="form-body">

          <dl class="dl2">
            <dt>设备类型：</dt>
            <dd>
              <select v-model="formObj.deviceType" class="ipt ipt-medium">
                <option value="GA">安卓</option>
                <option value="AI">苹果</option>
              </select>
            </dd>
          </dl>

          <dl class="dl2" v-if="formObj.deviceType == 'GA'">
            <dt>APK上传：</dt>
            <dd style="width:550px;">
              <div class="upload-area">
                <span class="pull-left" style="margin-right:10px;">{{fileName}}</span>
                <file-upload
                  class="upload-img-btn"
                  :post-action="uploadBtn.postAction"
                  :name="uploadBtn.name"
                  :accept="uploadBtn.accept"
                  :extensions="uploadBtn.extensions"
                  :drop="uploadBtn.drop"
                  :auto="uploadBtn.auto"
                  :multiple="uploadBtn.multiple"
                  :data="uploadBtn.data"
                  :size="uploadBtn.size"
                  :title="uploadBtn.title"
                  :events="uploadBtn.events"
                  v-on:fileUpload = "fileUpload"
                  v-on:fileProgress = "fileProgress"
                ></file-upload>
              </div>
              <el-progress v-if="showProgress"  :percentage="progress"></el-progress>
            </dd>
          </dl>
          <dl v-else class="dl2">
            <dt>appStore地址:</dt>
            <dd><input  v-model="formObj.appStoreUrl" placeholder="请输入app商店地址" class="ipt ipt-large" type="text"/></dd>
          </dl>
          <dl class="dl2">
            <dt>版本名称：</dt>
            <dd v-if="formObj.deviceType == 'GA'"><input  v-model="formObj.versionName" class="ipt ipt-large disabled"  type="text" readonly/></dd>
            <dd v-else><input  v-model="formObj.iosVersionName" class="ipt ipt-large"  type="text"/></dd>

          </dl>
          <dl class="dl2">
            <dt>版本Code：</dt>
            <dd  v-if="formObj.deviceType == 'GA'"><input  v-model="formObj.versionCode" class="ipt ipt-large disabled" type="text" readonly/></dd>
            <dd  v-else><input  v-model="formObj.iosVersionCode" class="ipt ipt-large" type="text"/></dd>
          </dl>
          <dl class="dl2">
            <dt>是否强制更新:</dt>
            <dd>
              <select v-model="formObj.isForceUpgrade" class="ipt ipt-medium">
                <option value="0">否</option>
                <option value="1">是</option>
              </select>
            </dd>
          </dl>
          <dl class="dl2">
            <dt>APP简介：</dt>
            <dd><input  v-model="formObj.apkSynopsis" class="ipt ipt-large" type="text"/></dd>
          </dl>
          <dl class="dl2">
            <dt>更新简介：</dt>
            <dd><input  v-model="formObj.updateSynopsis" class="ipt ipt-large" type="text"/></dd>
          </dl>
        </div>

      </add-form>
    </div>
</template>
<style lang="less" scoped>
</style>
<script>
import addForm from '../../components/addForm'
import FileUpload from 'vue-upload-component'
    export default{
        data(){
            return{
               fileName: '',
               progress: 0,
               showProgress: false,
                formObj: {
                    deviceType: 'GA',
                    updateSynopsis: '',
                    apkSynopsis: '',
                    filePath: '',
                    versionName: '',
                    versionCode: '',
                    appStoreUrl: '',
                    increasePath: '',
                    iosVersionName: '',
                    iosVersionCode: '',
                    isForceUpgrade: 0
                },
                uploadBtn: {
                    accept: '',
                    size: 1024 * 1024 * 50,
                    multiple: false,
                    extensions: 'apk',
                    files: [],
                    upload: {},
                    title: '上传文件',
                    drop: false,
                    auto: true,
                    thread: 1,
                    name: 'file',
                    data: {type: "apk"},
                    postAction: '/file/upload',
                    events: {
                        add(file, component) {
                           if(file.file.name.lastIndexOf('.apk') < 0){
                              this.$message.error({message:'请选择apk文件！'});
                              return;
                           }
                            component.active = true;
                            file.headers['X-Filename'] = encodeURIComponent(file.name)
                            file.data.finename = file.name

                          },
                          progress(file, component) {
                               this.$emit('fileProgress',file.progress)
                          },
                          after(file, component) {
                              this.$emit('fileUpload',file)
                          },
                          before(file, component) {

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

            if(this.formObj.deviceType == 'GA'){
                if(this.formObj.filePath == ''){
                    this.$message.error({message: '请上传apk文件!' });
                    return;
                }
            }else{
                if(this.formObj.appStoreUrl == '' ){
                    this.$message.error({message: '请输入app商店地址!' });
                    return;
                }else if(this.formObj.iosVersionName == '' ){
                    this.$message.error({message: '请输入版本名称!' });
                    return;
                }else if(this.formObj.iosVersionCode == '' ) {
                    this.$message.error({message: '请输入版本code!' });
                    return;
                }
            }

            if(this.formObj.updateSynopsis == '' || this.formObj.updateSynopsis == '' ) {
                this.$message.error({message: '请填写app简介和更新简介!' });
                return;
            }

            if(this.formObj.deviceType == 'GA'){
                this.formObj.appStoreUrl = '';
            }else{
                this.formObj.filePath = '';
                this.formObj.increasePath = '';
            }


             this.$http.post('/api/apkVersion/insert',{obj:JSON.stringify(this.formObj)})
             .then( res => {
                const msg = res.body
                if(msg.success){
                   this.$message.success({message: '保存成功!' });

                  this.$router.replace('/appVersion');
                }else{
                 this.$message.error({message: '保存失败!' });
                }
             }, res => {
                this.$message.error({message: res.statusText });
             })

          },
          fileUpload (file) {

               if(file.response.success){

                  this.formObj.filePath = file.response.filePath;
                  this.formObj.increasePath = file.response.increasePath;
                  this.formObj.versionCode = file.response.versionCode;
                  this.formObj.versionName = file.response.versionName;
                  this.fileName = file.file.name;

               }else{
                    this.$message.error({message: file.response.msg || '上传失败！' });
               }

               this.showProgress = false;

          },
          fileProgress (p) {
              this.showProgress = true;
              this.progress = Number(p);
          }


        }
    }
</script>

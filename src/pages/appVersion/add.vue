<template>
    <div class="w700">
      <add-form :isForm="true" v-on:formSubmit="save">

        <div slot="formBody" class="form-body">

          <dl class="dl2">
            <dt>版本号：</dt>
            <dd><input v-model="formObj.ver" class="ipt ipt-large"type="text"/></dd>
          </dl>

          <dl class="dl2">
            <dt>APK简介：</dt>
            <dd><input  v-model="formObj.apkSynopsis" class="ipt ipt-large"type="text"/></dd>
          </dl>
          <dl class="dl2">
            <dt>更新简介：</dt>
            <dd><input  v-model="formObj.updateSynopsis" class="ipt ipt-large"type="text"/></dd>
          </dl>
          <dl class="dl2">
            <dt>versionName：</dt>
            <dd><input  v-model="formObj.versionName" class="ipt ipt-large"type="text"/></dd>
          </dl>
          <dl class="dl2">
            <dt>versionCode：</dt>
            <dd><input  v-model="formObj.versionCode" class="ipt ipt-large"type="text"/></dd>
          </dl>
          <dl class="dl2">
            <dt>APK上传：</dt>
            <dd>
              <div class="upload-area">
                <span class="pull-left">{{fileName}}</span>
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
                ></file-upload>
              </div>
            </dd>
          </dl>


        </div>

      </add-form>
    </div>
</template>
<style lang="less" scoped>
 .upload-area{

   line-height:36px;

 }
</style>
<script>
import addForm from '../../components/addForm'
import FileUpload from 'vue-upload-component'
    export default{
        data(){
            return{
               fileName: '',
                formObj: {
                    ver: '',
                    updateSynopsis: '',
                    apkSynopsis: '',
                    filePath: '',
                    versionName: '',
                    versionCode: '',
                },
                uploadBtn: {
                    accept: '',
                    size: 1024 * 1024 * 10,
                    multiple: false,
                    extensions: '',
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

                            component.active = true;
                            file.headers['X-Filename'] = encodeURIComponent(file.name)
                            file.data.finename = file.name

                          },
                          progress(file, component) {

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
            console.log(this.formObj)
            if(this.formObj.ver == '' || this.formObj.updateSynopsis == '' || this.formObj.apkSynopsis == '' || this.formObj.filePath == '') {
                this.$message.error({message: '信息不完整!' });
                return;
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
                this.$message.error({message: res.status+'-'+res.statusText });
             })

          },
          fileUpload (file) {

           if(file.response.filePath){
                this.formObj.filePath = file.response.filePath;
                this.fileName = file.file.name;
            }else{
                this.$message.error({message: 'apk上传失败，请重新上传！' });
            }

          }


        }
    }
</script>

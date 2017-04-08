<template>
      <add-form class="w700" :isForm="true" v-on:formSubmit="save">

        <div slot="formBody" class="form-body">

          <dl>
            <dt>版本号：</dt>
            <dd><input v-model="formObj.version" class="ipt ipt-large"type="text"/></dd>
          </dl>

          <dl>
            <dt>版本描述：</dt>
            <dd><input v-model="formObj.verInfo" class="ipt ipt-large"type="text"/></dd>
          </dl>
          <dl>
            <dt>时刻表：</dt>
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
                formObj: {
                    version: '',
                    verInfo: '',
                    filePath: ''
                },
                uploadBtn: {
                    accept: '.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
                    size: 1024 * 1024 * 10,
                    multiple: false,
                    extensions: 'xls,xlsx,csv',
                    files: [],
                    upload: {},
                    title: '上传文件',
                    drop: false,
                    auto: true,
                    thread: 1,
                    name: 'file',
                    data: {type: "t"},
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
           this.$http.post('/subwayTime/insert',{obj:JSON.stringify(this.formObj)})
           .then( res => {
              const msg = res.body
              if(msg.result.success){
                  this.$message.success({message: '时刻表添加成功' });
                this.$router.replace('/timetable');
              }else{
                 this.$message.error({message: '时刻表添加失败' });

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
              this.$message.error({message: '时刻表上传失败，请重新上传！' });
            }

          }
        }
    }
</script>

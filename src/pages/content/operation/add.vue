<template>
    <add-form class="w705" :isForm="true" v-on:formSubmit="save">

      <div slot="formBody" class="form-body">
        <dl class="dl2">
          <dt>标题：</dt>
          <dd><input v-model="formObj.title" class="ipt ipt-large" type="text"/></dd>
        </dl>
        <dl class="dl2">
          <dt>封面图片：</dt>
          <dd>
            <div class="upload-area">
              <img v-if="formObj.imgPath" width="198" height="110" :src="imgUrl">
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
        <dl class="dl2">
          <dt>信息来源：</dt>
          <dd><input v-model="formObj.sourceInfo" class="ipt ipt-large" type="text"/></dd>
        </dl>
        <dl class="dl2">
          <dt>作者：</dt>
          <dd><input v-model="formObj.author" class="ipt ipt-large" type="text"/></dd>
        </dl>
        <dl class="dl2">
          <dt>显示状态：</dt>
          <dd>
            <ul class="radio-list">
              <li><input type="radio" v-model="formObj.state" value="true"
                         id="statePicked1"><label for="statePicked1">可见</label></li>
              <li><input type="radio" v-model="formObj.state" value="false" id="statePicked2"><label
                for="statePicked2">不可见</label></li>
            </ul>
          </dd>
        </dl>
        <dl class="dl2">
          <dt><input value="0" v-model="formObj.type" @change="setContentType" type="radio" id="urlRd"><label
            for="urlRd">内容页链接</label></dt>
          <dd>
            <input v-model="formObj.url" :readonly="formObj.type==1" placeholder="例如：http://xxx.xxx.xxx" class="ipt ipt-large"
                   :class="{ disabled : formObj.type==1 }" type="text"/>
            <!--<p class="nreq">*非必填</p>-->
          </dd>
        </dl>
        <dl class="dl2">
          <dt><input value="1" @change="setContentType" v-model="formObj.type" type="radio" id="contentRd"><label
            for="contentRd">文本编辑：</label></dt>
          <dd style="padding-left:0">
            <div class="edit-area">
              <u-editor :value="editorValue" :config="config" @contentChange="contentChange" @ready="editorReady"></u-editor>
            </div>
          </dd>
        </dl>
      </div>
      <div  class="button-area" slot="buttonArea">
        <button type="submit" class="btn btn-blue">发布</button>
        <router-link to="/content/operation" class="btn btn-red" replace>取消</router-link>
      </div>

    </add-form>
</template>
<style lang="less" scoped>
  @import "../../../less/mixins";
  @import "../../../less/variables";

  input[type="radio"] {

    vertical-align: middle;
    margin: 0;

  }

  .mb20 {
    margin-bottom: 20px;
  }

  .nreq {
    color: @red;
    margin: 3px 0 0 0;
  }

  .state {
    color: @defaultBlue;
  }
</style>
<script>
import addForm from '../../../components/addForm'
import uEditor from '../../../components/ueditor'
import patterns from '../../../util/patterns'
import FileUpload from 'vue-upload-component'

    export default{
        data(){
            return{
                editorValue: '',
                editor: null,
                config: {
                  initialFrameWidth: null,
                  initialFrameHeight: 320
                },
                formObj: {
                    title: '',
                    imgPath: '',
                    url: '',
                    type: 1,
                    content: '',
                    author: '',
                    sourceInfo: '',
                    state: true
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
                    data: {type: "dynamic"},
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
                            this.$emit('fileUpload',file);
                          },
                          before(file, component) {
                          }
                    }
                }
            }
        },
        components:{

          addForm,
          FileUpload,
          uEditor

        },
        computed: {
            isEdit () {
                return this.$route.name == 'editOperation';
            }
        },
        created (){
            if(this.isEdit){
              this.getView();
            }
        },
        methods: {
          save () {

                if(this.formObj.title == ''){
                    this.$message.error({message: '请输入标题!' });
                    return;
                }else if(this.formObj.author == ''){
                     this.$message.error({message: '请输入作者!' });
                    return;
                }else if(this.formObj.type == 0 && this.formObj.url == ''){
                    this.$message.error({message: '请输入内容页链接!' });
                    return;
                }else if(this.formObj.type == 1 && this.formObj.content == ''){
                    this.$message.error({message: '请输入文本内容!' });
                    return;
                }


                if(this.formObj.type == 0 && this.formObj.url != '' && !patterns.url(this.formObj.url)){
                    this.$message.error({message: '内容页链接格式不正确，请重新输入!' });
                    return;
                }


               const url = this.isEdit ? '/api/serviceDynamic/update' : '/api/serviceDynamic/insert';
               this.$http.post(url,{obj:JSON.stringify(this.formObj)})
               .then( res => {
                   const msg = res.body
                   if(msg.success){
                       this.$message.success({message: '操作成功!'});
                       this.$router.replace('/content/operation');
                   }else{
                      this.$message.error({message: '操作失败!' });
                   }

               }, res => {
                  this.$message.error({message: res.statusText });
               })
          },

          setContentType () {
             if(this.formObj.type == 0){
                //this.formObj.content = '';
                this.editor.setDisabled();
                this.editor.setContent('')

             }else{
                this.formObj.url = '';
                this.editor.setEnabled();
             }
          },

          fileUpload (file) {
              if(file.success){
                  this.formObj.imgPath = file.response.filePath;
                  this.imgUrl = file.response.path;
              }else{
                 this.$message.error({message: '图片上传失败!' });
              }
          },
          contentChange (opts) {
              this.formObj.content = opts.content;
          },
          editorReady (editor) {
              this.editor = editor;
          },
          getView () {
               this.$http.get('/api/serviceDynamic/view',{params:{id: this.$route.params.id}})
               .then( (res) =>{
                  const msg = res.body;
                  if(msg.success){
                      this.formObj = msg.result;
                      this.editorValue = msg.result.content;
                      this.imgUrl = msg.result.imgUrl;
                  }else{
                      this.$message.error({message: '内容不存在或已经被删除！'});
                  }

               }, res => {
                  this.$message.error({message: res.statusText });
               })
          }

        }
    }

</script>

<template>
    <add-form class="w700" :isForm="true" v-on:formSubmit="save">

      <ui-table v-if="isEdit" class="mb20" slot="other" :headerArray="headerArray">
        <tbody slot="tbody">
        <tr>
          <td><span class="blueColor">{{formObj.state | noticeState}}</span></td>
          <td>{{formObj.publishTime | date('YYYY-MM-DD HH:mm:ss')}}</td>
          <td v-if="formObj.offType == 0">永不下线</td>
          <td v-else>{{formObj.offTime | date('YYYY-MM-DD HH:mm:ss')}}</td>
        </tr>

        </tbody>
      </ui-table>
      <div slot="formBody" class="form-body">
        <dl class="dl2">
          <dt>标题内容：</dt>
          <dd><input v-model="formObj.title" class="ipt ipt-large" type="text"/></dd>
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
          <dd>
            <textarea class="ipt ipt-large" v-model="formObj.content" :readonly="formObj.type==0"
                      :class="{ disabled : formObj.type==0 }" style="height:200px"></textarea>
          </dd>
        </dl>

        <dl class="dl2">
          <dt>封面图片：</dt>
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
        <dl class="dl2">
          <dt>发布时间：</dt>
          <dd>
            <ul class="radio-list">
              <li><input type="radio" v-model="formObj.publishType" value="0" @change="setPublishTime" id="send1"><label
                for="send1">立即发布</label></li>
              <li><input type="radio" v-model="formObj.publishType" value="1" id="send2"><label for="send2">定时发布</label>
              </li>
            </ul>
            <div v-if="formObj.publishType == 1" class="showTime">
              <el-date-picker
                v-model="formObj.publishTime"
                type="datetime"
                :picker-options="pickerOptions"
                placeholder="选择发布时间">
              </el-date-picker>
              <input v-model.number="formObj.publishReceiveTime" class="ipt ipt-small"><span>小时内在线设备可以接收到消息</span>

            </div>
          </dd>
        </dl>
        <dl class="dl2">
          <dt>下线时间：</dt>
          <dd>
            <ul class="radio-list">
              <li><input type="radio" v-model="formObj.offType" value="0" @change="setOffTime"
                         id="offLinePicked1"><label for="offLinePicked1">永不下线</label></li>
              <li><input type="radio" v-model="formObj.offType" value="1" id="offLinePicked2"><label
                for="offLinePicked2">定时下线</label></li>
            </ul>
            <div v-if="formObj.offType == 1" class="showTime">
              <el-date-picker
                v-model="formObj.offTime"
                type="datetime"
                :picker-options="pickerOptions"
                placeholder="选择下线时间">
              </el-date-picker>
            </div>
          </dd>
        </dl>
        <dl class="dl2">
          <dt>推送App：</dt>
          <dd>
            <ul class="radio-list">
              <li><input type="checkbox" v-model="formObj.sendToApp" :true-value="1" :false-value="0"
                         id="send112"><label for="send112">推送消息</label></li>

            </ul>

          </dd>
        </dl>

      </div>
      <div  class="button-area" slot="buttonArea">
        <button type="submit" class="btn btn-blue">发布</button>
        <router-link to="/notice" class="btn btn-red" replace>取消</router-link>
      </div>

    </add-form>
</template>
<style lang="less" scoped>
  @import "../../less/mixins";
  @import "../../less/variables";

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
import addForm from '../../components/addForm'
import uiTable from '../../components/uiTable'
import patterns from '../../util/patterns'
import FileUpload from 'vue-upload-component'
    export default{
        data(){
            return{
                myEditor:'myEditor',
                pickerOptions: {
                  disabledDate(time) {
                    return time.getTime() < new Date().getTime() - 8.64e7 ;
                  }
                },
                formObj: {
                    title: '',
                    imgUrl: '',
                    url: '',
                    type: 1,
                    content: '',
                    publishTime: '',
                    publishType: 0,
                    publishReceiveTime: '',
                    offTime: '',
                    offType: 0,
                    offReceiveTime: '',
                    sendToApp: 1,
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
                    data: {type: "notice"},
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
                            this.$emit('fileUpload',file.response);
                          },
                          before(file, component) {
                          }
                    }
                }
            }
        },
        components:{

          addForm,
          uiTable,
          FileUpload

        },
        computed: {
          isEdit () {
            return typeof (this.$route.params.id) != 'undefined' ? true : false
          }
        },
        created (){
           if(this.isEdit){
              this.getDetail();
           }
        },
        methods: {
          save () {

                if(this.formObj.title == ''){
                    this.$message.error({message: '请输入标题!' });
                    return;
                }else if(this.formObj.type == 0 && this.formObj.url == ''){
                    this.$message.error({message: '请输入内容页链接!' });
                    return;
                }else if(this.formObj.type == 1 && this.formObj.content == ''){
                    this.$message.error({message: '请输入文本内容!' });
                    return;
                }else if(this.formObj.imgUrl == ''){
                    this.$message.error({message: '请上传图片!' });
                    return;
                }else if(this.formObj.publishType == 1 && this.formObj.publishTime == ''){
                    this.$message.error({message: '请选择发布时间!' });
                    return;
                }else if(this.formObj.offType == 1 && this.formObj.offTime == ''){
                    this.$message.error({message: '请选择下线时间!' });
                    return;
                }

                if(this.formObj.publishType == 1 && this.formObj.offType == 1){
                    if(this.formObj.offTime < this.formObj.publishTime){
                      this.$message.error({message: '下线时间不能早于发布时间!' });
                      return;
                    }
                }

                if(this.formObj.type == 0 && this.formObj.url != '' && !patterns.url(this.formObj.url)){
                    this.$message.error({message: '内容页链接格式不正确，请重新输入!' });
                    return;
                }


               this.formObj.publishTime = new Date(this.formObj.publishTime).getTime();
               this.formObj.offTime = new Date(this.formObj.offTime).getTime();
               const url = this.isEdit ? '/api/notice/update' : '/api/notice/insert';
               this.$http.post(url,{obj:JSON.stringify(this.formObj)})
               .then( res => {
                   const msg = res.body
                   if(msg.success){
                       this.$message.success({message: '操作成功!'});
                       this.$router.replace('/notice');
                   }else{
                      this.$message.error({message: '操作失败!' });
                   }

               }, res => {
                  this.$message.error({message: res.statusText });
               })
          },
          getDetail () {
             this.$http.get('/api/notice/view',{params:{id: this.$route.params.id}})
             .then( (res) =>{
                 const msg = res.body;
                  if(msg.success){
                    this.formObj = _.assign(this.formObj,msg.result);
                  }else{
                    this.$message.error({message: '公告不存在或已被删除!'});
                  }
             }, res => {
                this.$message.error({message: res.statusText });
             })
          },
          setContentType () {
              if(this.formObj.type == 0){
               this.formObj.content = '';
             }else{
              this.formObj.url = '';
             }
          },
          //选择立即发送时，清空定时发送时间
          setPublishTime () {
              if(this.formObj.publishType == 0){
                this.formObj.publishTime = '';
                this.formObj.publishReceiveTime = '';
              }
          },
          //选中永不下线时，清空定时下线时间
          setOffTime () {
              if(this.formObj.offType == 0){
                this.formObj.offTime = '';
                this.formObj.offReceiveTime = '';
              }
          },
          fileUpload (res) {

              if(res.filePath){
                  this.formObj.imgUrl = res.filePath;
                  this.imgUrl = res.path;
              }else{
                 this.$message.error({message: '图片上传失败!' });
              }

          }

        }
    }

</script>

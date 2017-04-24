<template>
    <div>
        <ui-panel>
          <span slot="panel-hd">背景图片设置</span>
          <div slot="panel-bd">
            <div class="notice">
              <p>大小尺寸建议：900像素*500像素</p>
              <p>最多上传5张</p>
            </div>

            <ul class="uploadImgList">
              <li class="img-item" v-for="item in BgLists">
                <p class="img-index">{{item.name}}</p>
                <div class="img">
                  <a class="edit" @click="showBgUpload(item)"><i class="iconfont icon-modify"></i></a><a class="delete" @click="deleteBgImg(item)"><i class="iconfont icon-delete"></i></a>
                  <img :src="item.imgUrl">
                </div>
              </li>
              <li v-if="BgLists.length < 5" class="upload-item">
                <p class="img-index">添加图片</p>
                <div class="upload-btn" @click="showBgUpload()"></div>
              </li>
            </ul>

          </div>
        </ui-panel>
        <ui-panel>
          <span slot="panel-hd">功能设置</span>
          <div slot="panel-bd">
            <ul class="action-list">
              <li v-for="action in actionLists"><img :src="action.imgUrl"><p>{{action.name}}</p><input :true-value="1" :false-value="0" v-model="action.state"   type="checkbox"></li>
            </ul>
            <div class="btnArea">
              <a @click="saveActions()" class="btn btn-blue">保存</a>
            </div>
          </div>
        </ui-panel>
      <ui-panel>
          <span slot="panel-hd">广告设置</span>
          <div slot="panel-bd">
            <div class="notice">
              <p>从广告列表中选择</p>
              <p>最多选择5个广告</p>
            </div>
            <div class="btnArea btnArea2">
              <a class="btn btn-blue" @click="selectAdv">选择广告</a>
            </div>
            <ui-table :headerArray="headerArray">
              <tbody slot="tbody">
              <tr v-for="data in advLists">
                <td><img height="55" width="99" :src="data.imgUrl"></td>
                <td>{{data.info}}</td>
                <td>{{data.type}}</td>
                <td>{{data.name}}</td>
                <td><span class="count">{{data.clicks}}</span></td>
                <td>{{data.publishTime | date('YYYY-MM-DD HH:mm:ss')}}</td>
                <td>{{data.offTime | date('YYYY-MM-DD HH:mm:ss')}}</td>
                <td><a class="delete-btn" href @click.prevent="setAdvTop(data)"><i class="iconfont icon-delete"></i></a></td>
              </tr>
              <tr v-if="advLists == ''" class="text-center">
                <td colspan="8">无数据</td>
              </tr>
              </tbody>
            </ui-table>
          </div>
        </ui-panel>
      <modal :show.sync="showBgModal"  :backdrop="false" effect="fade" width="500">
        <div slot="modal-header" class="modal-header">
          <h4 class="modal-title">
            上传背景图片
            <a class="close-modal" title="关闭" href @click.prevent="closeBgUpload">×</a>
          </h4>
        </div>
        <div slot="modal-body" class="modal-body">
          <add-form :isForm="true" v-on:formSubmit="saveBgInfo($event)" style="width: auto;padding: 0;">
            <div slot="formBody" class="form-body">
              <dl class="dl2">
                <dt>图片名称：</dt>
                <dd>
                  <input v-model="bgObj.name"  class="ipt ipt-large" style="width:468px" type="text"/>
                </dd>
              </dl>
              <dl class="dl2">
                <dt>展示图片：</dt>
                <dd>

                  <div class="upload-area">

                    <img v-if="bgObj.imgUrl" width="198" height="110" :src="imgUrl">
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
                          v-on:bgUpload="bgImgUploaded"
                          :data="uploadBtn.data">

                          </file-upload>
                  </div>
                </dd>
                </dl>
            </div>
              <div slot="buttonArea" class="button-area">
                <button type="submit" class="btn btn-blue">保存</button><a href="" class="btn btn-red" @click.prevent="closeBgUpload">取消</a>
              </div>
          </add-form>
        </div>
        <div slot="modal-footer" v-show="false" class="modal-footer">
      </div>

    </modal>

      <modal :show.sync="showAdvModal"  :backdrop="false" effect="fade" width="80%">
        <div slot="modal-header" class="modal-header">
          <h4 class="modal-title">
            选择广告
            <a class="close-modal" title="关闭" href @click.prevent="closeAdvModal">×</a>
          </h4>
        </div>
        <div slot="modal-body" class="modal-body">
          <ui-table :headerArray="selectHeaderArray">
            <tbody slot="tbody">
            <tr v-for="data in selectAdvLists">
              <td>{{data.info}}</td>
              <td>{{data.type}}</td>
              <td>{{data.name}}</td>
              <td><span class="count">{{data.clicks}}</span></td>
              <td>{{data.publishTime | date('YYYY-MM-DD HH:mm:ss')}}</td>
              <td>{{data.offTime | date('YYYY-MM-DD HH:mm:ss')}}</td>
              <td><a href @click.prevent="setAdvTop(data)">选择</a></td>
            </tr>
            <tr v-if="selectAdvLists == ''" class="text-center">
              <td colspan="7">无数据</td>
            </tr>
            </tbody>
          </ui-table>
          <pagination ref="pagination" v-if="tableTotalPage > 0" :pages="tableTotalPage" :pageSize="pageSize" v-on:pageChange="getAdvPage"></pagination>
        </div>
        <div slot="modal-footer" v-show="false" class="modal-footer">
        </div>
      </modal>
      <!--<input type="file" id="upload_img"  />-->
      <!--<img id="preview_size_fake" width=100 height=100 border=0 src=''>-->
      <!--<a @click.prevent="cg" href="">加载 </a>-->
    </div>

</template>
<style lang="less" scoped>
  @import "../../less/variables";
  @import "../../less/mixins";

  .notice {
    padding-top: 5px;
    color: #b3b3b3;
    p{

      line-height:16px;
      font-size:12px;
      margin-bottom: 0;
    }

  }
  //上传背景图
  .uploadImgList {

    margin:25px 0 0;
    .clearfix();
    li {
      float: left;
      margin-right: 30px;
      width: 198px;
      img {
        width: 198px;
        height: 110px;
        display: block;
      }
      .img {
        position: relative;
      }
      .edit,.delete{
        position: absolute;
        top: 0;
        display: block;
        width: 20px;
        height: 20px;
        line-height:20px;
        color: @white;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
      }
      .iconfont {
          font-size:14px;
      }
      .edit{
        left: 0;
        background: @defaultBlue;
      }
      .delete {

        right: 0;
        background: @red;

      }

    }
    .img-index {

      color:#808080;

    }

    .upload-item {

      .upload-btn {
        display: block;
        width: 198px;
        height: 110px;
        background: url("../../assets/imgs/upload.jpg") no-repeat;
        cursor: pointer;
        background-color: #e6e6e6;

      }

    }
  }

  //功能设置
  .action-list {
    padding: 15px 0;
    .clearfix();
    li {
      position: relative;
      float: left;
      text-align: center;
      margin-right: 30px;
      p {
        margin-top: 10px;
        font-size: 15px;
      }
      input {
        position: absolute;
        right: -6px;
        top: 45px;
      }
      img {
        width: 60px;
        height: auto;
      }

    }
  }
  .btnArea {
    .btn {
      width: 115px;
    }
  }
  .btnArea2 {
    margin: 20px 0;
  }
  .count {

    color: @yellow;

  }
  .delete-btn {

    color: @red;

  }
  #preview_size_fake{ /* 该对象只用来在IE下获得图片的原始尺寸，无其它用途 */
    filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=image);
    visibility: hidden;
  }

</style>
<script>
    import uiPanel from '../../components/uiPanel'
    import uiTable from '../../components/uiTable'
    import addForm from '../../components/addForm'
    import FileUpload from 'vue-upload-component'
    import pagination from '../../components/pagination'
    import imgSize from '../../util/imgSize'
    import { modal } from 'vue-strap'
    import _ from 'lodash'
    export default{
        data(){
            return{
            BgLists: '',
            actionLists: [],
            advLists: [],
            selectAdvLists: [],
            pageSize: 10,
            showBgModal: false,
            updateBgImg: false,
            showAdvModal: false,
            tableTotalPage: '',
            imgUrl: '',
            bgObj: {
              id: '',
              name: '',
              imgUrl: ''
            },

            headerArray:[
              {name: '封面',width:'20%'},
              {name: '广告描述'},
              {name: '分类信息'},
              {name: '商户名称'},
              {name: '点击次数'},
              {name: '投放开始时间'},
              {name: '投放下线时间'},
              {name: '操作',width:'8%'},
            ],

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
                data: {type: "bg"},
                postAction: '/file/upload',
                events: {
                    add(file, component) {
                        //component.active = true;
                        file.headers['X-Filename'] = encodeURIComponent(file.name)
                        file.data.finename = file.name
                        var _this = this;
                         if(typeof FileReader != 'undefined'){
                            imgSize(this,file,component);
                         }else{
                            component.active = true;
                         }
                      },
                      progress(file, component) {
                       // console.log('progress ' + file.progress);
                      },
                      after(file, component) {
                        this.$emit('bgUpload',file);
                       // console.log('after');
                      },
                      before(file, component) {
                        //console.log('before');
                      }
                }
              }
            }
        },
        components: {
          uiPanel,
          uiTable,
          pagination,
          modal,
          FileUpload,
          addForm
        },
        computed: {
           selectHeaderArray () {
            return this.headerArray.slice(1,this.headerArray.length);
           }
        },
        created (){
             //初始化读取背景图片列表信息
            this.getBgLists();
            //初始化读取功能配置
            this.getActionLists();

            //初始化读取首页广告列表
            this.getAdvList(1);

        },
        methods: {
            cg () {

                if( typeof (FileReader) != 'undefined'){
                    var MyTest = document.getElementById("upload_img").files[0];
                    var reader = new FileReader();
                    reader.readAsDataURL(MyTest);
                    reader.onload = function(theFile) {
                      var image = new Image();
                       image.src = theFile.target.result;
                       image.onload = function() {
                          alert("图片的宽度为"+this.width+",长度为"+this.height);
                       };
                    };
                }else{
                    var ipt = document.getElementById('upload_img')
                    ipt.select();
                    ipt.blur();
                    var src = document.selection.createRange().text;
                    var img = document.getElementById('preview_size_fake');
                    console.log(img.filters)
                    img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
                    console.log(img.offsetWidth)
                }
            },
            //定义初始化读取背景图片列表信息
            getBgLists () {
              this.$http.get('/backgroundImg/getLists')
               .then( res => {
                   const msg = res.body
                   this.BgLists = msg.result;
               }, res => {
                  this.$message.error({message: res.statusText });
               })
            },
            //定义初始化读取功能配置
            getActionLists () {
              this.$http.get('/homeFunction/getLists')
               .then( res => {
                   const msg = res.body
                   this.actionLists = msg.result;
               }, res => {
                  this.$message.error({message: res.statusText });
               })
            },
            //保存功能设置
            saveActions () {

               const actionList = this.actionLists.map ( action => _.pick(action,['id','state']) )

                this.$http.post('/homeFunction/updateState',{obj: JSON.stringify(actionList)})
                   .then( res => {
                       const msg = res.body
                       if(msg.success){
                         this.$message.success({message: '保存成功'});
                       }else{
                         this.$message.error({message: '保存失败'});
                       }
                   }, res => {
                  this.$message.error({message: res.statusText });
               })

            },
            //定义获取广告列表 @state 1:首页显示 0:不在首页显示
            //状态 @page： 分页,
            //发布状态 @publishState
            getAdvList (state,page) {

                let obj = {state: state};

                if(state == 0) {
                    obj.publishState = 1;
                }

                 this.$http.get('/advertisement/getLists',{params:{pageNum: page || 1, pageSize: this.pageSize, obj: JSON.stringify(obj)}})
                 .then( (res) =>{
                    const msg = res.body;
                    if(msg.result.success){
                        if(state == 1){
                          this.advLists = msg.result.data;
                        }else{
                            this.selectAdvLists = msg.result.data;
                            this.tableTotalPage = msg.result.total;

                          if(this.$refs.pagination){
                              this.$refs.pagination.setPaginationData(page);
                          }
                        }
                    }

                 }, res => {
                    this.$message.error({message: res.statusText });
                 })
            },
            //保存设置背景图片
            saveBgInfo () {

              const url = this.bgObj.id != '' ? '/backgroundImg/update' : '/backgroundImg/insert'

              if( this.bgObj.name != '' &&  this.bgObj.imgUrl != ''){
                  this.$http.post(url,{obj:JSON.stringify(this.bgObj)})
                 .then( res => {
                     const msg = res.body
                     if(msg.success){
                        this.$message.success({
                            message: '背景图片设置成功'
                          });
                        this.showBgModal = false;
                        this.getBgLists();
                        this.resetBgObj();
                     }else{
                      this.$message.error({
                            message: '背景图片设置失败',
                          });
                     }
                 }, res => {
                  this.$message.error({message: res.statusText });
               })
              }else {

               this.$message.error({
                    message: '信息不完整'
                  });

              }
            },
            //删除背景图片
            deleteBgImg (obj) {

                this.$messageBox.confirm('确定要删除该图片？','提示',{
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                }).then( () => {
                      this.$http.post('/backgroundImg/delete',{id: obj.id})
                     .then( res => {
                         const msg = res.body
                         if(msg.success){
                            this.$message.success({
                                message: '图片删除成功'
                              });
                            this.resetBgObj();
                            this.getBgLists();
                         }else{
                           this.$message.error({
                                message: '删除失败!'
                              });
                         }
                     }, res => {
                        this.$message.error({message: res.statusText });
                     })
                }).catch(() => {});
            },
            //显示背景图片上传模态
            showBgUpload (obj) {
              if(obj) {
                  this.bgObj.name = obj.name;
                  this.bgObj.id = obj.id;
                  //this.bgObj.imgUrl = obj.imgUrl;
              }
              this.showBgModal = true;
            },
            //关闭设置背景图片模态框
            closeBgUpload () {
              this.showBgModal = false;
              this.resetBgObj();
            },
            resetBgObj () {
              this.bgObj.name = '';
              this.bgObj.imgUrl = '';
              this.bgObj.id = '';
            },
            //监听上传图片
            bgImgUploaded (res){
              if(res.success){
                   this.bgObj.imgUrl = res.response.filePath;
                   this.imgUrl = res.response.path;
              }else {
                  this.$message.error({message: '图片上传失败!'});
              }

            },
             //选择广告
            selectAdv () {
              this.showAdvModal = true;
              this.getAdvList(0,1);
            },
            //移除广告
            setAdvTop (data) {
                const state = data.state == 0 ? 1 : 0;
                  if(data.state == 1){
                      this.$messageBox.confirm('确定将这条广告删除？','提示',{
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                      }).then( () => {
                        this.setAdvTopAjax(data,state);
                      }).catch( () => {})
                  }else{
                      this.setAdvTopAjax(data,state);
                  }
            },
            setAdvTopAjax (data,state){
                 this.$http.post('/advertisement/updateState',{ids: data.id, state: state})
                 .then( res => {
                     const msg = res.body
                     if(msg.success){
                     this.$message.success({message: data.state == 1 ? '移除成功' :'操作成功!'});

                          //初始化读取首页广告列表
                          this.getAdvList(1);
                     }else{
                        this.$message.error({message: msg.msg || '操作失败！'});
                     }
                 }, res => {
                    this.$message.error({message: res.statusText });
                 })
            },
            //广告分页
            getAdvPage (page) {
              this.getAdvList(0,page);
            },
            //关闭广告模态框
            closeAdvModal () {
              this.showAdvModal = false;
            }
        }

    }
</script>

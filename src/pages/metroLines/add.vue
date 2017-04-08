<template>
  <div>
   <addForm :isForm="true" class="stationWrap">
     <div slot="formBody">
       <ui-panel slot="formBody">
         <span slot="panel-hd">设置</span>
         <div slot="panel-bd" class="clearfix">
            <addForm>
              <div slot="detail" class="clearfix">
                <div class="left">
                  <dl>
                    <dt>草稿ID：</dt>
                    <dd v-if="isDetail" class="default">
                      {{metroInfoObject.id}}
                    </dd>
                    <dd v-else>
                      <input  type="text"  v-model="metroInfoObject.id" readonly class="ipt ipt-medium disabled">
                    </dd>
                  </dl>
                  <dl>
                    <dt>底图宽度：</dt>
                    <dd v-if="isDetail" class="default">
                      {{metroInfoObject.h}}px
                    </dd>
                    <dd v-else>
                      <input type="text" v-model="metroInfoObject.h" class="ipt ipt-medium"> px
                    </dd>
                  </dl>
                  <dl>
                    <dt>外圆半径：</dt>
                    <dd v-if="isDetail" class="default">
                      {{metroInfoObject.sro}}px
                    </dd>
                    <dd v-else>
                      <input type="text" v-model="metroInfoObject.sro" class="ipt ipt-medium"> px
                    </dd>
                  </dl>
                  <dl>
                    <dt>换乘半径：</dt>
                    <dd v-if="isDetail" class="default">
                      {{metroInfoObject.tr}}px
                    </dd>
                    <dd v-else>
                      <input type="text" v-model="metroInfoObject.tr" class="ipt ipt-medium"> px
                    </dd>
                  </dl>
                  <dl>
                    <dt>点击区域：</dt>
                    <dd v-if="isDetail" class="default">
                      {{metroInfoObject.clickArea}}px
                    </dd>
                    <dd v-else>
                      <input type="text" v-model="metroInfoObject.clickArea" class="ipt ipt-medium"> px
                    </dd>
                  </dl>
                </div>
                <div class="left">
                  <dl>
                    <dt>版本名称：</dt>
                    <dd v-if="isDetail" class="default">
                      {{metroInfoObject.verName}}
                    </dd>
                    <dd v-else>
                      <input type="text" v-model="metroInfoObject.verName" class="ipt ipt-medium">
                    </dd>
                  </dl>
                  <dl>
                    <dt>底图长度：</dt>
                    <dd v-if="isDetail" class="default">
                      {{metroInfoObject.w}}px
                    </dd>
                    <dd v-else>
                      <input type="text" v-model="metroInfoObject.w" class="ipt ipt-medium"> px
                    </dd>
                  </dl>
                  <dl>
                    <dt>内圆半径：</dt>
                    <dd v-if="isDetail" class="default">
                      {{metroInfoObject.sri}}px
                    </dd>
                    <dd v-else>
                      <input type="text" v-model="metroInfoObject.sri" class="ipt ipt-medium"> px
                    </dd>
                  </dl>
                  <dl>
                    <dt>换乘字体：</dt>
                    <dd v-if="isDetail" class="default">
                      {{metroInfoObject.tfs}}pt
                    </dd>
                    <dd v-else>
                      <input type="text" v-model="metroInfoObject.tfs" class="ipt ipt-medium"> pt
                    </dd>
                  </dl>
                </div>
                <div class="right">
                  <dl>
                    <dt>版本描述：</dt>
                    <dd v-if="isDetail" class="default">
                      {{metroInfoObject.verInfo}}
                    </dd>
                    <dd v-else>
                      <input type="text" v-model="metroInfoObject.verInfo" class="ipt ipt-medium">
                    </dd>
                  </dl>
                  <dl>
                    <dt>底图：</dt>
                    <dd v-if="isDetail" class="default">
                      {{metroInfoObject.img}}
                    </dd>
                    <dd v-else>
                      <div class="upload-area">
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
                          v-on:fileUploaded="fileUploaded"
                          :data="uploadBtn.data">

                        </file-upload>
                      </div>
                    </dd>
                  </dl>
                  <dl>
                    <dt>站点字体：</dt>
                    <dd v-if="isDetail" class="default">
                      {{metroInfoObject.sfs}}pt
                    </dd>
                    <dd v-else>
                      <input type="text" v-model="metroInfoObject.sfs" class="ipt ipt-medium"> pt
                    </dd>
                  </dl>
                  <dl>
                    <dt>线宽：</dt>
                    <dd v-if="isDetail" class="default">
                      {{metroInfoObject.lw}}px
                    </dd>
                    <dd v-else>
                      <input type="text" v-model="metroInfoObject.lw" class="ipt ipt-medium"> px
                    </dd>
                  </dl>
                </div>
                <div class="right" v-if="imgSrc" style="margin-left: 30px">
                  <img width="360" height="200" :src="imgSrc">
                </div>
              </div>
            </addForm>
         </div>
       </ui-panel>

       <div class="clearfix">
           <div class="left left2">
             <ui-panel>
               <span slot="panel-hd">线路</span>
               <div slot="panel-bd">
                 <ui-table :headerArray="lineHeaderArray">
                   <tbody slot="tbody">
                   <tr  v-for="data in metroInfoObject.subwayLine">
                     <td v-if="isDetail" >{{data.svalid==1 ? '是' : '否'}}</td>
                     <td v-else><input type="checkbox" v-model="data.svalid" :true-value="1" :false-value="0"></td>
                     <td v-if="isDetail" >{{data.lc}}</td>
                     <td v-else><input type="text" v-model="data.lc" style="width:80px"> </td>
                     <!--<td>{{data.lid}}</td>-->
                     <td>{{data.ln}}</td>
                     <td v-if="isDetail" >{{data.alias}}</td>
                     <td v-else><input type="text" v-model="data.alias" style="width:80px"> </td>
                   </tr>
                   <tr v-if="metroInfoObject.subwayLine == ''" class="text-center">
                     <td colspan="4">无数据</td>
                   </tr>
                   </tbody>
                 </ui-table>
               </div>
             </ui-panel>

           </div>
           <div class="right right2">
             <ui-panel>
               <span slot="panel-hd">站点</span>
               <div slot="panel-bd">
                 <!--<p>请点击线路查询站点</p>-->
                 <ui-table :headerArray="headerArray">
                   <tbody slot="tbody">
                   <tr  v-for="(data,index) in pointLists" >
                     <td>{{data.id || "---"}}</td>
                     <td>{{data.ct | pointState}}</td>
                     <td>{{data.x || "---"}}</td>
                     <td>{{data.y || "---"}}</td>
                     <td>{{data.tx || "---"}}</td>
                     <td>{{data.ty || "---"}}</td>
                     <td>{{data.sid || "---"}}</td>
                     <td>{{data.sn || "---"}}</td>
                     <td>{{data.snpy || "---"}}</td>
                     <td>{{data.sw || "---"}}</td>
                     <td v-if="data.ct == 0">{{data.tf == 1 ? '是': '否'}}</td>
                     <td v-else>{{data.tf || '---'}}</td>
                     <td v-if="data.ct == 0">{{data.svalid == 1 ? '启用' : '不启用'}}</td>
                     <td v-else>{{data.svalid || '---'}}</td>
                     <td v-if="!isDetail" >
                        <a v-if="data.ct == 0" href="" @click.prevent="showDetail(1,data,index)" class="blue-fontIcon"><i class="iconfont icon-info"></i></a>
                        <a v-else href="" @click.prevent="showDetail(2,data,index)" class="blue-fontIcon"><i class="iconfont icon-info"></i></a>

                     </td>
                     <td  v-if="!isDetail" class="action-td">
                       <a href="" title="增加" @click.prevent="showDetail(3,'',index)" class="blue-fontIcon"><i class="iconfont icon-add"></i></a>
                       <a v-if="data.ct == 0" title="移除" class="gray-fontIcon"><i class="iconfont icon-reduce"></i></a>
                       <a v-else href="" @click.prevent="delRow(index)" class="red-fontIcon"><i class="iconfont icon-reduce"></i></a>
                     </td>

                   </tr>
                   <tr v-if="pointLists == ''" class="text-center">
                     <td colspan="12">无数据</td>
                   </tr>
                   </tbody>
                 </ui-table>
               </div>
             </ui-panel>
           </div>
       </div>
     </div>
     <div v-if="isDetail" slot="buttonArea" class="button-area">
     </div>
     <div v-else slot="buttonArea" class="button-area">
       <button type="submit" @click.prevent="save(1)" class="btn btn-blue">提交</button><button @click.prevent="save(0)"  type="submit" class="btn btn-blue">保存</button>
        <router-link :to="{path:'/lines'}" class="btn btn-red">取消</router-link>
     </div>
   </addForm>

    <modal v-if="!isDetail" :show.sync="showDetailModal"  :backdrop="false" effect="fade" :width="625">
      <div slot="modal-header" class="modal-header">
        <h4 class="modal-title">
          {{modalTitle}}
          <a class="close-modal" title="关闭" href @click.prevent="closeModal">×</a>
        </h4>
      </div>
      <div slot="modal-body" class="modal-body">
        <add-form :isForm="true" v-on:formSubmit="savePoint" style="width: auto;padding: 0;">
          <div slot="formBody" class="form-body clearfix">
            <div class="left" style="width:320px">
              <dl>
                <dt>点类型：</dt>
                <dd>
                  <select v-if="addOrEditPoint"  v-model="modalPointData.ct" class="ipt ipt-medium">
                    <option :value="1">连接点</option>
                    <option :value="2">控制点</option>
                  </select>
                  <select v-else  v-model="modalData.ct" class="ipt ipt-medium disabled" disabled>
                    <option :value="0">站点</option>
                  </select>
                </dd>
              </dl>
              <dl>
                <dt>站ID：</dt>
                <dd>
                  <input v-if="addOrEditPoint" type="text" v-model="modalPointData.sid" class="ipt ipt-medium disabled" readonly>
                  <input v-else type="text" v-model="modalData.sid" class="ipt ipt-medium disabled" readonly>
                </dd>
              </dl>
              <dl>
                <dt>点x：</dt>
                <dd>
                  <input v-if="addOrEditPoint" type="text" v-model="modalPointData.x" class="ipt ipt-medium">
                  <input v-else type="text" v-model="modalData.x" class="ipt ipt-medium">
                </dd>
              </dl>
              <dl>
                <dt>文字x：</dt>
                <dd>
                  <input v-if="addOrEditPoint" type="text" v-model="modalPointData.tx" class="ipt ipt-medium disabled" readonly>
                  <input v-else type="text" v-model="modalData.tx" class="ipt ipt-medium">
                </dd>
              </dl>
              <dl>
                <dt>站简称：</dt>
                <dd>
                  <input v-if="addOrEditPoint"  type="text" v-model="modalPointData.snpy" class="ipt ipt-medium disabled" readonly>
                  <input v-else type="text" v-model="modalData.snpy" class="ipt ipt-medium" >
                </dd>
              </dl>
              <dl>
                <dt>是否换乘：</dt>
                <dd>
                  <input v-if="addOrEditPoint" type="text" v-model="modalPointData.tf" class="ipt ipt-medium disabled" readonly>
                  <select v-else  v-model="modalData.tf" class="ipt ipt-medium">
                    <option :value="1">是</option>
                    <option :value="0">否</option>
                  </select>
                </dd>
              </dl>
            </div>
            <div class="right">
              <dl>
                <dt></dt>
                <dd>
                </dd>
              </dl>
              <dl>
                <dt>站名：</dt>
                <dd>
                  <input v-if="addOrEditPoint"  type="text" v-model="modalPointData.sn" class="ipt ipt-medium disabled" readonly>
                  <input v-else type="text" v-model="modalData.sn" class="ipt ipt-medium disabled" readonly>
                </dd>
              </dl>
              <dl>
                <dt>点y：</dt>
                <dd>
                  <input v-if="addOrEditPoint"  type="text" v-model="modalPointData.y" class="ipt ipt-medium">
                  <input v-else type="text" v-model="modalData.y" class="ipt ipt-medium">
                </dd>
              </dl>
              <dl>
                <dt>文字y：</dt>
                <dd>
                  <input v-if="addOrEditPoint"  type="text" v-model="modalPointData.ty" class="ipt ipt-medium disabled" readonly>
                  <input v-else type="text" v-model="modalData.ty" class="ipt ipt-medium">
                </dd>
              </dl>
              <dl>
                <dt>站权重：</dt>
                <dd>
                  <input v-if="addOrEditPoint"  type="text" v-model="modalPointData.sw" class="ipt ipt-medium disabled" readonly>
                  <input v-else type="text" v-model="modalData.sw" class="ipt ipt-medium">
                </dd>
              </dl>
              <dl>
                <dt>是否启用：</dt>
                <dd>
                  <input v-if="addOrEditPoint" type="text" v-model="modalPointData.svalid" class="ipt ipt-medium disabled" readonly>
                  <select v-else v-model="modalData.svalid" class="ipt ipt-medium">
                    <option :value="1">是</option>
                    <option :value="0">否</option>
                  </select>
                </dd>
              </dl>

            </div>
          </div>
          <div slot="buttonArea" class="button-area" style="margin-top:20px;">
            <button type="submit" class="btn btn-blue">保存</button><a href="" class="btn btn-red" @click.prevent="closeModal">取消</a>
          </div>
        </add-form>
      </div>
      <div slot="modal-footer" v-show="false" class="modal-footer">
      </div>
    </modal>

  </div>
</template>
<style lang="less" scoped>
  @import "../../less/variables";
  @import "../../less/mixins";
  .table {

    tr {
      //cursor: pointer;
    }

  }
  .ui-panel {
    margin-bottom:0;
  }
  .content-inner {
     height: 100%;
  }
  .stationWrap {
      width: 100%;
      background: @white;
      .clearfix();
  }
  .left {
    width: 380px;
    float: left;
  }
  .left2 {
    width: 35%;
    .ui-panel {

      padding:0 25px 25px 25px;

    }
  }
  .right {
    float: left;
    overflow: hidden;
    .ui-panel {
      padding:0 0 25px 0;
    }
  }
  .right2 {
    width: 65%;
  }
  .form-area {
     padding: 0 25px 25px 0;
     dl {
       dd {
         padding-left: 5px;
         width: auto;
       }
       &:last-child {
         margin-bottom: 0;
       }
     }

   }

  .addExit {
    margin-left:3%;
    color: @defaultBlue;
    text-decoration: underline;

  }



</style>
<script>
import uiPanel from '../../components/uiPanel'
import uiTable from '../../components/uiTable'
import addForm from '../../components/addForm'
import FileUpload from 'vue-upload-component'
import { modal } from 'vue-strap'

    export default{
        data(){
            return{
                lineId: '',
                stationId: '',
                pointLists: '',
                addOrEditPoint: false,
                showDetailModal: false,
                modalTitle: '编辑站点',
                modalSaveType: 1,
                pointRowIndex: '',
                imgSrc: '',
                //编辑站点对象
                modalData: { },
                //新增编辑点对象
                modalPointData: { },
                metroInfoObject: {
                    id: '',
                    verName: '',
                    verInfo: '',
                    img: '',
                    lw: '',
                    clickArea: '',
                    w: '',
                    h: '',
                    sri: '',
                    sro: '',
                    tr: '',
                    tfs: '',
                    sfs: '',
                    subwayLine: []
                },
                lineHeaderArray:[
                  {name: '是否启用'},
                  {name: '颜色'},
                  //{name: '线路ID'},
                  {name: '线路名称'},
                  {name: '线路简称'}
                ],
                stationHeaderArray:[
                  {name: '点ID'},
                  {name: '点类型'},
                  {name: '点x'},
                  {name: '点y'},
                  {name: '文字x'},
                  {name: '文字y'},
                  {name: '站ID'},
                  {name: '站名'},
                  {name: '站名简称'},
                  {name: '站权重'},
                  {name: '是否换乘'},
                  {name: '是否启用'},
                  {name: '详情'},
                  {name: '操作'},

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
                    data: {type: "line"},
                    postAction: '/file/upload',
                    events: {
                        add(file, component) {
                            component.active = true;
                            file.headers['X-Filename'] = encodeURIComponent(file.name)
                            file.data.finename = file.name
                          },
                          progress(file, component) {
                           // console.log('progress ' + file.progress);
                          },
                          after(file, component) {
                            this.$emit('fileUploaded',file.response);
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
          addForm,
          FileUpload,
          modal

        },
        computed: {

            isDetail () {
               return this.$route.name == 'lineDetail';
            },
            headerArray () {
              if(this.isDetail) {
                  return this.stationHeaderArray.slice(0,this.stationHeaderArray.length-2);
              }else{
                  return this.stationHeaderArray;
              }
            }

        },
        created () {
            this.getView();
        },
        methods: {
            getView () {
                 const id = this.$route.params.id || "";
                 const url = this.$route.name == 'copy' ? '/api/subwayMap/copyVersion' : '/api/subwayMap/view';
                 this.$http.get(url,{params:{id: id}})
                 .then( (res) =>{
                    const msg = res.body;
                    if(msg.success){
                        //获取线路数据
                        this.metroInfoObject = msg.result;
                        //this.metroInfoObject.id = msg.result.id || '';
                        //获取点数据
                        if(msg.result.subwayLine != ''){
                            this.pointLists = msg.result.subwayLine[0].subwayPoint;
                        }
                    }
                 }, res => {
                this.$message.error({message: res.status+'-'+res.statusText });
             })
            },
            //@type 1:编辑站点， 2：编辑连接点控制点，3：新增连接点和控制点；
            //使用 _.assign 将行数据合并到一个空对象中，防止在修改弹出层数据时未保存，表格的数据也跟着改变，如果直接赋值，数据将双向绑定；
            showDetail (type, data, index) {
               const emptyLine = '---';
                //新增点时定义默认数据
               const defaultPointData ={
                              ct: 1,
                              sid: '',
                              x: '',
                              y: '',
                              tx: '',
                              ty: '',
                              snpy: '',
                              tf: '',
                              sn: '',
                              sw: '',
                              svalid: ''
                           }
               this.modalTitle = '编辑站点';
               this.showDetailModal = true;

               if(type == 1){
                  this.modalData = _.assign({},data);
               }else{
                    this.addOrEditPoint = true;
                    if(type == 3){
                        this.modalTitle = '新增点';
                        this.modalPointData = _.assign({},defaultPointData);
                    }else{
                        this.modalPointData = _.assign({},data);;
                        this.modalTitle = '编辑点';
                    }
               }
               this.modalSaveType = type;
               this.pointRowIndex = index;
            },
            closeModal () {
                this.showDetailModal = false;
                this.addOrEditPoint = false;
            },

            delRow (index) {
                this.pointLists.splice(index,1);
            },

            //modal框得保存按钮事件
            savePoint () {

               if(this.modalSaveType == 1){

                  const data = _.assign({},this.modalData);
                  this.pointLists.splice(this.pointRowIndex,1,data);

               }else if(this.modalSaveType == 2){

                  const data = _.assign({},this.modalPointData);
                  this.pointLists.splice(this.pointRowIndex,1,data);

               }else{

                  const data = _.assign({},this.modalPointData);
                  this.pointLists.splice(this.pointRowIndex+1,0,data);

               }
              this.closeModal();
            },
            save (state) {
                 this.metroInfoObject.state = state;

                 this.$http.post('/api/subwayMap/insert',{obj: JSON.stringify(this.metroInfoObject)})
                 .then( res => {
                     const msg = res.body
                     if(msg.success){
                        this.$router.replace('/lines');
                        this.$message.success({message: '操作成功'});
                     }else{
                        this.$message.error({message: '操作失败'});
                     }
                 }, res => {
                this.$message.error({message: res.status+'-'+res.statusText });
             })
            },
            fileUploaded (res) {
                if(res.filePath){
                    this.metroInfoObject.img = res.filePath;
                    this.imgSrc = res.path;
                }else{
                  this.$message.error({message: '图片上传失败!'});

                }
            },

        }

    }
</script>

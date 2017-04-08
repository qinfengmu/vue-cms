<template>
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
                    <dd>
                      <input type="text" class="ipt ipt-medium">
                    </dd>
                  </dl>
                  <dl>
                    <dt>版本描述：</dt>
                    <dd>
                      <input type="text" class="ipt ipt-medium">
                    </dd>
                  </dl>
                  <dl>
                    <dt>线宽：</dt>
                    <dd>
                      <input type="text" class="ipt ipt-medium">
                    </dd>
                  </dl>
                  <dl>
                    <dt>外圆半径：</dt>
                    <dd>
                      <input type="text" class="ipt ipt-medium">
                    </dd>
                  </dl>
                  <dl>
                    <dt>weight：</dt>
                    <dd>
                      <input type="text" class="ipt ipt-medium">
                    </dd>
                  </dl>
                </div>
                <div class="right">
                  <dl>
                    <dt>版本号：</dt>
                    <dd>
                      <input type="text" class="ipt ipt-medium">
                    </dd>
                  </dl>
                  <dl>
                    <dt>底图：</dt>
                    <dd>
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
                    <dt>点击区域：</dt>
                    <dd>
                      <input type="text" class="ipt ipt-medium">
                    </dd>
                  </dl>
                  <dl>
                    <dt>内圆半径：</dt>
                    <dd>
                      <input type="text" class="ipt ipt-medium">
                    </dd>
                  </dl>
                  <dl>
                    <dt>height：</dt>
                    <dd>
                      <input type="text" class="ipt ipt-medium">
                    </dd>
                  </dl>
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
                   <tr  @click="getStationLists(data)" v-for="data in lineLists">
                     <td>{{data.lineId}}</td>
                     <td>{{data.chineseName}}</td>
                   </tr>
                   <tr v-if="lineLists == ''" class="text-center">
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
                 <ui-table :headerArray="stationHeaderArray">
                   <tbody slot="tbody">
                   <tr :class="{current: stationId == data.stationId}" @click="" v-for="data in StationLists">
                     <td>{{data.stationId}}</td>
                     <td>{{data.chineseName}}</td>
                     <td>{{data.description}}</td>
                   </tr>
                   <tr v-if="StationLists == ''" class="text-center">
                     <td colspan="12">无数据</td>
                   </tr>
                   </tbody>
                 </ui-table>
               </div>
             </ui-panel>
           </div>
       </div>
     </div>
     <div slot="buttonArea" class="button-area">
       <button type="submit" class="btn btn-blue">提交</button><button type="submit" class="btn btn-blue">保存</button>
        <router-link :to="{path:'/lines'}" class="btn btn-red">取消</router-link>
     </div>

   </addForm>
</template>
<style lang="less" scoped>
  @import "../../less/variables";
  @import "../../less/mixins";
  .table {

    tr {
      cursor: pointer;
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
      .left {
        width: 380px;
        float: left;
      }
    .left2 {
      width: 30%;
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
      width: 70%;
    }
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

    export default{
        data(){
            return{
                lineLists: '',
                StationLists: '',
                lineId: '',
                stationId: '',
                stationInfo: {
                    imgUrl: '',
                    imgPath: ''
                },
                stationExits: [],
                directions: [],
                lineHeaderArray:[
                  {name: '是否启用'},
                  {name: '颜色'},
                  {name: '线路ID'},
                  {name: '线路名称'}
                ],
                stationHeaderArray:[
                  {name: '点ID'},
                  {name: '点类型'},
                  {name: '点x'},
                  {name: '点y'},
                  {name: '站ID'},
                  {name: '站名'},
                  {name: '站名简称'},
                  {name: '站权重'},
                  {name: '是否换'},
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
          FileUpload

        },
        created () {

        },
        methods: {

            fileUploaded () {

            }


        }

    }
</script>

<template>
 <div class="stationWrap">
      <div class="left">
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
                <td colspan="2">无数据</td>
              </tr>
              </tbody>
            </ui-table>
          </div>
        </ui-panel>
        <ui-panel>
          <span slot="panel-hd">站点</span>
          <div slot="panel-bd">
            <!--<p>请点击线路查询站点</p>-->
            <ui-table :headerArray="stationHeaderArray">
              <tbody slot="tbody">
              <tr :class="{current: stationId == data.stationId}" @click="getStationInfo(data)" v-for="data in StationLists">
                <td>{{data.stationId}}</td>
                <td>{{data.chineseName}}</td>
                <td>{{data.description}}</td>
              </tr>
              <tr v-if="StationLists == ''" class="text-center">
                <td colspan="3">无数据</td>
              </tr>
              </tbody>
            </ui-table>
          </div>
        </ui-panel>
      </div>
      <div class="right">
        <ui-panel>
          <span slot="panel-hd">设置</span>
          <div slot="panel-bd">
            <add-form v-if="stationId">
              <div slot="detail">
                <dl class="dl3">
                  <dt class="dl3-dt">首末班车时间：</dt>
                  <dd class="dl3-dd">
                    <dl v-for=" data in directions" style="margin-bottom:0;">
                      <dt style="width:130px">{{data.direction}}：</dt>
                      <dd class="default">
                        {{data.firstTime}} 至 {{data.endTime}}
                      </dd>
                      </dl>
                  </dd>
                </dl>
                <dl class="dl3">
                  <dt class="dl3-dt">站内详情：</dt>
                  <dd class="dl3-dd">
                      <dl>
                        <dt >站内图：</dt>
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
                        <dt>预览图：</dt>
                        <dd>

                          <img v-if="stationInfo.imgUrl" width="234" height="130" :src="stationInfo.imgUrl">

                        </dd>
                      </dl>
                  </dd>
                </dl>
                <dl class="dl3">
                    <dt class="dl3-dt">出站口： <a href="" class="addExit" @click.prevent="addExit">添加出站口</a></dt>
                    <dd class="dl3-dd">
                        <stationInfo :stationExits="stationExits" v-on:saveStation="save"></stationInfo>
                    </dd>
                </dl>
              </div>

            </add-form>
          </div>
        </ui-panel>
      </div>
 </div>
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
        width: 460px;
        float: left;
      }
      .right {
        //padding-left:30px;
        width: 815px;
        float: left;
        overflow: hidden;
      }
      .dl3 {

       .dl3-dt {
         width: 100%;
       }
        .dl3-dd {
         padding-left:80px;
         width: 100%;
       }
        &:last-child {
          margin-bottom:0;
        }

     }
    .form-area {

      padding: 0;

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
import panelWrap from '../../components/panelWrap'
import FileUpload from 'vue-upload-component'
import stationInfo from './stationInfo'

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
                  {name: '线路ID'},
                  {name: '线路名称'}
                ],
                stationHeaderArray:[
                  {name: '站ID'},
                  {name: '站名'},
                  {name: '站简称'}
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
                    data: {type: "st"},
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
          panelWrap,
          uiTable,
          addForm,
          FileUpload,
          stationInfo
        },
        created () {
           this.getLines();
        },
        methods: {
           //获取线路
           getLines () {
               this.$http.get('/api/stationInfo/getLines')
               .then( res => {
                   const msg = res.body
                   this.lineLists = msg.result;
                   this.getStationLists(this.lineLists[0]);
               }, res => {
                this.$message.error({message: res.statusText });
             })
           },
           //获取线路站点列表
           getStationLists (data) {
               this.$http.get('/api/stationInfo/getStations',{params: {lid: data.lineId}})
               .then( res => {
                   const msg = res.body
                   if(msg.success){
                        this.StationLists = msg.result;
                        this.lineId = data.lineId;
                   }else{
                      this.$message.error({message: '站点列表获取失败！'});
                   }
               }, res => {
                this.$message.error({message: res.statusText });
             })
           },
           //获取站点信息
           getStationInfo (data) {
               this.$http.get('/api/stationInfo/getStationInfo',{params: {lid: this.lineId,sid:data.stationId}})
               .then( res => {
                   const msg = res.body
                   if(msg.success){

                       this.directions = msg.directions;
                       this.stationExits = msg.stationExits;

                        if(msg.stationInfo){
                            this.stationInfo = _.assign(this.stationInfo,msg.stationInfo);
                        }else{
                            this.stationInfo = {imgUrl: '', imgPath: ''};
                        }

                       this.stationId = data.stationId;

                   }else{
                      this.$message.error({message: '站点信息获取失败！'});
                   }
               }, res => {
                this.$message.error({message: res.statusText });
             })
           },
           //添加出站口
           addExit () {
              this.stationExits.push({
                   sid: this.stationId,
                   exitName: '',
                   landmark: '',
                   bus: ''
              })
           },
           save (stationExits) {

                 this.stationInfo.sid = this.stationId;

                 this.$http.post('/api/stationInfo/insert',{
                      stationInfo:JSON.stringify(this.stationInfo),
                      stationExits:JSON.stringify(this.stationExits)
                 })
                 .then( res => {
                     const msg = res.body
                     if(msg.success){
                     this.$message.success({
                        message: '保存成功'
                      });

                     }else{
                     this.$message.error({
                        message: '保存失败'
                      });
                     }

                 }, res => {
                    this.$message.error({message: res.statusText });
                 })
           },
            //监听上传图片
            fileUploaded (res){
              if(res.filePath){
                  this.stationInfo.imgPath = res.filePath;
                  this.stationInfo.imgUrl = res.path;
              }else{
                this.$message.error({message: '图片上传失败!'});
              }
            },
        }

    }
</script>

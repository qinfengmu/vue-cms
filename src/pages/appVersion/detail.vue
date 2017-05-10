<template>

    <add-form class="w705">
      <div slot="detail">
        <dl class="dl2">
          <dt>设备类型：</dt>
          <dd class="default">
            {{data.deviceType == 'GA' ? '安卓' : '苹果'}}
          </dd>
        </dl>

        <dl class="dl2" style="margin-bottom:0;" v-if="data.deviceType == 'GA'">
          <dt>APK文件：</dt>
          <dd class="default">
              <p>{{data.fileUrl}}  <a :href="data.fileUrl" class="blueColor" title="点击下载">下载</a></p>
              <qrcode :size="140"  :value="data.fileUrl"></qrcode>
          </dd>
        </dl>
        <dl v-if="data.deviceType == 'AI'" class="dl2">
          <dt>appStore地址:</dt>
          <dd class="default">{{data.appStoreUrl}}</dd>
        </dl>
        <dl class="dl2">
          <dt>文件大小：</dt>
          <dd class="default">
            {{data.fullSize | storageUnit('MB')}}
          </dd>
        </dl>
        <dl class="dl2">
          <dt>版本名称：</dt>
          <dd  class="default">{{data.versionName}}</dd>
        </dl>
        <dl class="dl2">
          <dt>版本Code：</dt>
          <dd  class="default">{{data.versionCode}}</dd>
        </dl>
        <dl class="dl2">
          <dt>是否强制更新:</dt>
          <dd class="default">
            {{data.isForceUpgrade == 1 ? '是' : '否' }}
          </dd>
        </dl>
        <dl class="dl2">
          <dt>APP简介：</dt>
          <dd class="default">{{data.apkSynopsis}}</dd>
        </dl>
        <dl class="dl2">
          <dt>更新简介：</dt>
          <dd class="default">{{data.updateSynopsis}}</dd>
        </dl>
        <dl class="dl2">
          <dt>上传人：</dt>
          <dd class="default">{{data.opUserName}}</dd>
        </dl>
        <dl class="dl2">
          <dt>上传时间：</dt>
          <dd class="default">{{data.opTime | date('YYYY-MM-DD HH:mm:ss')}}</dd>
        </dl>
        <dl class="dl2" v-if="data.deviceType == 'GA'">
          <dt>增量包：</dt>
          <dd class="default">
            <p v-for="bag in data.increases">{{bag.oldVerCode}} → {{bag.verCode}}<span style="margin:0 15px;">{{bag.increaseSize | storageUnit('MB')}}</span><a :href="bag.increaseUrl" class="blueColor" title="点击下载">下载</a></p>
          </dd>
        </dl>
      </div>
    </add-form>

</template>
<style lang="less" scoped>

</style>
<script>
import addForm from '../../components/addForm'
import Qrcode from 'v-qrcode'
    export default{
        data(){
            return{
                data:{}
            }
        },
        components:{
          addForm,
          Qrcode
        },
        created () {
            this.getDetail();
        },
        methods: {

          getDetail () {
              this.$http.get('/api/apkVersion/view',{params: {id: this.$route.params.id}})
              .then( (res) =>{
                const msg = res.body;
                if(msg.success){
                  this.data = msg.result;
                }

             }, res => {
                this.$message.error({message: res.statusText });
             })
          }

        }
    }
</script>

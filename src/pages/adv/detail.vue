<template>

    <add-form class="w700">
      <div slot="detail">
        <dl>
          <dt>商户名称：</dt>
          <dd class="default">{{data.name}}</dd>
        </dl>
        <!--<dl>-->
          <!--<dt>广告分类：</dt>-->
          <!--<dd class="default">{{data.type}}</dd>-->
        <!--</dl>-->
        <dl>
          <dt>广告描述：</dt>
          <dd class="default">{{data.info}}</dd>
        </dl>
        <dl>
          <dt>广告地址：</dt>
          <dd class="default">{{data.url}}</dd>
        </dl>
        <dl>
          <dt>展示图片：</dt>
          <dd>
            <div class="upload-area">
              <img width="150" :src="data.imgUrl">

            </div>
          </dd>
        </dl>
        <dl>
          <dt>发布时间：</dt>
          <dd class="default">
            {{data.publishTime | date('YYYY-MM-DD HH:mm:ss')}}
          </dd>
        </dl>
        <dl>
          <dt>下线时间：</dt>
          <dd class="default">
            {{ data.offTime | date('YYYY-MM-DD HH:mm:ss')}}
          </dd>
        </dl>

      </div>

    </add-form>

</template>
<style lang="less" scoped>

</style>
<script>
import addForm from '../../components/addForm'
    export default{
        data(){
            return{
                data:{}
            }
        },
        components:{
          addForm
        },
        created () {
            this.getDetail();
        },
        methods: {

          getDetail () {
             this.$http.get('/advertisement/view',{params:{id: this.$route.params.id}})
             .then( (res) =>{
                const msg = res.body;
                if(msg.success){
                  this.data = msg.result;
                }else{
                 this.$message.error({message: '广告不存在'});

                }

             }, res => {
                this.$message.error({message: res.statusText });
             })
          },


        }
    }
</script>

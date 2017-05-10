<template>

    <add-form class="w705">

      <div slot="detail">
        <dl>
          <dt>元素名称：</dt>
          <dd class="default">{{data.elementName}}</dd>
        </dl>
        <dl class="dl2">
          <dt>元素编码：</dt>
          <dd class="default">{{data.elementCode}}</dd>
        </dl>
        <dl>
          <dt>操作人：</dt>
          <dd class="default">{{data.operatorName}}</dd>
        </dl>
        <dl>
          <dt>创建时间：</dt>
          <dd class="default">
            {{data.createTime | date('YYYY-MM-DD HH:mm:ss')}}
          </dd>
        </dl>
        <dl>
          <dt>更新时间：</dt>
          <dd class="default">{{data.updateDate | date('YYYY-MM-DD HH:mm:ss')}}</dd>
        </dl>
        <div v-if="data.elementId" class="button-area">
          <router-link v-cloak :to="{ name: 'editFunc', params: { id: data.elementId }}" class="btn btn-blue">编辑</router-link>
        </div>
      </div>

    </add-form>

</template>
<style lang="less" scoped>
  @import "../../../less/mixins";
  @import "../../../less/variables";
  .mb10 {
    margin-bottom: 10px;
  }

</style>
<script>
import addForm from '../../../components/addForm'
    export default{
        data(){
            return{
                data:{
                }
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
             this.$http.get('/api/permissionElement/view',{params:{id: this.$route.params.id}})
             .then( (res) =>{
                 const msg = res.body;
                  if(msg.success){
                    this.data = msg.result;
                  }else{
                    this.$message.error({message: '元素信息不存在或已被删除!'});
                  }
             })
          }

        }
    }
</script>

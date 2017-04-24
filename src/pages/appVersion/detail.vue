<template>

    <add-form class="w700">
      <div slot="detail">
        <dl>
          <dt>版本号：</dt>
          <dd class="default">{{data.name}}</dd>
        </dl>
        <dl>
          <dt>APP简介：</dt>
          <dd class="default">{{data.type}}</dd>
        </dl>
        <dl>
          <dt>更新简介：</dt>
          <dd class="default">{{data.type}}</dd>
        </dl>
        <dl>
          <dt>文件：</dt>
          <dd class="default">

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

          },


        }
    }
</script>

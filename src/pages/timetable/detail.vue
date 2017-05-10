<template>

    <add-form class="w705">
      <div slot="detail">
        <dl>
          <dt>版本名称：</dt>
          <dd class="default">{{data.name}}</dd>
        </dl>
        <dl>
          <dt>版本描述：</dt>
          <dd class="default">{{data.type}}</dd>
        </dl>
        <dl>
          <dt>时刻表：</dt>
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

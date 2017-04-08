<template>
    <div class="panelWrap">

       <slot></slot>

    </div>
</template>
<style lang="less" scoped>
  @import "../less/mixins";
  @import "../less/variables";
  .panelWrap{
    background: @white;
    padding: 10px 20px;
    margin-bottom: 15px;
  }
  .panelWrap2{
    padding: 15px 20px;
  }
</style>
<script>

    export default{
        data(){
            return{

            }
        }
    }
</script>

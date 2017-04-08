<!--模块布局-->
<template>
    <div class="ui-panel">

      <div class="panel-hd">
        <span class="panel-bar"></span>
        <h3 class="title">
          <slot name="panel-hd"></slot>
        </h3>
      </div>
      <div class="panel-bd">
          <slot name="panel-bd"></slot>
      </div>
    </div>
</template>
<style lang="less" scoped>
  @import "../less/mixins";
  @import "../less/variables";
  .ui-panel{
    padding: 20px;
    margin-bottom: 20px;
    background: @white;

    .panel-hd{
      position: relative;
      padding-left: 25px;
      margin-bottom:20px;
      .title{
        margin: 0;
        line-height:26px;
        height: 26px;
        font-size: 20px;
        font-weight: bold;
        color:#3fa9f5;

      }

    }

    .panel-bar{
      position: absolute;
      left:0;
      top:0;
      display: block;
      width: 5px;
      height: 25px;
      background: #ff931e;
    }
  }
</style>
<script>
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        }
    }
</script>

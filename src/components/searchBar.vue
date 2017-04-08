<!--查询组件-->
<template>
    <div class="search-bar">
         <slot></slot>
    </div>
</template>
<style lang="less" scoped>
  @import "../less/variables";
  @import "../less/mixins";
  .search-bar {
    dl {
        margin:0 20px 0 0;
        display: inline-block;
        .clearfix();
        dt,dd{
          float: left;
        }
        dt{
          padding-right:8px;
          line-height: 36px;
          font-weight: normal;
        }
      }
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

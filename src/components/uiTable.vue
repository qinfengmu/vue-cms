<!--基础表格样式组件 -->
<template>
  <div>
    <table class="table ui-table">
      <slot name="thead">
        <thead>
        <tr>
          <th v-for="head in headerArray" :width="head.width">{{head.name}}</th>
        </tr>
        </thead>
      </slot>
      <slot name="tbody">
      </slot>
    </table>
  </div>
</template>
<style lang="less" scoped>
  @import "../less/variables";
  @import "../less/mixins";

  .ui-table {
    width: 100%;
    margin-bottom: 0;
    tr:nth-child(2n+1) {
      background: #f9f9f9;

    }
    tr {
      &.current {
        background: @defaultBlue;
        color: @white;
      }
    }
    th {
      padding: 0 10px;
      height: 40px;
      line-height: 40px;
      text-align: left;
      background: @tableHeaderBgColor;
      color: @white;
      border: 1px solid @tableBorderColor;
      font-weight: normal;
    }
    tbody {
      td {
        padding: 10px;
        border: 1px solid @tableBorderColor;
        vertical-align: middle;
      }
    }
    .action-td {
      a {
        margin-left: 5px;
      }
    }

  }

</style>
<script>
    export default{
        props:['headerArray'],
        data(){
            return{

            }
        }
    }
</script>

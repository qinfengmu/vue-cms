<!--新建表单-->
<template>

  <div class="form-area">
    <slot name="other"></slot>
    <form v-if="isForm" @submit.prevent="save($event)">
      <slot name="formBody"></slot>
      <slot name="buttonArea">
        <div class="button-area">
          <button type="submit" class="btn btn-blue">保存</button>
          <a href="" class="btn btn-red" @click.prevent="cancel">取消</a>
        </div>
      </slot>
    </form>
    <slot name="detail" v-else>

    </slot>
  </div>


</template>
<style lang="less" scoped>
  @import "../less/variables";
  @import "../less/mixins";

  .form-area {
    padding: 15px 20px;
    background: @white;

    dl {
      margin-bottom: 20px;
      .clearfix();
      dt {
        height: 36px;
        width: 80px;
        line-height: 36px;
        font-weight: normal;
      }
      dd, dt {
        float: left;
      }
      dd {

        min-height: 36px;
        padding-left: 15px;
        &.default {
          padding: 6px 0 6px 10px;
          line-height: 24px;

        }
      }
    }
    .dl2 {

      dt {
        width: 90px;
      }
      dd {
        padding-left: 10px;
      }
    }
    .ipt {
      display: inline-block;
      padding: 5px;
      height: 36px;
      line-height: 26px;
      border: 1px solid @inputBorderColor;
      &.disabled {

        background: #F2F2F2;

      }
    }
    .ipt-large {
      width: 550px;
    }
    .ipt-medium {
      width: 180px;
    }
    .ipt-small {

      width: 70px;
    }
  }

  .upload-area {
    padding-top: 7px;
    img {
      vertical-align: bottom;
    }
  }

  .upload-img-btn {
    margin: 0;
    color: @defaultBlue;
    text-decoration: underline;
    cursor: pointer;
    font-weight: normal;
  }

  .radio-list {
    .clearfix();
    li {
      float: left;
      margin-right: 20px;
      height: 36px;
      line-height: 36px;
      input[type="checkbox"], input[type="radio"] {
        vertical-align: middle;
        margin: 0;
      }
      label {
        margin-left: 5px;
        cursor: pointer;
        font-weight: normal;
      }
    }
  }

  .showTime {
    margin-top: 5px;
    .ipt {
      &:nth-child(2) {
        margin: 0 10px 0 20px;
      }

    }

  }

  .button-area {
    text-align: right;
    .btn {
      &:nth-child(2) {
        margin-left: 5px;
      }
    }

  }

</style>
<script>
  import panelWrap from './panelWrap'
      export default{
          props: ['isForm'],
          data(){
              return{
              }
          },
          components:{
              panelWrap
          },
          methods: {

              save (e) {

                this.$emit('formSubmit');

              },

              cancel () {

                this.$router.go(-1);

              }

          }
      }
</script>

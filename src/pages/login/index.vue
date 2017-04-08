<template>
  <div class="login">

    <div class="login-area">
      <div class="img">
          <img src="../../assets/imgs/login-logo.png">
      </div>

      <div class="login-form">
          <form>
            <div class="form-item-list">

              <div class="form-item">
                <input placeholder="用户名">
              </div>
              <div class="form-item">
                <input placeholder="密码">
              </div>
              <div class="form-item verify-item">
                <input placeholder="验证码"> <span><img src="../../assets/imgs/verify.jpg"/></span>
              </div>
            </div>
            <button class="btn btn-blue">登录</button>
          </form>
      </div>
    </div>

  </div>
</template>
<style lang="less" scoped>
  @import "../../less/mixins";
  @import "../../less/variables";
  @fontBorder:1px solid #e6e6e6;
  .login{

    height: 100%;
    background: #2b3643;

  }
  .login-area{
    width: 300px;
    margin: 0 auto;
    .img{
      padding-top:70px;
      text-align: center;
    }
  }
  .login-form {
    margin-top:60px;
    .form-item-list{
      border:@fontBorder;
    }
    .btn{
      margin-top:40px;
      height:40px;
      width: 300px;
    }
    .form-item{
      border-bottom: @fontBorder;
    }
    input{
      display: inline-block;
      width: 100%;
      padding-left:20px;
      height: 45px;
      line-height:45px;
      border:none;
    }
    .verify-item{
      .clearfix();
      input{
        float: left;
        width: 205px;
      }
      span{
        display: inline-block;
        padding: 6px 0;
        background: @white;
        width: 93px ;
        border-left:1px solid #ececec;
        cursor: pointer;
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

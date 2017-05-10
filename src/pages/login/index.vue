<template>
  <div class="login">

    <div class="login-area">
      <div class="img">
          <img src="../../assets/imgs/login-logo.png">
      </div>

      <div class="login-form">
          <form @submit.prevent="login">
            <div class="form-item-list">

              <div class="form-item">
                <input placeholder="用户名" type="text" v-model="formObj.loginId">
              </div>
              <div class="form-item">
                <input placeholder="密码" type="password"  v-model="formObj.password">
              </div>
              <div class="form-item verify-item">
                <input placeholder="验证码"  type="text" maxlength="4" v-model.trim="formObj.code"> <span><img @click="changeSrc($event)"  :src="verifyCodeSrc"/></span>
              </div>
            </div>
            <button type="submit" class="btn btn-blue">登录</button>
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

    min-height: 100%;
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
      position: relative;
      //background-color: @white;
      input{
        width: 205px;
      }
       span{
        position: absolute;
        right:0;
        top:0;
        display: inline-block;
        padding: 7px 0;
        background: @white;
        width: 93px ;
        border-left:1px solid #ececec;
        cursor: pointer;
      }
    }
  }
</style>
<script>
    import { mapActions } from 'vuex'
    export default{
        data(){
            return{
                formObj: {
                    loginId: '',
                    password: '',
                    code: ''
                }
            }
        },
        computed: {
          verifyCodeSrc () {
              return this.$store.state.User.verifyCodeUrl;
          }
        },
        methods: {
             login () {

                  if(this.formObj.loginId == ''){
                      this.$message.error({message:'请输入用户名！' });
                      return;
                  }else if(this.formObj.password == ''){
                      this.$message.error({message: '请输入密码！' });
                      return;
                  }else if(this.formObj.code == ''){
                     this.$message.error({message: '请输入验证码！' });
                     return;
                  }
                 this.setLoadingText('正在登录...')
                 this.$http.post('/api/login/login',{obj:JSON.stringify(this.formObj)})
                 .then(res=>{
                     var result = res.body;
                     if(result.success){
                         this.signIn(result.user);
                         this.setElements(result.elements);
                         this.$message.success({message: '登录成功！' });
                         this.$router.replace('/');
                     }else{
                         this.$message.error({message: result.msg });
                         this.changeSrc();
                         this.formObj.code = '';
                     }
                 },res=>{
                    this.$message.error({message: res.statusText });
                 })
                return false;
             },
             changeSrc (obj) {
                this.changeVerify();
             },
             ...mapActions(['signIn','setLoadingText','changeVerify','setElements'])
        }

    }
</script>

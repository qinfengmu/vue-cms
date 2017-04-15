<template>
      <add-form  class="w700" :isForm="true" v-on:formSubmit="save">

        <div slot="formBody" class="form-body">

          <dl>
            <dt>用户名：</dt>
            <dd><input v-model.trim="formObj.userName" class="ipt ipt-large"type="text"/></dd>
          </dl>

          <dl>
            <dt>登录账号：</dt>
            <dd><input v-model.trim="formObj.loginId" class="ipt ipt-large"type="text"/></dd>
          </dl>
          <dl>
            <dt>登录密码：</dt>
            <dd>
              <input v-model.trim="formObj.password" maxlength="16" placeholder="密码必须由6-16位数字、字母、特殊字符组成" class="ipt ipt-large"type="text"/>
              <!--<p class="warn">密码必须由6-16位数字、字母、特殊字符组成</p>-->
            </dd>
          </dl>
          <dl>
            <dt>确认密码：</dt>
            <dd><input v-model.trim="confirmPassword" maxlength="16" placeholder="密码必须由6-16位数字、字母、特殊字符组成" class="ipt ipt-large" type="text"/></dd>
          </dl>
          <dl>
            <dt>手机号码：</dt>
            <dd><input v-model.trim="formObj.phone" maxlength="11" class="ipt ipt-large" type="text"/></dd>
          </dl>
          <dl>
            <dt>邮箱：</dt>
            <dd><input v-model.trim="formObj.email" class="ipt ipt-large"type="text"/></dd>
          </dl>


        </div>

      </add-form>

</template>
<style lang="less" scoped>
  @import "../../../less/mixins";
  @import "../../../less/variables";
  .warn {
      color:@gray;
      margin: 5px 0 0;
  }
</style>
<script>
    import addForm from '../../../components/addForm'
    import patterns from '../../../util/patterns'
    export default{
        data(){
            return{
                confirmPassword: '',
                formObj: {
                    userName: '',
                    loginId: '',
                    phone: '',
                    password: '',
                    email: ''
                }
            }
        },
        computed: {
            isEdit () {
               return this.$route.name == 'editUser';
            }
        },
        created () {
           if(this.isEdit){
             //this.getView();
           }
        },
        components:{
          addForm
        },
        methods: {

            save () {
                if(this.formObj.userName == '' || this.formObj.loginId == '' || this.formObj.phone == '' ||  this.formObj.password == '' || this.confirmPassword == '' || this.formObj.email == ''){
                     this.$message.error({ message: '信息不完整！'});
                     return;
                }

                if(this.formObj.password.length < 6 ){
                     this.$message.error({ message: '密码长度不能小于6位！'});
                     return;
                }else{
                    console.log(patterns.letters(this.formObj.password))
                    console.log(!patterns.number(this.formObj.password))
                    console.log(!patterns.spechars(this.formObj.password))
                    if(!patterns.letters(this.formObj.password) || !patterns.number(this.formObj.password)  || !patterns.spechars(this.formObj.password)){
                        this.$message.error({ message: '密码必须包含字母、数字、特殊字符！'});
                        return;
                    }

                    if(this.formObj.password != this.confirmPassword){
                        this.$message.error({ message: '两次输入的密码不一致！'});
                        return;
                    }
                }

                if(this.formObj.phone != '' && !patterns.mobile(this.formObj.phone)){
                      this.$message.error({ message: '手机号码格式不正确！'});
                      return;
                }
                if(this.formObj.email != '' && !patterns.email(this.formObj.email)){
                      this.$message.error({ message: '邮箱地址格式不正确！'});
                      return;
                }
                const url = this.isEdit ? '/api/user/update' : '/api/user/insert';


                this.$http.post(url,{obj:JSON.stringify(this.formObj)})
                 .then( res => {
                     const msg = res.body
                     if(msg.success){
                        this.$message.success({ message: '保存成功' });
                        this.$router.replace('/system/user');
                     }else{
                         this.$message.error({ message: '保存失败' });
                     }
                 }, res => {
                    this.$message.error({message: res.status+'-'+res.statusText });
                 })

            },

            getView () {
                 const id = this.$route.params.id || "";
                 this.$http.get('/api/user/view',{params:{id: id}})
                 .then( (res) =>{
                    const msg = res.body;
                    if(msg.success){
                        this.formObj = msg.result;
                    }else{
                        this.$message.error({ message: '用户信息不存在！' });
                    }
                 }, res => {
                    this.$message.error({message: res.status+'-'+res.statusText });
                 })
            },

        }
    }
</script>

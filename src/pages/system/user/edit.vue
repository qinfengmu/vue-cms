<template>
      <add-form  class="w700" :isForm="true" v-on:formSubmit="save">

        <div slot="formBody" class="form-body">

          <dl>
            <dt>用户名：</dt>
            <dd><input v-model.trim="formObj.userName" class="ipt ipt-large" type="text"/></dd>
          </dl>

          <dl>
            <dt>登录账号：</dt>
            <dd><input v-model.trim="formObj.loginId" readonly class="ipt ipt-large disabled" type="text"/></dd>
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
                formObj: {
                    userId: '',
                    userName: '',
                    loginId: '',
                    phone: '',
                    password: '',
                    email: ''
                }
            }
        },

        created () {
           this.getView();
        },
        components:{
          addForm
        },
        methods: {

            save () {
                if(this.formObj.userName == '' ||  this.formObj.phone == '' || this.formObj.email == ''){
                     this.$message.error({ message: '信息不完整！'});
                     return;
                }

                if(this.formObj.phone != '' && !patterns.mobile(this.formObj.phone)){
                      this.$message.error({ message: '手机号码格式不正确！'});
                      return;
                }
                if(this.formObj.email != '' && !patterns.email(this.formObj.email)){
                      this.$message.error({ message: '邮箱地址格式不正确！'});
                      return;
                }
                const url =  '/api/user/update';


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
                    this.$message.error({message: res.statusText });
                 })

            },

            getView () {
                 const id = this.$route.params.id || "";
                 this.$http.get('/api/user/view',{params:{id: id}})
                 .then( (res) =>{
                    const msg = res.body;
                    if(msg.result){
                        this.formObj = msg.result;
                    }else{
                        this.$message.error({ message: '用户信息不存在！' });
                    }
                 }, res => {
                    this.$message.error({message: res.statusText });
                 })
            },

        }
    }
</script>

<template>
      <add-form  class="w705" :isForm="true" v-on:formSubmit="save">

        <div slot="formBody" class="form-body">

          <dl>
            <dt>元素名称：</dt>
            <dd>
              <input v-model="formObj.elementName" class="ipt ipt-large" type="text"/>

            </dd>
          </dl>
          <dl>
            <dt>元素编码：</dt>
            <dd>
              <input v-model="formObj.elementCode" class="ipt ipt-large" type="text"/>
            </dd>
          </dl>
        </div>

      </add-form>

</template>
<style lang="less" scoped>
  @import "../../../less/mixins";
  @import "../../../less/variables";

</style>
<script>
    import addForm from '../../../components/addForm'
    export default{
        data(){
            return{
                confirmPassword: '',
                formObj: {
                    elementName: '',
                    elementCode: ''
                }
            }
        },
        computed: {
            isEdit () {
                return this.$route.name == 'editElement';
            }
        },
        components:{
          addForm
        },
        created () {
            if(this.isEdit) {
                this.getView();
            }
        },
        methods: {

            save () {

                if(this.formObj.elementName == '') {
                     this.$message.error({ message: '请输入元素名称！'});
                     return;
                }else if(this.formObj.elementCode == '') {
                     this.$message.error({ message: '请输入元素编码！'});
                     return;
                }

                const url = this.isEdit ? '/api/permissionElement/update' :'/api/permissionElement/insert';
                this.$http.post(url,{obj:JSON.stringify(this.formObj)})
                 .then( res => {
                     const msg = res.body
                     if(msg.success){
                        this.$message.success({ message: '保存成功' });
                        this.$router.replace('/permission/element');
                     }else{
                         this.$message.error({ message: '保存失败' });
                     }
                 }, res => {
                    this.$message.error({message: res.statusText });
                 })
            },
            getView () {
                this.$http.get('/api/permissionElement/view',{params: {id: this.$route.params.id}})
                .then(res => {
                      const msg = res.body;
                      if(msg.success){
                        this.formObj = msg.result;
                      }else{
                       this.$message.error({message: '元素信息不存在'});
                      }
                },res => {
                    this.$message.error({message: res.statusText });
                })
            }
    }


    }
</script>

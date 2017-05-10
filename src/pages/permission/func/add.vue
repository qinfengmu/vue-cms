<template>
      <add-form  class="w705" :isForm="true" v-on:formSubmit="save">

        <div slot="formBody" class="form-body">

          <dl>
            <dt>URL名称：</dt>
            <dd>
              <input v-model="formObj.functionName" class="ipt ipt-large" type="text"/>

            </dd>
          </dl>
          <dl>
            <dt>元素编码：</dt>
            <dd>
              <input v-model="formObj.functionCode" class="ipt ipt-large" type="text"/>
            </dd>
          </dl>
          <dl>
            <dt>url地址：</dt>
            <dd>
              <input v-model="formObj.functionUrl" class="ipt ipt-large" type="text"/>
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
                    functionName: '',
                    functionCode: ''
                }
            }
        },
        computed: {
            isEdit () {
                return this.$route.name == 'editFunc';
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

                if(this.formObj.functionName == '') {
                     this.$message.error({ message: '请输入URL名称！'});
                     return;
                }else if(this.formObj.functionCode == '') {
                     this.$message.error({ message: '请输入URL编码！'});
                     return;
                }else if(this.formObj.functionUrl == '') {
                     this.$message.error({ message: '请输入URL地址！'});
                     return;
                }

                const url = this.isEdit ? '/api/permissionFunction/update' :'/api/permissionFunction/insert';
                this.$http.post(url,{obj:JSON.stringify(this.formObj)})
                 .then( res => {
                     const msg = res.body
                     if(msg.success){
                        this.$message.success({ message: '保存成功' });
                        this.$router.replace('/permission/func');
                     }else{
                         this.$message.error({ message: '保存失败' });
                     }
                 }, res => {
                    this.$message.error({message: res.statusText });
                 })
            },
            getView () {
                this.$http.get('/api/permissionFunction/view',{params: {id: this.$route.params.id}})
                .then(res => {
                      const msg = res.body;
                      if(msg.success){
                        this.formObj = msg.result;
                      }else{
                       this.$message.error({message: 'URL信息不存在'});
                      }
                },res => {
                    this.$message.error({message: res.statusText });
                })
            }
        }

    }
</script>

<template>
  <add-form  style="width:auto; padding:0;" :isForm="true" v-on:formSubmit="save">
    <div slot="formBody" class="form-body">
        <div class="row">
        <div class="col-md-6">
          <h5 class="fb">添加节点</h5>
          <dl>
            <dt>
              上级节点：
            </dt>
            <dd class="default">
              {{parentNodeName}}
            </dd>
          </dl>
          <dl>
            <dt>
              节点名称：
            </dt>
            <dd>
              <input v-model="formObj.permissionName" @blur="checkNodeIsExist" class="ipt" type="text" >
            </dd>
          </dl>
          <dl>
            <dt>
              元素：
            </dt>
            <dd>
              <textarea v-model="elementNames" class="ipt ipt-area" readonly></textarea>
            </dd>
          </dl>
          <dl>
            <dt>
              URL：
            </dt>
            <dd>
              <textarea v-model="functionNames" class="ipt ipt-area" readonly></textarea>
            </dd>
          </dl>
          <dl>
            <dt>
              说明：
            </dt>
            <dd>
              <textarea v-model="formObj.permissionDescription" class="ipt ipt-area" ></textarea>
            </dd>
          </dl>
        </div>
        <div class="col-md-6">
          <el-tabs v-model="activeName2" type="card" @tab-click="">
            <el-tab-pane label="元素" name="first">
              <el-table
                ref="elementTable"
                :data="elementData"
                height="590"
                border
                @selection-change="elementSelectionChange"
                style="width: 100%">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  prop="elementName"
                  label="元素名称"
                >
                </el-table-column>
                <el-table-column
                  prop="elementCode"
                  label="元素编码"
                >
                </el-table-column>
              </el-table>

            </el-tab-pane>
            <el-tab-pane label="URL" name="second">
              <el-table
                ref="functionTable"
                :data="functionData"
                height="590"
                border
                @selection-change="functionSelectionChange"
                style="width: 100%">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  prop="functionName"
                  label="URL名称"
                >
                </el-table-column>
                <el-table-column
                  prop="functionCode"
                  label="URL编码"
                >
                </el-table-column>
              </el-table>
            </el-tab-pane>

          </el-tabs>
        </div>
        </div>
      </div>
  </add-form>

</template>
<style lang="less" scoped>
  @import "../../../less/mixins";
  @import "../../../less/variables";
  .node-form {
    dl {
      dd {
        width:  80%;
        padding-left: 0;
      }
    }
    .ipt {
      width: 100%;
    }
    .ipt-area {
      height: 150px;
    }
  }
</style>
<script>
    import panelWrap from '../../../components/panelWrap'
    import addForm from '../../../components/addForm'
    import { mapActions } from 'vuex'
    import _ from 'lodash'
    export default{
        data(){
            return{
              activeName2: 'first',
              //上级节点
              parentNodeName: '',
              elementIds: [],
              elementNames: [],
              functionIds:[],
              functionNames:[],
              permissionNameIsExist: false,
              formObj: {
                permissionName: '',
                parentPermissionId: '',
                permissionDescription: ''
              },
               //元素表数据
              elementData: [],
              //url表数据
              functionData: []
            }
        },
        components:{
            panelWrap,
            addForm
        },
        beforeRouteUpdate (to, from, next){
            this.getElement();
            this.getFunctions();

            this.formObj.parentPermissionId = to.query.permissionId;
            this.getView();
            //重置数据
            this.activeName2= 'first';
            this.permissionNameIsExist = false;
            this.formObj.permissionName = '';
            this.formObj.permissionDescription = '';
            next();
        },
        computed: {
        },
        created (){
           this.formObj.parentPermissionId = this.$route.query.permissionId;
           this.getElement();
           this.getFunctions();
           this.getView();
        },
        methods: {
            ...mapActions(['setShowLoading']),
             //检查节点名称是否存在
             checkNodeIsExist () {
                if(this.formObj.permissionName != ''){
                    //隐藏loading
                    this.setShowLoading(false);
                    this.$http.post('/api/permissionType/checkPermissionTypeName',{obj: JSON.stringify(this.formObj)})
                     .then( res => {
                         const msg = res.body
                         if(msg.success){
                          this.permissionNameIsExist = false;
                         }else{
                          this.permissionNameIsExist = true;
                           this.$message.error({message: msg.msg});
                         }
                     }, res => {
                        this.$message.error({message: res.statusText });
                     })
                }
             },
            //获取所有元素数据
            getElement () {
               this.$http.get('/api/permissionElement/getAllLists',{params:{}})
               .then( (res) =>{
                  const msg = res.body;
                  if(msg.success){
                    this.elementData = msg.result;
                  }

               }, res => {
                  this.$message.error({message: res.statusText });
               })
            },
            //获取所有url数据
            getFunctions () {
               this.$http.get('/api/permissionFunction/getAllLists',{params:{}})
               .then( (res) =>{
                  const msg = res.body;
                  if(msg.success){
                    this.functionData = msg.result;
                  }
               }, res => {
                  this.$message.error({message: res.statusText });
               })
            },
            //勾选元素
            elementSelectionChange (val) {
                this.elementIds = [];
                this.elementNames = [];
                Object.keys(val).forEach( (key) => {
                    this.elementIds.push(val[key].elementId);
                    this.elementNames.push(val[key].elementName);
                })
            },
            //勾选url
            functionSelectionChange (val) {
                this.functionIds = [];
                this.functionNames = [];
                Object.keys(val).forEach( (key) => {
                    this.functionIds.push(val[key].functionId);
                    this.functionNames.push(val[key].functionName);
                })
            },
            getView () {
               this.$http.get('/api/permissionType/view',{params:{permissionId: this.formObj.parentPermissionId}})
               .then( (res) =>{
                  const msg = res.body;
                  if(msg.success){
                    this.parentNodeName = msg.result.permissionName;
                  }else{
                    this.$message.error({message: '节点信息不存在或已被删除！' });
                    this.$router.push('/permission/list');
                  }

               }, res => {
                  this.$message.error({message: res.statusText });
               })
            },
            //添加节点
            save() {

              if(this.formObj.permissionName == ''){
                this.$message.error({message: '请输入节点名称!'});
                return;
              }else if(this.permissionNameIsExist){
                this.$message.error({message: '节点名称已存在!'});
                return;
              }
               const url = '/api/permissionType/insert';
               this.$http.post(url,{obj: JSON.stringify(this.formObj),elements:this.elementIds.toString(),functions:this.functionIds.toString()})
               .then( res => {
                   const msg = res.body
                   if(msg.success){
                      this.$message.success({message:  '添加节点成功'});
                      this.$router.push('/permission/list');
                   }else{
                     this.$message.error({message: '添加节点失败!'});
                   }
               }, res => {
                  this.$message.error({message: res.statusText });
               })
            },
        }
    }
</script>

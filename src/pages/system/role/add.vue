<template>
      <add-form  class="w705" :isForm="true" v-on:formSubmit="save">

        <div slot="formBody" class="form-body">

          <dl>
            <dt>角色名称：</dt>
            <dd>
              <input v-model.trim="formObj.roleName" class="ipt ipt-large"type="text"/>

            </dd>
          </dl>
          <dl>
            <dt>人员设置：</dt>
            <dd class="clearfix">
              <div class="l">
                <p>角色人员</p>
                <select v-model="rolesSelect" multiple style="width: 200px;height:200px;">
                  <option v-for="role in roles" :value="role">{{role.userName}}</option>
                </select>
              </div>
              <div class="l arrow">
                <p class="rightArrow"><i @click="moveRight" class="iconfont icon-leftArrow" :class="{'selected': rolesSelect != ''}" ></i></p>
                <p><i @click="moveLeft" class="iconfont icon-leftArrow" :class="{'selected': allRolesSelect != ''}"></i></p>
              </div>
              <div class="l">
                <p>所有人</p>
                <select v-model="allRolesSelect" multiple style="width: 200px;height:200px;">
                  <option v-for="role in allRoles" :value="role">{{role.userName}}</option>
                </select>
              </div>
            </dd>
          </dl>
          <dl>
            <dt>权限设置：</dt>
            <dd style="width:580px">
                <el-tree
                ref="tree"
                :data="treeData"
                :props="props"
                node-key="permissionId"
                show-checkbox
                default-expand-all
                expand-on-click-node
                @check-change="handleCheckChange" >
              </el-tree>

            </dd>
          </dl>
          <dl>
            <dt>说明：</dt>
            <dd>
              <textarea v-model="formObj.roleDescription" class="ipt ipt-large" style="height:200px;"></textarea>

            </dd>
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
  .l {
    width: 200px;
    float: left;
  }
  .arrow {
    width: 165px;
    padding-top:50px;
    text-align: center;
    i{
      font-size: 36px;
      cursor: pointer;
      color:@gray;
      &.selected {
        color:@defaultBlue;
      }
    }
    .rightArrow {
      -webkit-transform: rotate(180deg);
      -moz-transform: rotate(180deg);
      transform: rotate(180deg);
    }
  }
</style>
<script>
    import addForm from '../../../components/addForm'
    import patterns from '../../../util/patterns'
    import _ from 'lodash'
    export default{
        data(){
            return{
                allRolesSelect: [],
                allRoles: [],
                roles: [],
                rolesSelect: [],
                formObj: {
                    roleName: '',
                    roleDescription: ''
                },
                treeData: [],
                props: {
                  children: 'children',
                  label: 'permissionName'
                },
                count: 1
            }
        },
        components:{
          addForm
        },
        computed: {
          isEdit () {
             return this.$route.name == 'editRole'
          }
        },
        created () {
            this.getTree(() =>{
                this.getView();
            });
            if(!this.isEdit){
              this.getAllRoles();
            }
        },
        mounted () {
            if(this.isEdit){

            }
        },
        methods: {

            save () {
                let userIds = [];
                const permissionIds = this.$refs.tree.getCheckedKeys();
                this.roles.forEach( key => {
                    userIds.push(key.userId);
                });

                if(this.formObj.roleName == ''){
                    this.$message.error({ message: '请输入角色名称！' });
                    return;
                }else if( userIds == ''){
                    this.$message.error({ message: '请选择角色成员！' });
                    return;
                }else if( permissionIds == ''){
                    this.$message.error({ message: '请设置角色权限！' });
                    return;
                }

                const url = this.isEdit ? '/api/role/update' :  '/api/role/insert';
                this.$http.post(url,{obj:JSON.stringify(this.formObj),userIds:userIds.toString(),permissionIds:permissionIds.toString()})
                 .then( res => {
                     const msg = res.body
                     if(msg.success){
                        this.$message.success({ message:this.isEdit ? '更新成功！' : '添加成功' });
                        this.$router.replace('/system/role');
                     }else{
                         this.$message.error({ message:this.isEdit ? '更新失败' :'添加失败' });
                     }
                 }, res => {
                    this.$message.error({message: res.statusText });
                 })
            },
            moveLeft () {
               this.allRolesSelect.forEach( (key,index)=> {
                  this.roles.push(key);
                  this.allRoles = _.reject(this.allRoles,key);
               });
               this.allRolesSelect = [];
            },
            moveRight () {
                this.rolesSelect.forEach( (key,index)=> {
                  this.allRoles.push(key);
                  this.roles = _.reject(this.roles,key);
               });
               this.rolesSelect = [];
            },
            getAllRoles () {
               this.$http.get('/api/role/openAddRolePage')
               .then( (res) =>{
                  const msg = res.body;
                  //if(msg.success){
                    this.allRoles = msg.user;
                  //}else{
                  //  this.$message.error({message: '获取人员数据信息错误'});
                  //}
               }, res => {
                  this.$message.error({message: res.statusText });
               })

            },
            getTree (cb) {
               this.$http.get('/api/permissionType/getTree',{params:{}})
               .then( (res) =>{
                  const msg = res.body;
                  if(msg.success){
                    this.treeData = msg.result;
                    if(this.isEdit){
                       cb();
                    }
                  }

               }, res => {
                  this.$message.error({message: res.statusText });
               })

            },
            handleCheckChange(data, checked, indeterminate) {
                const permissionId = data.permissionId;
                this.getParentId(permissionId);
            },

            //这样写已经破坏了组件的check-strictly
            getParentId (permissionId) {
                const node = this.$refs.tree.store.nodesMap[permissionId];
                const parent = node.parent;
                //console.log(node)
                if(!parent || parent.level == 0) return;
                //因为在checkchange中触发事件，所以子节点状态发生改变时又将状态设置成true，
                this.$refs.tree.setChecked(parent.data,true);
                //parent.setChecked(true);
                this.getParentId(parent.data.permissionId);
            },

            //获取编辑详情
            getView () {
               const _this = this;
               this.$http.get('/api/role/view',{params:{roleId: this.$route.params.id}})
               .then( (res) =>{
                   const msg = res.body;
                    if(msg.success){
                      //this.data = msg;
                      this.allRoles = msg.userAll;
                      this.roles = msg.users;
                      this.formObj = msg.role;
                      msg.permissions.forEach( key => {
                          _this.$refs.tree.setChecked(key,true);
                      })
                    }else{
                      this.$message.error({message: '角色信息不存在或已被删除!'});
                    }
             })
          }


    }


    }
</script>

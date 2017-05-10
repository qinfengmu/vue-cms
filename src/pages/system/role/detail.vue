<template>

    <add-form class="w705">
      <div slot="detail">
        <dl>
          <dt>角色名称：</dt>
          <dd class="default">{{data.role.roleName}}</dd>
        </dl>
        <dl>
          <dt>角色成员：</dt>
          <dd>
            <select multiple style="width: 200px;height:200px;">
              <option v-for="role in data.users" :value="role">{{role.userName}}</option>
            </select>
          </dd>
        </dl>
        <dl>
          <dt>说明：</dt>
          <dd class="default">
            {{data.role.roleDescription}}
          </dd>
        </dl>
        <dl>
          <dt>创建时间：</dt>
          <dd class="default">
            {{data.role.createTime | date('YYYY-MM-DD HH:mm:ss')}}
          </dd>
        </dl>
        <div class="text-right"  v-if="data.role.roleId">
          <router-link :to="{name: 'editRole',params:{id:data.role.roleId}}" class="btn btn-blue">编辑</router-link>
        </div>
      </div>

    </add-form>

</template>
<style lang="less" scoped>

</style>
<script>
import addForm from '../../../components/addForm'
    export default{
        data(){
            return{
                data:{
                  role: {
                    roleId:''
                  }
                }
            }
        },
        components:{
          addForm
        },
        created () {
            this.getDetail();
        },
        methods: {
          getDetail () {
             this.$http.get('/api/role/view',{params:{roleId: this.$route.params.id}})
             .then( (res) =>{
                 const msg = res.body;
                  if(msg.success){
                    this.data = msg;
                  }else{
                    this.$message.error({message: '角色信息不存在或已被删除!'});
                  }
             })
          }

        }
    }
</script>

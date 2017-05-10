<template>
  <add-form  style="width:auto; padding:0;" >
    <div slot="detail">
        <div class="row">
        <div class="col-md-6">
          <h5 class="fb">节点详情</h5>
          <dl>
            <dt>
              上级节点：
            </dt>
            <dd class="default">
              {{data.parentName}}
            </dd>
          </dl>
          <dl>
            <dt>
              节点名称：
            </dt>
            <dd class="default">
              {{data.permissionName}}
            </dd>
          </dl>
          <dl>
            <dt>
              元素：
            </dt>
            <dd class="default">
              {{data.elementNames}}
            </dd>
          </dl>
          <dl>
            <dt>
              URL：
            </dt>
            <dd class="default">
              {{data.functionUrls}}
            </dd>
          </dl>
          <dl>
            <dt>创建时间：</dt>
            <dd class="default">
              {{data.createTime | date('YYYY-MM-DD HH:mm:ss')}}
            </dd>
          </dl>
          <dl>
            <dt>
              说明：
            </dt>
            <dd class="default">
              {{data.permissionDescription}}
            </dd>
          </dl>
          <div v-if="data.permissionId">
            <a class="btn btn-blue" @click="edit(data)">编辑</a>
          </div>
        </div>
        <div class="col-md-6">

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
    export default{
        data(){
            return{
              //上级节点
              data: {
                parentName: '',
                elementNames: '',
                functionNames: '',
                permissionName: '',
                functionUrls: '',
                parentPermissionId: '',
                permissionDescription: ''
              }

            }
        },
        components:{
            panelWrap,
            addForm
        },
        created (){
           this.getView();
        },
        watch: {
          // 如果路由有变化，会再次执行该方法
          '$route': 'getView'
        },
        methods: {
            //获取所有元素数据
            getView () {
               this.$http.get('/api/permissionType/view',{params:{permissionId: this.$route.params.id}})
               .then( (res) =>{
                  const msg = res.body;
                  if(msg.success){
                    this.data = msg.result;
                  }else{
                    this.$message.error({message: '节点不存在或已被删除！'});
                    this.$router.push('/permission/list');
                  }
               }, res => {
                  this.$message.error({message: res.statusText });
               })
            },
            edit (data) {
               this.$router.push({name: 'editPermissionNode',params: {id: data.permissionId}});
            }

        }
    }
</script>

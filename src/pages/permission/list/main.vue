<template>

  <panel-wrap class="panelWrap2">
    <div class="row">
        <div class="col-md-3">
            <h5 class="fb">系统模块</h5>

          <el-tree
            :data="permissionData"
            :props="defaultProps"
            default-expand-all
            node-key="permissionId"
            @node-click="treeNodeClick"
            :expand-on-click-node="false"
            :render-content="renderContent">
          </el-tree>
        </div>
        <div class="col-md-9 node-form">
          <router-view></router-view>
        </div>
    </div>

  </panel-wrap>

</template>
<style lang="less" scoped>

</style>
<script>
import panelWrap from '../../../components/panelWrap'
  export default{
      data(){
          return{
              //树节点数据
              permissionData: [],
             // permissionId: 1,
              defaultProps: {
                children: 'children',
                label: 'permissionName'
              }
          }
      },
      created () {
        this.getTree();
      },
      beforeRouteUpdate (to, from, next) {
         if(from.name == 'addPermissionNode' || from.name == 'editPermissionNode') {
            this.getTree();
         }
         next();
      },
      components:{
        panelWrap
      },
      methods: {
        //获取树节点数据
        getTree (page,obj) {
         this.$http.get('/api/permissionType/getTree',{params:{}})
           .then( (res) =>{
              const msg = res.body;
              if(msg.success){
                this.permissionData = msg.result;
              }

           }, res => {
              this.$message.error({message: res.statusText });
           })
        },
        treeNodeClick (data, node, component) {
          if(node.level > 1){
            this.$router.push({name:'permissionNodeDetail',params:{id:data.permissionId}});
          }
        },
        append(evt,store, data) {
            this.$router.push({path:'/permission/list/add',query:{permissionId:data.permissionId}});
            evt.stopPropagation();
        },

         //移除节点
        remove(evt,store, data) {
            evt.stopPropagation();
            this.$messageBox.confirm('确定要删除节点？','提示',{
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
            }).then( () => {
                  this.$http.post('/api/permissionType/delete',{permissionId: data.permissionId})
                 .then( res => {
                     const msg = res.body
                     if(msg.success){
                        this.$message.success({message: '节点删除成功'});
                        store.remove(data);
                        this.$router.push('/permission/list');
                     }else{
                       this.$message.error({message: '节点删除失败!'});
                     }
                 }, res => {
                    this.$message.error({message: res.statusText });
                 })
            }).catch(() => {});
        },

        renderContent(h, { node, data, store }) {
            let delHtm = node.level != 1 ? <a title="删除节点" href="javascript:;" class="iconfont icon-cross red-fontIcon fz22" style="margin-left:5px" on-click={ (event) => this.remove(event,store, data) }></a> : '';
            return (
            <span>
              <span>
                <span>{node.label}</span>
              </span>
              <span style="float: right; margin-right: 10px">
                <a title="添加节点" href="javascript:;" class="iconfont icon-plus blue-fontIcon fz22" on-click={ (event) => this.append(event,store, data) }></a>{delHtm}
              </span>
            </span>);
        },
      }
  }
</script>

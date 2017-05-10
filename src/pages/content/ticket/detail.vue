<template>
  <add-form class="w705">

    <div slot="detail">
      <dl class="dl2">
        <dt>标题：</dt>
        <dd class="default">{{data.title}}</dd>
      </dl>
      <dl class="dl2">
        <dt>分类信息：</dt>
        <dd class="default">{{data.classify | classifyTxt(classifyArr)}}</dd>
      </dl>
      <dl class="dl2">
        <dt>封面图片：</dt>
        <dd class="default">
          <img width="198" height="110" :src="data.imgUrl">
        </dd>
      </dl>
      <dl class="dl2">
        <dt>信息来源：</dt>
        <dd class="default">{{data.sourceInfo}}</dd>
      </dl>
      <dl class="dl2">
        <dt>作者：</dt>
        <dd class="default">{{data.author}}</dd>
      </dl>
      <dl class="dl2">
        <dt>显示状态：</dt>
        <dd class="default"><span :class="{blueColor:data.state, redColor: !data.state}">{{data.state ? '可见': '不可见'}}</span></dd>
      </dl>
      <dl v-if="data.url" class="dl2">
        <dt>内容页链接:</dt>
        <dd class="default">
          {{data.url}}
        </dd>
      </dl>
      <dl v-else class="dl2">
        <dt>文本内容：</dt>
        <dd class="default">
          <div class="edit-area" style="padding: 10px; width: 560px; height: 400px; overflow-y:auto;border:1px solid #dcdcdc" v-html="data.content">
          </div>
        </dd>
      </dl>
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
                data: {

                }
            }
        },
        created (){
            this.getDetail();
        },
        computed: {
           classifyArr () {
              return this.$store.state.classify.ticketArr;
           }
        },
        components:{
            addForm
        },
        methods: {
            getDetail () {
             this.$http.get('/api/ticketKnow/view',{params:{id: this.$route.params.id}})
             .then( (res) =>{
                const msg = res.body;
                if(msg.success){
                  this.data = msg.result;
                }else{
                 this.$message.error({message: '内容不存在或已经被删除！'});
                }

             }, res => {
                this.$message.error({message: res.statusText });
             })
          }
        }

    }

</script>

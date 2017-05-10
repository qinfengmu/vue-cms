<!--面包屑导航-->
<template>
    <div class="bread-crumbs">
        <ul>
          <li>当前位置：</li>
          <li v-for="(router,index) in routerList">
            <router-link v-if="index > 0" :to="router.path || '/'"><em v-if="index > 1 && router.meta.text!=''">></em>{{router.meta.text}}</router-link>
          </li>
        </ul>

    </div>
</template>
<style lang="less" scoped>
  @import "../less/variables";
  @import "../less/mixins";
  @fontColor: #808080;
  .bread-crumbs{
    padding:10px 15px;
    margin-bottom: 15px;
    background: @white;
    color:@fontColor;
    font-size:12px;
    a{
      color:@fontColor;
      text-decoration: none;
    }
    ul{
      .clearfix();
      li {
        float: left;
      }
      em{
        margin: 0 5px;
      }
    }

  }
</style>
<script>
  import { mapGetters } from 'vuex'
    export default{
        data(){
            return{

            }
        },
        computed: {
            ...mapGetters({
              routerList: 'getBreadCrumbs'
            })
        }
    }
</script>

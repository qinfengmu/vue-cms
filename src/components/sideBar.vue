<!--侧边导航-->
<template>
    <div class="ui-sidebar">
        <div class="sidebar-nav">
            <div class="sidebar-nav-tree">
                <div class="sidebar-nav-item sidebar-nav-item-0" @click="nav.showSubNav = !nav.showSubNav" v-for="nav in navList">
                    <router-link :to="nav.url" class="sidebar-nav-item"><i :class="[iconFont,nav.iconClass]"></i><span>{{nav.name}}</span></router-link>
                    <div  v-if="nav.showSubNav" class="sidebar-subnav" @click.stop="">
                        <div class="sidebar-nav-tree" >
                            <div class="sidebar-nav-item sidebar-nav-item-1" v-for="subNav in nav.subNav">
                              <router-link  :to="subNav.url" class="sidebar-nav-item"><span>{{subNav.name}}</span></router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
  @import "../less/variables";
  @import "../less/mixins";

  .ui-sidebar{
    position: fixed;
    width: 230px;
    left: 0;
    top:80px;
    bottom: 0;
    background: #364150;
    overflow: auto;
    z-index: 10;
  }

  .sidebar-nav{

    .sidebar-nav-item{

      a{
        display: block;
        padding-left:20px;
        line-height:55px;
        min-height:55px;
        text-decoration: none;
        color:#b4bcc8;
        .clearfix();
      }
      .iconfont {
        float: left;
        width:22px;
        margin-right: 15px;
      }
      &.sidebar-nav-item-0{
        border-bottom:1px solid #455868 ;
        >.router-link-active{
          color:@white;
          background: #054c93;
          border-right:5px solid #ff931e;
        }
      }
    }
    .sidebar-subnav{
      background-color: #e2e6ef;
      a{
        padding-left:60px;
        color:#888;
        line-height:45px;
        min-height: 45px;
        font-size:12px;
        &.router-link-active{
          color:@white;
          background: #3fa9f5;
        }
      }
    }
  }

</style>
<script>
import { mapGetters } from 'vuex'
    export default{
        data() {
            return{
              iconFont : 'iconfont'
            }
        },
        computed: {
            ...mapGetters({
              navList: 'getSidebarList'
            })
        }
    }
</script>

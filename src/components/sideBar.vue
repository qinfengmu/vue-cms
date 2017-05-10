<!--侧边导航-->
<template>
    <div class="ui-sidebar">
        <div class="sidebar-nav">
            <div class="sidebar-nav-tree">
                <div v-if="nav.visible" class="sidebar-nav-item sidebar-nav-item-0" @click="nav.showSubNav = !nav.showSubNav" v-for="nav in filterNavList">

                  <div v-if="nav.subNav"  class="nav-title" :class="{'router-link-active': activeLink(nav.url)}">
                      <i :class="[iconFont,nav.iconClass]"></i><span>{{nav.name}}</span>
                      <i class="iconfont icon-arrowdown" :class="{'icon-arrowup':nav.showSubNav}"></i>
                    </div>
                    <router-link v-else :to="nav.url"  class="sidebar-nav-item">
                      <i :class="[iconFont,nav.iconClass]"></i><span>{{nav.name}}</span>
                    </router-link>

                    <div  v-if="nav.showSubNav" class="sidebar-subnav" @click.stop="">
                        <div class="sidebar-nav-tree" >
                            <div class="sidebar-nav-item sidebar-nav-item-1" v-if="subNav.visible" v-for="subNav in nav.subNav">
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
    overflow-y: auto;
    z-index: 10;
    overflow-x: hidden;
  }

  .sidebar-nav{

    .sidebar-nav-item{
      position: relative;
      a,.nav-title{
        position: relative;
        display: block;
        padding-left:20px;
        line-height:55px;
        min-height:55px;
        text-decoration: none;
        color:#b4bcc8;
        cursor: pointer;
        .clearfix();
      }
      .iconfont {
        float: left;
        width:22px;
        margin-right: 15px;
      }
      .icon-arrowdown {
          position: absolute;
          right: 15px;
          width: 17px;
          margin: 0;
          transition:transform .5s;
        }
      .icon-arrowup {
        -webkit-transform: rotate(180deg);
        -moz-transform: rotate(180deg);
        transform: rotate(180deg);
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
import _ from 'lodash'
    export default{
        data() {
            return{
              iconFont : 'iconfont'
            }
        },
        computed: {
            ...mapGetters({navList: 'getSidebarList',elements:'getElements'}),
            filterNavList () {
               this.navList.forEach((nav,  key) => {
                    if(this.$route.path.indexOf(nav.url) > -1) {
                        nav.showSubNav = true;
                    }

                    if(typeof _.find(this.elements,{code:nav.code}) != 'undefined' ){
                        nav.visible = true;
                    }else{
                        nav.visible =false
                    }

                    //目前只有两级菜单
                    if(nav.subNav){
                        nav.subNav.forEach(subNav => {
                            if(_.find(this.elements,{code:subNav.code})){
                                subNav.visible = true;
                            }else{
                                subNav.visible = false;
                            }
                        })
                    }

                });
                return this.navList;
            }
        },
        watch:{

         // 'elements': function(v1,v2){
         //   console.log(v1)
         //   console.log(v2)
         // }

        },
        methods: {
            activeLink (url) {
                return this.$route.path.indexOf(url) > -1;
            }
        }
    }
</script>

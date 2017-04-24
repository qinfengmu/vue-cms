<template>
    <div class="ui-header">
      <slot name="header">
          <div class="header-logo clearfix">
              <a href="/"><img src="../assets/imgs/nnLogo.png" /></a>
              <div class="title">
                <h1>南宁轨道CMS管理系统</h1>
                <p>CMS Administration V1.0</p>
              </div>
          </div>
          <div class="header-bar">
              <ul class="bar-list">
                <li><img src="../assets/imgs/user.png" /><span>{{user.userName}}</span></li>
                <li><a href="#" @click.prevent="signOut"><img src="../assets/imgs/close.png" /></a></li>
              </ul>
          </div>
      </slot>
    </div>
</template>
<style lang="less" scoped>
  @white:#fff;
  @headerBgColor: #2b3643;
  .ui-header{
    position: fixed;
    top:0;
    left:0;
    height: 80px;
    width: 100%;
    background: @headerBgColor;
    overflow: auto;
    z-index: 9999;
  }
  .header-logo{
      float: left;
      padding: 12px 0 0 30px;
     a {
       float: left;
       margin-right:20px;
     }
    .title{
      color:@white;
      overflow: hidden;
      float: left;
      h1 {
        font-size:18px;
        margin-top: 10px;
      }
      p{
        margin-top:5px;
        font-size:12px;
      }
    }
  }
  .header-bar{
    float: right;
    li{
      display: inline-block;
      padding:0 25px;
      line-height:80px;
      color:@white;
      span{
        margin-left:10px ;
      }
      img{
        vertical-align: middle ;
      }
      &:last-child{
        border-left: 2px solid #202832;
      }
    }
  }
</style>
<script>
    import {mapActions} from 'vuex'
    export default{
        data(){
            return{
                user: {}
            }
        },
        created (){
          this.user = this.$store.state.User
        },
        methods: {
            ...mapActions(['logout']),
            signOut () {
               this.logout();
               this.$router.replace('/login');
            }
        }
    }
</script>

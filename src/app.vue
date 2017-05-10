<style lang="less" scoped>
</style>
<template>
  <div class="page-wrap">
    <v-header></v-header>
    <v-sidebar></v-sidebar>
    <div id="content">
        <div class="content-inner">
          <bread-crumbs></bread-crumbs>
          <router-view></router-view>
        </div>
    </div>
  </div>
</template>
<script>
import breadCrumbs from './components/breadCrumbs'
    export default{
        data(){
            return{

            }
        },

        components: { breadCrumbs }

    }
</script>

<template>
    <div>

      <script type="text/plain" :id="id" ref="editor">
          <p>这里我可以写一些输入提示</p>
      </script>
      {{id}}
    </div>

</template>
<style lang="less" scoped>

</style>

<script>

    export default{
        props: {
          value: {
            type: String,
            default: ''
          },
          config: {
            type: Object,
            default: () => { return {} }
          }

        },
        data(){
            return{

            }
        },
        computed: {

          id () { return 'id-'+Math.round(Math.random()*100000) }

        },
        mounted () {


        }
    }
</script>

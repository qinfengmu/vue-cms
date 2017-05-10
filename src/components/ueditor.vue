<template>
  <div ref="editor"></div>
</template>

<script>
  /* eslint-disable */
  import '../assets/ueditor/ueditor.config';
  import '../assets/ueditor/ueditor.all';
  import '../assets/ueditor/ueditor.parse';
  import '../assets/ueditor/lang/zh-cn/zh-cn';


  export default {
    data() {
      return {
        id:'ueditorId-'+Math.round(Math.random()*1000000),
        editor: null
      };
    },
    props: {
      value: {
        type: String,
        default: null,
      },
      config: {
        type: Object,
        default: {},
      }
    },
    watch: {
      value: function value(val, oldVal) {
        this.editor = UE.getEditor(this.id, this.config);
        if (val !== null) {
          this.editor.setContent(val);
        }
      }
    },
    //beforeDestroy () {
    //    //组件销毁时销毁ueditor实例
    //    if(this.editor && this.editor.destroy){
    //      this.editor.destroy();
    //    }
    //},
    mounted() {
      this.$nextTick(function f1() {
        // 保证 this.$el 已经插入文档
        this.$refs.editor.id = this.id;
        this.editor = UE.getEditor(this.id, this.config);

        this.editor.ready(function f2() {
          this.editor.setContent(this.value);
          this.editor.addListener("contentChange", function () {
            const wordCount = this.editor.getContentLength(true);
            const content = this.editor.getContent();
            const plainTxt = this.editor.getPlainTxt();
            this.$emit('contentChange', { wordCount: wordCount, content: content, plainTxt: plainTxt});
          }.bind(this));

          this.$emit('ready', this.editor);
        }.bind(this));
      });
    }
  };
</script>

<style>
    body{
        background-color:#ff0000;
    }
</style>

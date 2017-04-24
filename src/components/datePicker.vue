<!--日期选择控件-->
<template>
    <div class="datePickerArea">

      <dl>
        <dt>{{labelName}}:</dt>
        <dd>
          <div class="date-picker">
            <datepicker language="zh" format="yyyy-MM-dd" v-model="startTime.date" v-on:selected="selectStart($event)" :disabled="startTime.disabled"  input-class="f-input"></datepicker>
            <i class="iconfont icon-date"></i>
            <a v-if="showClearButton" href="" class="clearButton" @click.prevent="clearDate">×</a>
          </div>

        </dd>
      </dl>

    </div>
</template>
<style lang="less" scoped>
  @import "../less/variables";
  @import "../less/mixins";
  .datePickerArea {
    display: inline-block;
    dl {
      margin:0 20px 0 0;
      display: inline-block;
      .clearfix();
      dt,dd{
        float: left;
      }
      dt{
        padding-right:8px;
        line-height: 36px;
        font-weight: normal;
      }
    }
  }
  .date-picker {
    position: relative;
    i {
      position: absolute;
      right: 10px;
      top: 6px;
      color:@defaultBlue;
    }
    .clearButton {
      display: inline-block;
      width: 20px;
      position: absolute;
      right : 28px;
      top: 8px;
      color:@red;
      text-align: center;
    }
  }
</style>
<script>
import Datepicker from 'vuejs-datepicker';

    export default{
        props: ['labelName'],
        data(){
            return{
               showClearButton: false,
               startTime : {
                  date: '',
                  disabled: {
                      from: '' // Disable all dates after specific date
                  }
                }
            }
        },
        components:{
          Datepicker
        },
        methods: {
          //开始时间
          selectStart (date) {
            this.startTime.date = date;
            this.showClearButton = true;
            this.$emit('getStartTime',new Date(date).setHours(0,0,0));
          },
          clearDate () {
            this.$children[0].clearDate();
            this.showClearButton = false;
             this.$emit('getStartTime','');
          }


        }
    }
</script>

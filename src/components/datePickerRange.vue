<!--日期选择控件-->
<template>
    <div class="datePickerArea">

      <dl>
        <dt>{{startLabel}}:</dt>
        <dd>
          <div class="date-picker">
            <datepicker language="zh" format="yyyy-MM-dd" v-model="startTime.date" v-on:selected="selectStart($event)" :disabled="startTime.disabled" input-class="f-input"></datepicker>
            <i class="iconfont icon-date"></i>
          </div>

        </dd>
      </dl>
      <dl>
        <dt>{{endLabel}}:</dt>
        <dd>
          <div class="date-picker">
            <datepicker language="zh" format="yyyy-MM-dd" v-model="endTime.date" v-on:selected="selectEnd($event)"  :disabled="endTime.disabled" input-class="f-input"></datepicker>
            <i class="iconfont icon-date"></i>
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
    cursor: text;
    i {
      position: absolute;
      right: 10px;
      top: 5px;
      color:@defaultBlue;
    }
    .datepicker{
      cursor: text;
    }
  }
</style>
<script>
import Datepicker from 'vuejs-datepicker';

    export default{
    props: ['startLabel','endLabel'],
        data(){
            return{
                startTime: {
                    date: '',
                    disabled: {
                        from: '' // Disable all dates after specific date
                    }
                  },
                endTime : {
                  date: '',
                  disabled: {
                      to: ''
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
            const endTime = this.endTime.date;

            this.startTime.date = date;

            this.endTime.disabled.to = new Date(date);

            if(endTime !== '' && date > endTime){
               this.endTime.date = ''
            }
            //console.log(this.$children[0].formattedValue);

            this.$emit('getStartTime',new Date(date).setHours(0,0,0));
          },
          //结束时间
          selectEnd (date) {
              //console.log(this.$children[1].formattedValue);
             this.$emit('getEndTime',new Date(date).setHours(23,59,59));

          },

        }
    }
</script>

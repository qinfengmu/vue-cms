<template>
    <addForm isForm="true" v-on:formSubmit="save">
      <div slot="formBody">
        <div class="stationItem" v-for="station in stationExits">
          <dl>
            <dt>站口名：</dt>
            <dd>
              <input type="text" v-model="station.exitName" class="ipt ipt-medium"> <a href="" @click.prevent="delStaionItem(station)" class="redColor">删除</a>
            </dd>
          </dl>
          <dl>
            <dt>周边地标：</dt>
            <dd>
               <textarea class="ipt ipt-large" v-model="station.landmark" style="height:100px">

               </textarea>
            </dd>
          </dl>
          <dl>
            <dt>公交车：</dt>
            <dd>
               <textarea class="ipt ipt-large" v-model="station.bus" style="height:100px">

               </textarea>
            </dd>
          </dl>
        </div>
      </div>
      <div  class="button-area" slot="buttonArea">
        <button type="submit" class="btn btn-blue">保存</button>
      </div>
    </addForm>
</template>
<style lang="less" scoped>
  .form-area{
    width: 650px;
  }
  .stationItem {
    padding-top: 5px;
    margin-bottom: 20px;
    border-bottom: 1px solid #e4e4e4;
    dl {
      dd {
        padding-left:0;
      }
    }
  }
</style>
<script>
import addForm from '../../components/addForm'
    export default{
        props: ['stationExits'],
        data(){
            return{

            }
        },
        components:{
          addForm
        },
        methods: {
          delStaionItem (station) {
              this.$delete(this.stationExits,station);
             //this.$emit('deleteItem',station)
          },
          save () {
            this.$emit('saveStation',this.stationExits);
          }
        }
    }
</script>

<template>
  <v-stepper v-model="e1">
    <v-stepper-header style="font-size: large">
      <v-divider></v-divider>
      <v-stepper-step editable :complete="e1 > 1" step="1">提交信息</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step editable :complete="e1 > 2" step="2">复核信息</v-stepper-step>
      <v-divider></v-divider>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
            <v-layout wrap>
              <v-flex xs12 md3 lg3>
                <v-subheader class="class1">提交人:</v-subheader>
              </v-flex>
              <v-flex md9 lg9>
                <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" v-model="flowInfo.flowCommitInfo.userId" single-line hide-details>
                </v-text-field>
              </v-flex>
            </v-layout>
             <v-layout row wrap>
              <v-flex xs12 md3 lg3>
                <v-subheader class="class1">提交时间:</v-subheader>
              </v-flex>
              <v-flex md9 lg9>
                <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" v-model="flowInfo.flowCommitInfo.tranTime" single-line hide-details>
                </v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row wrap>
              <v-flex xs12 md3 lg3>
                <v-subheader class="class1">提交原因:</v-subheader>
              </v-flex>
              <v-flex md9 lg9>
                <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" v-model="flowInfo.flowCommitInfo.remark" single-line hide-details>
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 md3 lg3>
                <v-subheader class="class1">备注信息:</v-subheader>
              </v-flex>
              <v-flex md9 lg9>
                <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" single-line hide-details>
                </v-text-field>
              </v-flex>
            </v-layout>
      </v-stepper-content>
      <v-stepper-content step="2">
          <v-layout wrap>
          <v-flex xs12 md3 lg3>
            <v-subheader class="class1">复核人:</v-subheader>
          </v-flex>
          <v-flex md9 lg9>
            <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" v-model="checkInfo.userId" single-line hide-details>
            </v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 md3 lg3>
            <v-subheader class="class1">复核日期:</v-subheader>
          </v-flex>
          <v-flex md9 lg9>
            <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" v-model="checkInfo.date" value="2018/09/07" single-line hide-details>
            </v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 md3 lg3>
            <v-subheader class="class1">复核状态:</v-subheader>
          </v-flex>
          <v-flex md9 lg9>
            <v-switch color="success" style="margin-top: 8px" hide-details value="Y" :label="`${checkInfo.isApproved==='Y'?'通过':'驳回'}`" v-model="checkInfo.isApproved"></v-switch>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 md3 lg3>
            <v-subheader class="class1">复核意见:</v-subheader>
          </v-flex>
          <v-flex md7 lg7>
            <v-text-field class="primary--text mx-1 textBox" label="" name="title" v-model="checkInfo.remark" single-line hide-details>
            </v-text-field>
          </v-flex>
          <v-flex md2 lg2>
            <v-btn color="green" dark large @click='checkConfirm'>确 认</v-btn>

          </v-flex>
        </v-layout>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script>
    import {
        tranFlowInfo
    } from '@/api/url/prodInfo';
    import toast from '@/utils/toast';

    export default {
        data (){
          return {
              e1: 2,
              flowInfo: [],
              checkInfo: {
                  mainSeqNo: '',
                  date: '',
                  isApproved: 'Y',
                  userId: '',
                  remark: '',
                  optType: '3' //复核
              }
          }
      },
        mounted() {
            this.checkInfo.mainSeqNo = this.$route.params.code
            this.checkInfo.userId = sessionStorage.getItem("userId")
            this.getDate()
            this.initFlowInfo(this.$route.params.flowInfo)
        },
        methods: {
            initFlowInfo(val) {
                for(let i=0; i<val.length; i++) {
                    if(val[i].flowManage.mainSeqNo === this.checkInfo.mainSeqNo){
                        this.flowInfo = this.$route.params.flowInfo[i]
                    }
                }

            },
            callbackprod() {
                this.$emit("getNewProdData",{"checkInfo": this.checkInfo})
            },
          getDate() {
              var date = new Date();
              var year = date.getFullYear();
              var month = date.getMonth()+1;//js中是从0开始所以要加1
              var day = date.getDate();
              this.checkInfo.date = year+'/'+month+'/'+day;
          },
            checkConfirm() {
                console.log(this.checkInfo)
                if(this.checkInfo.isApproved !== "Y"){
                    this.checkInfo.isApproved = "N"
                }
                tranFlowInfo(this.checkInfo).then(response => {
                    if(response.status === 200 && this.checkInfo.isApproved === "Y") {
                        toast.success("复核成功！");
                        this.$router.push({ name: 'userIndexFlow'});
                    }
                    if(response.status === 200 && this.checkInfo.isApproved === "N") {
                        toast.success("驳回成功！");
                        this.$router.push({ name: 'userIndexFlow'});
                    }
                })
            }
        }
    }
</script>
<style scoped>
  .class1 {
    color: deepskyblue;
    font-size: large;
    font-style: inherit;
    margin-right: 0px;
    margin-top: 0px;
    margin-left: 15%
  }
  .textBox {
    margin-top: 5px;
  }
</style>
<template>
  <v-stepper v-model="e1" style="color: white">
    <v-stepper-header style="font-size: large">
      <v-stepper-step editable :complete="e1 > 1" step="1">提交信息</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step editable :complete="e1 > 2" step="2">复核信息</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step editable step="3">发布信息</v-stepper-step>
    </v-stepper-header>
      <v-stepper-content step="1">
            <v-layout wrap>
              <v-flex xs12 md2 lg2>
                <v-subheader class="class1">提交人:</v-subheader>
              </v-flex>
              <v-flex md10 lg10>
                <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" v-model="flowInfo.flowCommitInfo.userId" single-line hide-details>
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 md2 lg2>
                <v-subheader class="class1">提交时间:</v-subheader>
              </v-flex>
              <v-flex md10 lg10>
                <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" v-model="flowInfo.flowCommitInfo.tranTime" single-line hide-details>
                </v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row wrap>
              <v-flex xs12 md2 lg2>
                <v-subheader class="class1">提交原因:</v-subheader>
              </v-flex>
              <v-flex md10 lg10>
                <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" v-model="flowInfo.flowCommitInfo.remark" single-line hide-details>
                </v-text-field>
              </v-flex>
            </v-layout>
          <v-layout row wrap>
              <v-flex xs12 md2 lg2>
                  <v-subheader class="class1">备注信息:</v-subheader>
              </v-flex>
              <v-flex md10 lg10>
                  <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" single-line hide-details>
                  </v-text-field>
              </v-flex>
          </v-layout>
      </v-stepper-content>
      <v-stepper-content step="2">
            <v-layout wrap>
              <v-flex xs12 md2 lg2>
                <v-subheader class="class1">复核人:</v-subheader>
              </v-flex>
              <v-flex md10 lg10>
                <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" v-model="flowInfo.flowCheckInfo.userId" name="title" single-line hide-details>
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 md2 lg2>
                <v-subheader class="class1">复核时间:</v-subheader>
              </v-flex>
              <v-flex md10 lg10>
                <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" v-model="flowInfo.flowCheckInfo.tranTime" name="title" single-line hide-details>
                </v-text-field>
              </v-flex>
            </v-layout>
          <v-layout row wrap>
              <v-flex xs12 md2 lg2>
                  <v-subheader class="class1">复核状态:</v-subheader>
              </v-flex>
              <v-flex md10 lg10>
                  <v-switch color="success" style="margin-top: 8px" hide-details value=true disabled="false" v-model="flowInfo.flowCheckInfo.isApproved" :label="`${flowInfo.flowCheckInfo.isApproved==='Y'?'通过':'驳回'}`" ></v-switch>
              </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 md2 lg2>
              <v-subheader class="class1">复核意见:</v-subheader>
            </v-flex>
            <v-flex md10 lg10>
              <v-text-field class="primary--text mx-1 textBox" disabled="false" label="" name="title" v-model="flowInfo.flowCheckInfo.remark" single-line hide-details>
              </v-text-field>
            </v-flex>
          </v-layout>
      </v-stepper-content>
      <v-stepper-content step="3">
            <v-layout wrap>
              <v-flex xs12 md3 lg3>
                <v-subheader class="class1">发布人:</v-subheader>
              </v-flex>
              <v-flex md9 lg9>
                <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" v-model="releaseInfo.userId" single-line hide-details>
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 md3 lg3>
                <v-subheader class="class1">发布时间:</v-subheader>
              </v-flex>
              <v-flex md9 lg9>
                <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" v-model="releaseInfo.date" value="2018/09/07" single-line hide-details>
                </v-text-field>
              </v-flex>
            </v-layout>
          <v-layout row wrap>
              <v-flex xs12 md3 lg3>
                  <v-subheader class="class1">发布状态:</v-subheader>
              </v-flex>
              <v-flex md9 lg9>
                  <v-switch color="success" style="margin-top: 8px " hide-details value="Y" :label="`${releaseInfo.isApproved==='Y'?'通过':'驳回'}`" v-model="releaseInfo.isApproved"></v-switch>
              </v-flex>
              <!--<v-flex md1 lg1>-->
              <!--<v-btn color="primary" @click="releaseConfirm" style="width: 100%">确   认</v-btn>-->
              <!--</v-flex>-->
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 md3 lg3>
              <v-subheader class="class1">发布意见:</v-subheader>
            </v-flex>
            <v-flex md7 lg7>
              <v-text-field class="primary--text mx-1 textBox" label="" name="title" v-model="releaseInfo.remark" single-line hide-details>
              </v-text-field>
            </v-flex>
              <v-flex md2 lg2>
                  <v-btn color="green" dark large @click='releaseConfirm'>确 认</v-btn>

              </v-flex>
          </v-layout>
      </v-stepper-content>
  </v-stepper>
</template>
<script>
    import {
        tranFlowInfo
    } from '@/api/url/prodInfo';
    import {
        tranFlowRelease
    } from '@/api/url/prodInfo';
    import toast from '@/utils/toast';

    export default {
        data (){
            return {
                e1: 3,
                flowInfo: [],
                temp: [],
                releaseInfo: {
                    mainSeqNo: '',
                    date: '',
                    isApproved: 'Y',
                    userId: '',
                    remark: '',
                    optType: '4'//发布
                }
            }
        },
        mounted() {
            this.code = this.$route.params.code;
            this.getDate()
            this.releaseInfo.mainSeqNo = this.$route.params.code;
            this.releaseInfo.userId = sessionStorage.getItem("userId")

            this.initFlowInfo(this.$route.params.flowInfo)

        },
        methods: {
            initFlowInfo(val) {
                for(let i=0; i<val.length; i++) {
                    if(val[i].flowManage.mainSeqNo === this.releaseInfo.mainSeqNo){
                        this.flowInfo =this.$route.params.flowInfo[i]
                    }
                }
            },
            getDate() {
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth()+1;//js中是从0开始所以要加1
                var day = date.getDate();
                this.releaseInfo.date = year+'年'+month+'月'+day+'日';
            },
            releaseConfirm() {
                console.log(this.releaseInfo)
                if(this.releaseInfo.isApproved !== "Y"){
                    this.releaseInfo.isApproved = "N"
                }
                tranFlowRelease(this.releaseInfo).then(response => {
                    if(response.status === 200 && this.releaseInfo.isApproved === "Y") {
                    toast.success("发布成功！");
                    this.$router.push({ name: 'userIndexFlow'});
                }
                    if(response.status === 200 && this.releaseInfo.isApproved === "N") {
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
    margin-left: 20%
}
    .textBox {
        margin-top: 5px;
    }
</style>
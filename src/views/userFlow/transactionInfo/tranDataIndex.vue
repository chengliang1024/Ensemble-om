<template>
  <div>
    <v-layout row wrap>
      <v-toolbar color="blue" dark tabs>
        <v-toolbar-side-icon></v-toolbar-side-icon>
          <v-toolbar-title>交易单号:{{code}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="write" @click="print()" flat>导出</v-btn>
      </v-toolbar>
      <v-flex md8 lg8>
        <!--<tran-check-flow-info v-if="optKey==3"></tran-check-flow-info>-->
        <!--<tran-release-flow-info v-if="optKey==4"></tran-release-flow-info>-->
        <!--复核流程信息-->
        <v-stepper v-model="e11" v-if="optKey == 3">
          <v-stepper-header style="font-size: large">
            <v-divider></v-divider>
            <v-stepper-step editable :complete="e11 > 1" step="1">提交信息</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step editable :complete="e11 > 2" step="2">复核信息</v-stepper-step>
            <v-divider></v-divider>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-layout wrap>
                <v-flex xs12 md2 lg2>
                  <v-subheader class="descClass">提交人:</v-subheader>
                </v-flex>
                <v-flex md10 lg10>
                  <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" v-model="checkFlowInfo.flowCommitInfo.userId" single-line hide-details>
                  </v-text-field>
                </v-flex>
                <v-flex xs12 md2 lg2>
                  <v-subheader class="descClass">提交时间:</v-subheader>
                </v-flex>
                <v-flex md10 lg10>
                  <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" v-model="checkFlowInfo.flowCommitInfo.tranTime" single-line hide-details>
                  </v-text-field>
                </v-flex>
                <v-flex xs12 md2 lg2>
                  <v-subheader class="descClass">提交原因:</v-subheader>
                </v-flex>
                <v-flex md10 lg10>
                  <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" v-model="checkFlowInfo.flowCommitInfo.remark" single-line hide-details>
                  </v-text-field>
                </v-flex>
                <v-flex xs12 md2 lg2>
                  <v-subheader class="descClass">备注信息:</v-subheader>
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
                  <v-subheader class="descClass">复核人:</v-subheader>
                </v-flex>
                <v-flex md10 lg10>
                  <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" v-model="checkInfo.userId" single-line hide-details>
                  </v-text-field>
                </v-flex>
                <v-flex xs12 md2 lg2>
                  <v-subheader class="descClass">复核日期:</v-subheader>
                </v-flex>
                <v-flex md10 lg10>
                  <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" v-model="checkInfo.date" value="2018/09/07" single-line hide-details>
                  </v-text-field>
                </v-flex>
                <v-flex xs12 md2 lg2>
                  <v-subheader class="descClass">复核状态:</v-subheader>
                </v-flex>
                <v-flex md10 lg10>
                  <v-switch color="success" style="margin-top: 8px" hide-details value="Y" :label="`${checkInfo.isApproved==='Y'?'通过':'驳回'}`" v-model="checkInfo.isApproved"></v-switch>
                </v-flex>
                <v-flex xs12 md2 lg2>
                  <v-subheader class="descClass">复核意见:</v-subheader>
                </v-flex>
                <v-flex md10 lg10>
                  <v-text-field class="primary--text mx-1 textBox" label="" name="title" v-model="checkInfo.remark" single-line hide-details>
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>

        <!--发布流程信息-->
        <v-stepper v-model="e1" style="color: white" v-if="optKey == 4">
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
                <v-subheader class="descClass">提交人:</v-subheader>
              </v-flex>
              <v-flex md10 lg10>
                <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" v-model="releaseFlowInfo.flowCommitInfo.userId" single-line hide-details>
                </v-text-field>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="descClass">提交时间:</v-subheader>
              </v-flex>
              <v-flex md10 lg10>
                <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" v-model="releaseFlowInfo.flowCommitInfo.tranTime" single-line hide-details>
                </v-text-field>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="descClass">提交原因:</v-subheader>
              </v-flex>
              <v-flex md10 lg10>
                <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" v-model="releaseFlowInfo.flowCommitInfo.remark" single-line hide-details>
                </v-text-field>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="descClass">备注信息:</v-subheader>
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
                <v-subheader class="descClass">复核人:</v-subheader>
              </v-flex>
              <v-flex md10 lg10>
                <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" v-model="releaseFlowInfo.flowCheckInfo.userId" name="title" single-line hide-details>
                </v-text-field>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="descClass">复核时间:</v-subheader>
              </v-flex>
              <v-flex md10 lg10>
                <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" v-model="releaseFlowInfo.flowCheckInfo.tranTime" name="title" single-line hide-details>
                </v-text-field>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="descClass">复核状态:</v-subheader>
              </v-flex>
              <v-flex md10 lg10>
                <v-switch color="success" style="margin-top: 8px" hide-details value=true disabled="false" v-model="releaseFlowInfo.flowCheckInfo.isApproved" :label="`${releaseFlowInfo.flowCheckInfo.isApproved==='Y'?'通过':'驳回'}`" ></v-switch>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="descClass">复核意见:</v-subheader>
              </v-flex>
              <v-flex md10 lg10>
                <v-text-field class="primary--text mx-1 textBox" disabled="false" label="" name="title" v-model="releaseFlowInfo.flowCheckInfo.remark" single-line hide-details>
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-stepper-content>
          <v-stepper-content step="3">
            <v-layout wrap>
              <v-flex xs12 md2 lg2>
                <v-subheader class="descClass">发布人:</v-subheader>
              </v-flex>
              <v-flex md10 lg10>
                <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" v-model="releaseInfo.userId" single-line hide-details>
                </v-text-field>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="descClass">发布时间:</v-subheader>
              </v-flex>
              <v-flex md10 lg10>
                <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" v-model="releaseInfo.date" value="2018/09/07" single-line hide-details>
                </v-text-field>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="descClass">发布状态:</v-subheader>
              </v-flex>
              <v-flex md10 lg10>
                <v-switch color="success" style="margin-top: 8px " hide-details value="Y" :label="`${releaseInfo.isApproved==='Y'?'通过':'驳回'}`" v-model="releaseInfo.isApproved"></v-switch>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="descClass">发布意见:</v-subheader>
              </v-flex>
              <v-flex md10 lg10>
                <v-text-field class="primary--text mx-1 textBox" label="" name="title" v-model="releaseInfo.remark" single-line hide-details>
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-stepper-content>
        </v-stepper>
     </v-flex>
      <v-flex xs12 md4 lg4 color: white>
        <img src="/static/user/MyUser.png" class="imgUserIndexFlow">
        <v-layout>
          <v-subheader class="showMsg">{{optDesc}}存款产品</v-subheader>
        </v-layout>
        <v-layout>
          <v-subheader class="showMsg">{{prodType}}-{{prodDesc}}</v-subheader>
        </v-layout>
        <v-layout>
          <v-btn class="btnClass" color="green" dark large @click='confirmClick'>确 认</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-toolbar color="blue" dark tabs>
      <v-toolbar-side-icon @click="showClick"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">产品修改差异展示</v-toolbar-title>
    </v-toolbar>
    <v-card md20 lg20 v-if="showFlag==1">
      <v-card-text>
        <v-tabs fixed-tabs>
          <v-tab v-for="n in diffList" :key="n" class="diffTitle">{{n}}</v-tab>
          <v-tabs-items v-model="model">
            <v-tab-item v-for="i in diffList" :key="i">
              <prod-diff v-if="i=='产品属性'" :prodData="prodDefineData"></prod-diff>
              <prod-diff v-if="i=='开户定义'" :prodData="prodEventOpen"></prod-diff>
              <prod-diff v-if="i=='销户定义'" :prodData="prodEventClose"></prod-diff>
              <prod-diff v-if="i=='存入定义'" :prodData="prodEventCret"></prod-diff>
              <prod-diff v-if="i=='支取定义'" :prodData="prodEventDebt"></prod-diff>
              <prod-diff v-if="i=='利息信息'" :prodData="prodEventCycle"></prod-diff>
              <base-table v-if="i=='收费定义'" :prodCharge="prodCharge"></base-table>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
  import prodDiff from '@/views/prodFactory/prodDiff/prodDiff'
  import baseTable from '@/views/prodFactory/prodInfo/table/baseTable'
  import tranCheckFlowInfo from './tranCheckFlowInfo'
  import tranReleaseFlowInfo from './tranReleaseFlowInfo'
  import { getDiffList } from "@/api/url/prodInfo";
  import {getColumnDesc_} from '@/utils/columnDesc'
  import DcTextField from '@/components/widgets/DcTextField'
  import { getProdData } from "@/api/prod";
    import toast from '@/utils/toast';
    import {
        tranFlowInfo
    } from '@/api/url/prodInfo';
import {
    tranFlowRelease
} from '@/api/url/prodInfo';
  export default {
        components: {
            prodDiff,
            baseTable,
            tranCheckFlowInfo,
            tranReleaseFlowInfo,
            getColumnDesc_,
            DcTextField
        },
      props: ["prodData"],
      data (){
          return {
              e1: 3,
              releaseFlowInfo: [],
              temp: [],
              releaseInfo: {
                  mainSeqNo: '',
                  date: '',
                  isApproved: 'Y',
                  userId: '',
                  remark: '',
                  optType: '4'//发布
              },
              e11: 2,
              checkFlowInfo: [],
              confirmInfo: [],
              checkInfo: {
                  mainSeqNo: '',
                  date: '',
                  isApproved: 'Y',
                  userId: '',
                  remark: '',
                  optType: '3' //复核
              },
              code: '',
              optKey: 0,
              showFlag: 0,
              optValue: '',
              optDesc: '',
              prodData: {},
              prodCharge: {},
              prodDefineData: {},
              prodEventOpen: {},
              prodEventClose: {},
              prodEventCret: {},
              prodEventCycle: {},
              prodEventDebt: {},
              diffList: ["产品属性","开户定义","销户定义","存入定义","支取定义","利息信息","收费定义"],
              prodGroup: [{
                  key: 'Y',
                  value: 'Y-是'
              }],
              prodClass: [{
                  key: 'RB100',
                  value: 'RB100-A'
              }],
              prodRange: [{
                  key: '',
                  value: ''
              }],
              status: [{
                  key: '',
                  value: ''
              }],
              baseProdType: [{
                  key: '',
                  value: ''
              }],
              prodType: [{
                  key: '',
                  value: ''
              }]
          }
      },
       created() {
           //交易单号
           this.code = this.$route.params.code
           this.setOptKey(this.$route.params.optValue)
           this.getDiffProdData();
       },
      mounted() {
          //获取当前操作日期
          this.getDate()
          //初始化流程信息
          this.initFlowInfo(this.$route.params)
      },
        methods: {
            initFlowInfo(val) {
                if(this.optKey === 3){
                    this.checkInfo.mainSeqNo = val.code
                    this.checkInfo.userId = sessionStorage.getItem("userId")
                    for(let i=0; i<val.flowInfo.length; i++) {
                        if(val.flowInfo[i].flowManage.mainSeqNo === this.checkInfo.mainSeqNo){
                            this.checkFlowInfo = val.flowInfo[i]
                        }
                    }
                }
                if(this.optKey === 4){
                    this.releaseInfo.mainSeqNo = val.code;
                    this.releaseInfo.userId = sessionStorage.getItem("userId")
                    for(let i=0; i<val.flowInfo.length; i++) {
                        if (val.flowInfo[i].flowManage.mainSeqNo === this.releaseInfo.mainSeqNo) {
                            this.releaseFlowInfo = val.flowInfo[i]
                        }
                    }
                }
            },
            getDate() {
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth()+1;//js中是从0开始所以要加1
                var day = date.getDate();
                this.releaseInfo.date = year+'/'+month+'/'+day;
                this.checkInfo.date = year+'/'+month+'/'+day;
            },
            //提交事件
            confirmClick() {

                if(this.optKey === 3){
                    this.confirmInfo = this.checkInfo;
                    if(this.confirmInfo.isApproved !== "Y"){
                        this.confirmInfo.isApproved = "N"
                    }
                    tranFlowInfo(this.confirmInfo).then(response => {
                        if(response.status === 200 && this.confirmInfo.isApproved === "Y") {
                            toast.success("复核成功！");
                            this.$router.push({ name: 'userIndexFlow'});
                        }
                        if(response.status === 200 && this.confirmInfo.isApproved === "N") {
                            toast.success("驳回成功！");
                            this.$router.push({ name: 'userIndexFlow'});
                        }
                    })
                }
                if(this.optKey === 4){
                    this.confirmInfo = this.releaseInfo
                    if(this.confirmInfo.isApproved !== "Y"){
                        this.confirmInfo.isApproved = "N"
                    }
                    tranFlowRelease(this.confirmInfo).then(response => {
                        if(response.status === 200 && this.confirmInfo.isApproved === "Y") {
                            toast.success("复核成功！");
                            this.$router.push({ name: 'userIndexFlow'});
                        }
                        if(response.status === 200 && this.confirmInfo.isApproved === "N") {
                            toast.success("驳回成功！");
                            this.$router.push({ name: 'userIndexFlow'});
                        }
                    })
                }
            },
            //展开/隐藏差异信息列表
            showClick() {
                this.showFlag = this.showFlag ===0?1:0
                this.getDiffProdData();
            },
            setOptKey(val) {
                if(val === "复核") {
                    this.optKey = 3
                    this.optDesc = "复核"
                }
                if(val === "发布") {
                    this.optKey = 4
                    this.optDesc = "发布"
                }
            },
            print () {
                window.print()
            },
            getDiffProdData(){
                var data={'mainSeqNo': this.code};
                getDiffList(data).then(response => {
                    this.prodData=response.data.data;
                    this.assembleProdDefine();
                    this.assembleEvent();
                    //将收费定义的差异组装
                    this.assembleProdCharge();
                    this.prodGroup = this.prodData.mbProdType.prodGroup
                    this.prodClass = this.prodData.mbProdType.prodClass
                    this.prodDesc = this.prodData.mbProdType.prodDesc
                    this.prodType = this.prodData.mbProdType.prodGroup
                    this.status = this.prodData.mbProdType.status
                    this.baseProdType = this.prodData.mbProdType.baseProdType
                    this.prodRange = this.prodData.mbProdType.prodRange
                    this.prodType = this.prodData.mbProdType.prodType
                });
            },
            assembleProdDefine() {
                const prodDefine=this.prodData.prodDefine;
                const prodDefineDiff=this.prodData.diff.prodDefine;
                const prodType=this.prodData.prodType;
                const prodDefineData={"prodDefines": prodDefine,"diff": prodDefineDiff,"prodType": prodType};
                this.prodDefineData=prodDefineData;
            },
            assembleEvent(){
                const prodEvent=this.prodData.prodEvent;
                const prodEventDiff=this.prodData.diff.mbProdEvent;
                const prodType=this.prodData.prodType;
                //区分差异
                const openDiff={}
                const closeDiff={}
                const cycleDiff={}
                const debtDiff={}
                const cretDiff={}
                for(const diffKey in prodEventDiff){
                    const key=diffKey.substring(diffKey.indexOf('.')+1);
                    if(diffKey.indexOf('OPEN')>=0){
                        openDiff[key]=prodEventDiff[diffKey];
                    }
                    if(diffKey.indexOf('CLOSE')>=0){
                        closeDiff[key]=prodEventDiff[diffKey];
                    }
                    if(diffKey.indexOf('WTD')>=0){
                        cretDiff[key]=prodEventDiff[diffKey];
                    }
                    if(diffKey.indexOf('CYCLE')>=0){
                        cycleDiff[key]=prodEventDiff[diffKey];
                    }
                    if(diffKey.indexOf('DEP')>=0){
                        debtDiff[key]=prodEventDiff[diffKey];
                    }
                }
                for(const key in prodEvent){
                    const openEvent={"prodDefines": prodEvent[key],"prodType": prodType}
                    if(key.indexOf('OPEN')>=0){
                        openEvent["diff"]=openDiff
                        this.prodEventOpen=openEvent;
                    }else
                    if(key.indexOf('CLOSE')>=0){
                        openEvent["diff"]=closeDiff
                        this.prodEventClose= openEvent
                    }else if(key.indexOf('WTD')>=0){
                        openEvent["diff"]=cretDiff
                        this.prodEventCret= openEvent
                    }else if(key.indexOf('CYCLE')>=0){
                        openEvent["diff"]=cycleDiff
                        this.prodEventCycle= openEvent
                    }else if(key.indexOf('DEP')>=0){
                        openEvent["diff"]=debtDiff
                        this.prodEventDebt= openEvent
                    }
                }
                if(JSON.stringify(prodEvent)=='{}'){
                    let diffEvent={"prodType": prodType}
                    diffEvent["diff"]=openDiff
                    this.prodEventOpen=diffEvent;
                    diffEvent["diff"]=closeDiff
                    this.prodEventClose= diffEvent;
                    diffEvent["diff"]=cycleDiff
                    this.prodEventCycle= diffEvent
                    diffEvent["diff"]=cretDiff
                    this.prodEventCret= diffEvent
                    diffEvent["diff"]=debtDiff
                    this.prodEventDebt= diffEvent
                }
            },
            assembleProdCharge(){
                const prodInfo=this.prodData.mbProdCharge;
                const prodChargeDiff=this.prodData.diff.mbProdCharge;
                let assembleColumns=[];
                let heards=[];
                for(const key in prodInfo[0]){
                    let head={};
                    head["text"]=getColumnDesc_(key);
                    head["value"]=key;
                    heards.push(head);
                }
                for(const prodCharge in prodInfo){
                    const chargeColumn= prodInfo[prodCharge];
                    const keyAndValue="{\"FEE_TYPE\":\""+chargeColumn.feeType+"\",\"PROD_TYPE\":\""+
                        chargeColumn.prodType+"\"}";
                    const diff=prodChargeDiff[keyAndValue];
                    if(diff== undefined){
                        assembleColumns.push(chargeColumn)
                    }else{
                        for(const col in chargeColumn){
                            let chargeCol=chargeColumn[col];
                            let diffCol=diff[col];
                            if(chargeCol!=diffCol){
                                chargeColumn[col]= chargeCol+'>'+diffCol
                            }
                        }
                        assembleColumns.push(chargeColumn)
                    }
                }
                if(heards.size==0){
                    for(const key in prodChargeDiff[0]){
                        let head={};
                        head["text"]=getColumnDesc_(key);
                        head["value"]=key;
                        heards.push(head);
                    }
                }
                for(const index in prodChargeDiff){
                    const prodCharge= prodChargeDiff[index];
                    const dmlType=prodCharge.dmlType;
                    let diffData={}
                    if(dmlType == 'I'){
                        const keyAndValue=index;
                        for(const num in heards){
                            const value=heards[num].value
                            diffData[value]=prodCharge[value];
                        }
                        assembleColumns.push(diffData)
                    }
                }
                const reColumn = {"headers": heards,"column": assembleColumns}
                this.prodCharge= reColumn;
            },
        }
    }
</script>
<style scoped>
    .diffTitle {
      font-size: large;
    }
    .imgUserIndexFlow {
      width: 100px;
      display: inline-block;
      margin-left: 40%
    }
  .showMsg {
       color: deepskyblue;
       font-size: x-large;
       font-style: inherit;
       margin-left: 30%;
     }
    .descClass {
      color: deepskyblue;
      font-size: large;
      font-style: inherit;
      margin-right: 0px;
      margin-top: 0px;
      margin-left: 10%
    }
    .textBox {
      margin-top: 5px;
    }
  .btnClass {
    margin-top: 5%;
    margin-left: 25%;
    width: 50%;
    font-size: large;
  }
</style>
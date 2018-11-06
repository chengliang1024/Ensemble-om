<template>
    <div class="app-container">
        <v-layout row wrap>
            <v-flex lg9 sm9 class="v-card">
                <v-toolbar color="primary lighten-1" dark tabs>
                    <v-toolbar-side-icon></v-toolbar-side-icon>
                    <v-toolbar-title class="white--text">{{prodCode}}-{{prodDesc}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="refreshClick">
                        <v-icon>refresh</v-icon>
                    </v-btn>
                    <v-tabs color="primary lighten-1" slot="extension" v-model="activeName" grow show-arrows>
                        <v-tabs-slider color="yellow"></v-tabs-slider>
                        <v-tab v-for="n in prodInfo" :key="n">
                            {{ n.text}}
                        </v-tab>
                    </v-tabs>
                </v-toolbar>
                <v-tabs-items v-model="activeName" class="white elevation-1">
                    <v-tab-item v-for="i in 12" :key="i">
                        <v-card flat>
                        <acct-base-info v-if="i==1" v-bind:prodData="prodData"></acct-base-info>
                        <control-info v-if="i==2" v-bind:prodData="prodData"></control-info>
                        <product-object v-if="i==3" v-bind:prodData="prodData"></product-object>
                        <int-detail v-if="i == 4" v-bind:prodData="prodData"></int-detail>
                        <open-acct v-if="i==5" v-bind:prodData="prodData"></open-acct>
                        <close-acct v-if="i==6" v-bind:prodData="prodData"></close-acct>
                        <Deposit v-if="i==7" v-bind:prodData="prodData"></Deposit>
                        <draw-info v-if="i==8" v-bind:prodData="prodData"></draw-info>
                        <charge-define v-if="i==9" v-bind:prodData="prodData"></charge-define>
                        <rate-info v-if="i==10" v-bind:prodData="prodData"></rate-info>
                        <form-shift v-if="i==11" v-bind:prodData="prodData"></form-shift>
                        <accounting-info v-if="i==12" v-bind:prodData="prodData"></accounting-info>
                        </v-card>
                    </v-tab-item>
                </v-tabs-items>
            </v-flex>
            <v-flex lg3 sm3 class="v-card">
                <v-card>
                    <v-card-text>
                        <down-action v-if="pendFlag==0" v-on:listenToCopy="listenToCopy" v-on:saveProd="saveProd" v-on:tempProd="tempProd"></down-action>
                        <pending-form v-if="pendFlag==1"></pending-form>
                    </v-card-text>
                </v-card>
                <prod-list-form v-bind:prodClass="prodClass" v-on:listenToProdList="listenToProdList"></prod-list-form>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import {
        getProdType
    } from '@/api/url/prodInfo'
    import {
        savaProdInfo
    } from '@/api/url/prodInfo';
    import BranchForm from "../form/BranchFormProd";
    import VWidget from '@/components/VWidget';
    import VuePerfectScrollbar from 'vue-perfect-scrollbar';
    import { getProdData } from "@/api/url/prodInfo";
    import {filterChangeData} from "@/server/filterChangeData";

    import AcctBaseInfo from '../form/rbModel/AcctBaseInfo';
    import controlInfo from '../form/rbModel/ControlInfo';
    import ProductObject from '../form/rbModel/ProductObject';
    import IntDetail from '../form/rbModel/IntDetail';
    import OpenAcct from '../form/rbModel/OpenAcct';
    import CloseAcct from  '../form/rbModel/CloseAcct';
    import DrawInfo from  '../form/rbModel/DrawInfo';
    import Deposit from  '../form/rbModel/Deposit';
    import ChargeDefine from '../form/rbModel/ChargeDefine';
    import RateInfo from '../form/rbModel/RateInfo';
    import FormShift from '../form/rbModel/FormShift';
    import AccountingInfo from '../form/rbModel/AccountingInfo';

    import downAction from '../btn/downAction';
    import ProdListForm from '../form/ProdListForm';
    import PendingForm from '../btn/PendingForm';
    import { getCheckFlowList } from "@/api/url/prodInfo";
    import toast from '@/utils/toast';

    export default {
        name: 'deposit',
        components: {
            BranchForm,
            VWidget,
            VuePerfectScrollbar,
            controlInfo,
            AcctBaseInfo,
            ProductObject,
            IntDetail,
            OpenAcct,
            CloseAcct,
            DrawInfo,
            Deposit,
            ChargeDefine,
            RateInfo,
            FormShift,
            AccountingInfo,
            downAction,
            ProdListForm,
            PendingForm
        },
        data () {
            return {
                listLoading: true,
                showCopy: '',
                prodCode: '',
                prodDesc: '',
                pendFlag: 0,
                prodClass: '',
                activeName: 'basic',
                prodInfo: [{
                    icon: 'account_balance',
                    text: '基本信息'
                }, {
                    icon: 'filter_vintage',
                    text: '控制信息'
                }, {
                    icon: 'work',
                    text: '适用范围'
                }, {
                    icon: 'work',
                    text: '利息信息'
                }, {
                    icon: 'work',
                    text: '开户定义'
                }, {
                    icon: 'work',
                    text: '销户定义'
                }, {
                    icon: 'work',
                    text: '存入定义'
                }, {
                    icon: 'work',
                    text: '支取定义'
                }, {
                    icon: 'work',
                    text: '收费定义'
                }, {
                    icon: 'work',
                    text: '利率信息'
                }, {
                    icon: 'work',
                    text: '形态转移'
                }, {
                    icon: 'work',
                    text: '核算信息'
                }],
                files: [{
                    icon: 'assignment',
                    iconClass: 'blue white--text',
                    value: '',
                    lable: ''
                }],
                folders: [],
                prodData: {},
                sourceProdData: {},
                targetData: {}
            }
        },
        mounted: function() {
            //检查是否存在待处理数据
            this.queryProdFlow();
            window.getApp.$emit('APP_DRAWER_TOGGLED');
            if(this.$route.hash !== "" && this.$route.hash !== null) {
                //默认展示RB101产品信息
                getProdData(this.$route.hash).then(response => {
                    this.prodData = response.data.data
                    this.prodCode = response.data.data.prodType.prodType
                    this.prodDesc = response.data.data.prodType.prodDesc
                    this.sourceProdData = this.copy(this.prodData,this.sourceProdData)
                this.prodClass= response.data.data.prodType.prodClass
                });
            }else if(this.$route.params.prodClassCmp !== "" && this.$route.params.prodClassCmp !== null){
                //通过全局搜索/产品目录  获取目标产品产品组代码
                this.prodClass = this.$route.params.prodClassCmp
            }
            //通过全局搜索/产品目录 获取目标产品代码
            if(this.$route.params.prodType !== "" && this.$route.params.prodType !== null){
                this.listenToProdList(this.$route.params)
            }
        },
        methods: {
            queryProdFlow(){
                getCheckFlowList().then(response => {
                    let length = response.data.data.length
                    for(let j = 0; j<length; j++){
                        if(response.data.data[j].flowManage.status === "2"){
                            this.pendFlag = 1
                            toast.info("存在已提交数据，等待复核!");
                            break
                        }
                        if(response.data.data[j].flowManage.status === "3"){
                            this.pendFlag = 1
                            toast.info("存在已复核数据，等待发布！");
                            break
                        }
                    }
                });
            },
            queryProdInfo() {
                console.log('start query prod info')
            },
            saveProd() {
                this.targetData = filterChangeData(this.prodData, this.sourceProdData,this.showCopy)
                if(this.showCopy === "Y") {
                    this.targetData.optionType = "I"
                }else{
                    this.targetData.optionType = "U"
                }
                this.targetData.option = "save";
                this.targetData.userName = sessionStorage.getItem("userId")
                savaProdInfo(this.targetData).then(response => {
                    if(response.status === 200) {
                        this.pendFlag = 1
                        toast.success("提交成功！");
                    }
                })
            },
            tempProd() {
                this.targetData = filterChangeData(this.prodData,this.sourceProdData,this.showCopy)
                if(this.showCopy === "Y") {
                    this.targetData.optionType = "I"
                }else{
                    this.targetData.optionType = "U"
                }
                this.targetData.option="temp";
                this.targetData.userName = sessionStorage.getItem("userId")
                savaProdInfo(this.targetData).then(response => {
                    if(response.status === 200) {
                        toast.success("暂存成功！");
                    }
                })
            },
            listenToProdList(value) {
                this.prodCode = value.prodType
                this.prodData = {}
                getProdData(this.prodCode).then(response => {
                    this.prodData = response.data.data
                    this.prodDesc = response.data.data.prodType.prodDesc
                    this.sourceProdData = this.copy(this.prodData,this.sourceProdData)
                });
            },
            //对象浅复制
            copy(obj1,obj2) {
                var obj = obj2||{};
                for(let name in obj1){
                    if(typeof obj1[name] === "object" && obj1[name]!== null){
                        obj[name]= (obj1[name].constructor===Array)?[]:{};
                        this.copy(obj1[name],obj[name]);
                    }else{
                        obj[name]=obj1[name];
                    }
                }
                return obj;
            },
            initStage(value){
                this.listValue = value
            },
            onSubmit() {
                this.$message('submit!')
            },
            onCancel() {
                this.$message({
                    message: 'cancel!',
                    type: 'warning'
                })
            },
            listenToCopy(data) {
                this.prodCode=data.prodType;
                this.prodDesc = data.prodDesc;
                this.prodData.prodType.prodType=data.prodType;
                this.prodData.prodType.prodDesc=data.prodDesc;
                const newData=this.copy(this.prodData,[]);
                this.prodData=newData;
                if(!data.showCopy){
                    this.showCopy = 'Y';
                }else{
                    this.showCopy = '';
                }
            },
            refreshClick() {
                getProdData(this.prodCode).then(response => {
                    this.prodData = response.data.data
                    this.prodCode = response.data.data.prodType.prodType
                    this.prodDesc = response.data.data.prodType.prodDesc
                    this.sourceProdData = this.copy(this.prodData,this.sourceProdData)
                });
            }
        }
    }
</script>

<style scoped>
    .top {
        padding-top: 8px;
    }
    .depositTree {
        height: calc(90vh - 48px);
    }
    /*  .prodList {
                  border-top-style: solid;border-top-width: 1px;border-color: rgba(40, 24, 31, 0.21);
                }
                .prodLists {
                  border-bottom-style: solid;border-bottom-width: 3px;border-color: rgba(183, 172, 177, 0.6);
                }*/
</style>
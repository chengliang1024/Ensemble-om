<template>
    <div class="app-container">
        <v-layout row wrap>
            <v-flex lg9 sm9 class="v-card">
                <v-toolbar color="primary lighten-1" dark tabs>
                    <v-toolbar-side-icon></v-toolbar-side-icon>
                    <v-toolbar-title class="white--text">{{prodCode}}-{{prodDesc}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <!--<v-bottom-sheet v-if="showAdd">-->
                    <!--<v-btn flat icon="refresh" slot="activator" @click="addClick" color="orange">-->
                    <!--<v-icon>add</v-icon>-->
                    <!--</v-btn>-->
                    <!--<v-card>-->
                    <!--<dc-treeAttr v-model="tree" :options="treeOptions" labelDesc="产品参数增加"></dc-treeAttr>-->
                    <!--</v-card>-->
                    <!--</v-bottom-sheet>-->
                    <v-tooltip bottom color="orange">
                        <v-btn flat icon="edit" slot="activator" @click="editClick" :color="editColor">
                            <v-icon>edit</v-icon>
                        </v-btn>
                        <span>{{editDesc}}</span>
                    </v-tooltip>
                    <v-tooltip bottom color="orange">
                        <v-btn flat icon="refresh" slot="activator" @click="refreshClick">
                            <v-icon>refresh</v-icon>
                        </v-btn>
                        <span>刷新</span>
                    </v-tooltip>
                    <v-tabs color="primary lighten-1" slot="extension" v-model="activeName" grow show-arrows>
                        <v-tabs-slider color="yellow"></v-tabs-slider>
                        <v-tab v-for="n in prodInfo" :key="n.pageCode">
                            {{ n.text}}
                        </v-tab>
                    </v-tabs>
                </v-toolbar>
                <v-tabs-items v-model="activeName" class="white elevation-1">
                    <v-tab-item v-for="i in prodInfo" :key="i.pageCode">
                        <!--<v-card flat>-->
                            <base-prod :showEdit="showEdit" v-if="i.pageCode=='BASE'&&prodData.prodType.prodRange != 'S'" :prodTypeCode="prodData.prodType.prodType" :prodType="prodData.prodType" :prodDefines="prodData.prodDefines" tags="BASE"></base-prod>
                            <sold-prod v-if="i.pageCode=='BASE'&&prodData.prodType.prodRange != 'B'" :prodTypeCode="prodData.prodType.prodType" :prodType="prodData.prodType" :prodDefines="prodData.prodDefines" tags="BASE"></sold-prod>
                            <base-prod v-if="i.pageCode=='CONTROL'" :prodTypeCode="prodData.prodType.prodType" :prodDefines="prodData.prodDefines" tags="CONTROL"></base-prod>
                            <base-prod v-if="i.pageCode=='APPLY'" :prodTypeCode="prodData.prodType.prodType" :prodDefines="prodData.prodDefines" tags="APPLY"></base-prod>
                            <base-prod v-if="i.pageCode=='CYCLE'" :prodTypeCode="prodData.prodType.prodType" :prodDefines="rateList" tags="CYCLE"></base-prod>
                            <base-prod v-if="i.pageCode=='OPEN'" :prodTypeCode="prodData.prodType.prodType" :prodDefines="openList" tags="OPEN"></base-prod>
                            <base-prod v-if="i.pageCode=='CLOSE'" :prodTypeCode="prodData.prodType.prodType" :prodDefines="closeList" tags="CLOSE"></base-prod>
                            <base-prod v-if="i.pageCode=='DEP'" :prodTypeCode="prodData.prodType.prodType" :prodDefines="depositList" tags="DEP"></base-prod>
                            <base-prod v-if="i.pageCode=='WTD'" :prodTypeCode="prodData.prodType.prodType" :prodDefines="drawList" tags="WTD"></base-prod>
                            <charge-define v-if="i.pageCode=='CHARGE'" v-bind:prodData="prodData"></charge-define>
                            <rate-info v-if="i.pageCode=='RATEINFO'" v-bind:prodData="prodData"></rate-info>
                            <form-shift v-if="i.pageCode=='SHIFT'" v-bind:prodData="prodData"></form-shift>
                            <accounting-info v-if="i.pageCode=='ACCOUNTING'" v-bind:prodData="prodData"></accounting-info>
                        <!--</v-card>-->
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
                <v-window v-model="onboarding" :class="depositTree">
                    <v-card-actions v-if="windowShow == 3">
                        <v-item-group v-model="onboarding" style="margin-left: 30%">
                            <v-item v-for="n in length" :key="`btn-${n}`">
                                <v-btn slot-scope="{ active, toggle }" :input-value="active" icon @click="toggle">
                                    <v-icon color="orange">home</v-icon>
                                </v-btn>
                                </v-item>
                        </v-item-group>
                    </v-card-actions>
                    <v-window-item v-for="n in length" :key="`card-${n}`">
                        <prod-list-form v-if="n == 2 || windowShow == 0" v-bind:prodClass="prodClass" v-on:listenToProdList="listenToProdList"></prod-list-form>
                        <dc-treeAttr v-if="n == 1 && windowShow != 0" v-model="tree" :options="treeOptions" labelDesc="产品参数"></dc-treeAttr>
                    </v-window-item>
                </v-window>
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
    import VWidget from '@/components/VWidget';
    import VuePerfectScrollbar from 'vue-perfect-scrollbar';
    import { getProdData } from "@/api/url/prodInfo";
    import {filterChangeData} from "@/server/filterChangeData";
    import { getCheckFlowList } from "@/api/url/prodInfo";
    import toast from '@/utils/toast';
    import downAction from '@/views/prodFactory/prodInfo/btn/downAction';
    import column from './column'
    import tags from './tags'
    import columnInfo from './columnInfo'
    import PendingForm from '@/views/prodFactory/prodInfo/btn/PendingForm';
    import BaseProd from './baseProd/BaseProd'
    import SoldProd from './soldProd/soldProd'
    import ChargeDefine from './form/rbModel/ChargeDefine';
    import ProdListForm from './form/ProdListForm';
    import RateInfo from './form/rbModel/RateInfo';
    import FormShift from './form/rbModel/FormShift';
    import AccountingInfo from './form/rbModel/AccountingInfo';
    import DcTreeAttr from "@/components/widgets/DcTreeAttr";
    export default {
        name: 'deposit',
        components: {
            VWidget,
            BaseProd,
            SoldProd,
            downAction,
            ProdListForm,
            PendingForm,
            columnInfo,
            ChargeDefine,
            RateInfo,
            FormShift,
            AccountingInfo,
            DcTreeAttr
        },
        data () {
            return {
                listLoading: true,
                dialog: false,
                showCopy: '',
                length: 2,
                onboarding: 0,
                prodCode: '',
                windowShow: 0,
                prodDesc: '',
                showAdd: false,
                depositTree: '',
                pendFlag: 0,
                columnArr: [1,2,3,4,5,6,7,8,9,10,11,12],
                prodClass: '',
                activeName: null,
                eventList: {},
                showEdit: false,
                baseAttr: true,
                addColumnsRef: [],
                addColumnInfos: [],
                prodInfo: [
                    {icon: 'account_balance', text: '基本信息', pageCode: 'BASE'},
                    {icon: 'filter_vintage', text: '控制信息', pageCode: 'CONTROL'},
                    {icon: 'filter_vintage', text: '适用范围',pageCode: 'APPLY'},
                    {icon: 'filter_vintage', text: '利息信息', pageCode: 'CYCLE'},
                    {icon: 'filter_vintage', text: '开户定义', pageCode: 'OPEN'},
                    {icon: 'filter_vintage', text: '销户定义', pageCode: 'CLOSE'},
                    {icon: 'filter_vintage', text: '存入定义', pageCode: 'DEP'},
                    {icon: 'filter_vintage', text: '支取定义', pageCode: 'WTD'},
                    {icon: 'filter_vintage', text: '收费定义', pageCode: 'CHARGE'},
                    {icon: 'filter_vintage', text: '利率信息', pageCode: 'RATEINFO'},
                    {icon: 'filter_vintage', text: '形态转移', pageCode: 'SHIFT'},
                    {icon: 'filter_vintage', text: '核算信息', pageCode: 'ACCOUNTING'}
                ],
                tagList: [],
                files: [{
                    icon: 'assignment',
                    iconClass: 'blue white--text',
                    value: '',
                    lable: ''
                }],
                folders: [],
                rateList: {},
                openList: {},
                closeList: {},
                depositList: {},
                drawList: {},
                prodData: {
                    prodType: ''
                },
                sourceProdData: {},
                targetData: {},
                treeOptions: [],
                tree: [],
                editColor: "write",
                editDesc: "编辑模式"
            }
        },
        watch: {
            //监听参数增加界面返回数据
            tree: {
                handler(msg) {
                    this.useAddClick(msg);
                }
            }
        },
        mounted: function() {
            // 监听这个dom的scroll事件
            window.addEventListener('scroll', () => {
                const height= window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                if(height>=176){
                    this.depositTree='depositTreeFixed'
                }else{
                    this.depositTree=''
                }

            }, true)
            this.queryProdFlow();
            window.getApp.$emit('APP_DRAWER_TOGGLED');
            //组织树形组件备选数据
            for(let i in columnInfo){
                if(columnInfo[i].parentCode !== undefined){
                    columnInfo[i].key = i
                    this.treeOptions.push(columnInfo[i])
                }
            }
            //初始化产品信息
            if(this.$route.hash !== "" && this.$route.hash !== null) {
                //点击主菜单产品组时 获取产品组代码
                getProdData(this.$route.hash).then(response => {
                    //初始化产品基础参数
                    this.prodCode = response.data.data.prodType.prodType
                    this.prodDesc = response.data.data.prodType.prodDesc
                    const reProd  = response.data.data
                    this.prodData= reProd;
                    this.sourceProdData = this.copy(this.prodData,this.sourceProdData)
                    this.initEventAttr(reProd)
                    this.prodClass= this.prodData.prodType.prodClass

                });
            }else if(this.$route.params.prodClassCmp !== "" && this.$route.params.prodClassCmp !== null){
                //通过全局搜索/产品目录  获取目标产品产品组代码
                this.prodClass = this.$route.params.prodClassCmp
            }
        },
        methods: {
            initEventAttr(reProd) {
                //初始化事件，指标参数
                this.rateList = this.dealEventPart(reProd,"CYCLE",this.prodCode)
                this.openList = this.dealEventPart(reProd,"OPEN",this.prodCode)
                this.closeList = this.dealEventPart(reProd,"CLOSE",this.prodCode)
                this.depositList = this.dealEventPart(reProd,"DEP",this.prodCode)
                this.drawList = this.dealEventPart(reProd,"WTD",this.prodCode)
            },
            //流程检查是否存在需要处理的数据
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
            //保存事件
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
            //暂存事件
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
            //产品菜单列表监听
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
            //复制事件监听
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
            //刷新按钮事件
            refreshClick() {
                getProdData(this.prodCode).then(response => {
                    this.prodData = response.data.data
                    this.prodCode = response.data.data.prodType.prodType
                    this.prodDesc = response.data.data.prodType.prodDesc
                    this.sourceProdData = this.copy(this.prodData,this.sourceProdData)
                });
            },
            //编辑事件触发
            editClick() {
                this.windowShow = this.windowShow?0:1
                const edit=this.showEdit;
                this.showEdit=edit==false?true:false;
//                const baseAttr = this.baseAttr
//                this.baseAttr=baseAttr==false?true:false;
                if(this.showAdd){
                    this.showAdd = false
                    this.editDesc = "编辑模式"
                    this.editColor = "write"
                }else{
                    this.showAdd = true
                    this.editDesc = "退出编辑"
                    this.editColor = "orange"
                }
            },
            //增加参数处理事件
            useAddClick(val) {
                //获取当前界面key
                let addColumnPageCode = this.prodInfo[this.activeName].pageCode
                let addColumnData = this.copy(this.prodData,this.addData)
                let showFlag = 0
                for(let i=0; i<val.length; i++){
                    let columnKey = val[i].split("--")[0]
                    let columnDesc = val[i].split("--")[1]
                    //组装向mbProdDefine保存的数据对象
                    if(addColumnPageCode === "BASE" || addColumnPageCode === "CONTROL" || addColumnPageCode === "APPLY") {
                        //获取新增参数pageSeqNo
                        let addColumnPageSeqNo = this.getDefinedMaxSeqNo(this.prodData,addColumnPageCode,"pageSeqNo")+i+1
                        //获取新增参数SeqNo
                        let addColumnSeqNo = (parseInt(this.getDefinedMaxSeqNo(this.prodData,addColumnPageCode,"seqNo"))+i+1)+""
                        if (this.prodData.prodDefines[columnKey] !== undefined) {
                            //已经存在该条数据
                            showFlag = 1
                            toast.info("产品已存在参数" + columnKey + "【" + columnDesc + "】");
                        } else {
                            addColumnData.prodDefines[columnKey] = {}
                            addColumnData.prodDefines[columnKey].prodType = this.prodCode
                            addColumnData.prodDefines[columnKey].seqNo = addColumnSeqNo
                            addColumnData.prodDefines[columnKey].pageCode = addColumnPageCode
                            addColumnData.prodDefines[columnKey].pageSeqNo = addColumnPageSeqNo
                            addColumnData.prodDefines[columnKey].attrKey = columnKey
                            addColumnData.prodDefines[columnKey].attrValue = ""
                            addColumnData.prodDefines[columnKey].status = "A"
                            addColumnData.prodDefines[columnKey].assembleType = "ATTR"
                            addColumnData.prodDefines[columnKey].assembleId = columnKey
                        }
                    }
                    //组装向mbEventArrt保存的数据对象
                    if(addColumnPageCode === "CYCLE" || addColumnPageCode === "OPEN" || addColumnPageCode === "CLOSE"|| addColumnPageCode === "DEP" || addColumnPageCode === "WTD") {
                        let eventType = addColumnPageCode+"_"+this.prodCode
                        //获取新增参数pageSeqNo
                        let PageSeqNo = this.getEventMaxSeqNo(this.prodData,addColumnPageCode,"pageSeqNo",eventType)+i+1
                        //获取新增参数SeqNo
                        let SeqNo = (parseInt(this.getEventMaxSeqNo(this.prodData,addColumnPageCode,"seqNo",eventType))+i+1)+""
                        if(this.prodData.mbEventInfos[eventType][columnKey] !== undefined){
                            //已经存在该条数据
                            showFlag = 1
                            toast.info("事件" + eventType +"已存在参数【" + columnDesc + "】");
                        }else{
                            addColumnData.mbEventInfos[eventType].mbEventAttrs[columnKey] = {}
                            addColumnData.mbEventInfos[eventType].mbEventAttrs[columnKey].eventType = eventType
                            addColumnData.mbEventInfos[eventType].mbEventAttrs[columnKey].seqNo = SeqNo
                            addColumnData.mbEventInfos[eventType].mbEventAttrs[columnKey].assembleType = "ATTR"
                            addColumnData.mbEventInfos[eventType].mbEventAttrs[columnKey].assembleId = columnKey
                            addColumnData.mbEventInfos[eventType].mbEventAttrs[columnKey].attrValue = ""
                            addColumnData.mbEventInfos[eventType].mbEventAttrs[columnKey].assembleRule = "A"
                            addColumnData.mbEventInfos[eventType].mbEventAttrs[columnKey].perEffect = ""
                            addColumnData.mbEventInfos[eventType].mbEventAttrs[columnKey].pageCode = addColumnPageCode
                            addColumnData.mbEventInfos[eventType].mbEventAttrs[columnKey].pageSeqNo = PageSeqNo
                        }
                    }
                }
                if(showFlag === 0) {
                    this.prodData = addColumnData
                    this.initEventAttr(this.prodData)
                    toast.success("产品增加参数成功！");
                    this.dialog = false
                }
            },
//            editClick() {
//                const edit=this.showEdit;
//                this.showEdit=edit==false?true:false;
//            },
            addClick() {
                this.addColumnPageDesc = this.prodInfo[this.activeName].text
                //获取所有参数定义的json文件（columnInfo.json）增加到待选数据集合
                for(let i in columnInfo){
                    this.addColumnsRef.push(i+'--'+columnInfo[i].columnDesc)
                }
            },
            //获取mbProdDefine最大seqNo val:目标集合 pageCode：当前所属界面标志
            getDefinedMaxSeqNo(val,pageCode,key) {
                //获取界面元素数组
                let SeqNoArr = []
                let keys = key
                for(let i in val.prodDefines){
                    if(keys === "pageSeqNo" && val.prodDefines[i].pageCode === pageCode && val.prodDefines[i][keys] !== null && val.prodDefines[i][keys] !== '') {
                        SeqNoArr.push(val.prodDefines[i][keys])
                    }else if(keys === "seqNo" && val.prodDefines[i].prodType === this.prodCode){
                        SeqNoArr.push(val.prodDefines[i][keys])
                    }
                }
                //获取seqNoArr数组最大数据
                let maxSeqNo = SeqNoArr[0]
                for(let j=1; j<SeqNoArr.length; j++){
                    if(maxSeqNo < SeqNoArr[j]){
                        maxSeqNo = SeqNoArr[j]
                    }
                }
                return maxSeqNo
            },
            //获取mbEventAttr最大seqNo val:目标集合 pageCode：当前所属界面标志
            getEventMaxSeqNo(val,pageCode,key,eventType) {
                //获取界面元素数组
                let SeqNoArr = []
                let keys = key
                for(let i in val.mbEventInfos[eventType].mbEventAttrs){
                    if(keys === "pageSeqNo" && val.mbEventInfos[eventType].mbEventAttrs[i].pageCode === pageCode && val.mbEventInfos[eventType].mbEventAttrs[i][keys] !== null && val.mbEventInfos[eventType].mbEventAttrs[i][keys] !== '') {
                        SeqNoArr.push(parseInt(val.mbEventInfos[eventType].mbEventAttrs[i][keys]))
                    }else if(keys === "seqNo"){
                        for(let x in val.mbEventInfos){
                            if(x === eventType){
                                SeqNoArr.push(parseInt(val.mbEventInfos[eventType].mbEventAttrs[i][keys]))
                            }
                        }
                    }
                }
                //获取seqNoArr数组最大数据
                let maxSeqNo = SeqNoArr[0]
                for(let y=1; y<SeqNoArr.length; y++){
                    if(maxSeqNo < SeqNoArr[y]){
                        maxSeqNo = SeqNoArr[y]
                    }
                }
                return maxSeqNo
            },
            //处理event part参数 data： 目标集合 eventType：事件类型 prodCode：产品类型   将参数组织成{{key:"",value: ""},{key:"",value: ""},...}结构
            dealEventPart(data,eventType,prodCode) {
                let eventTypes = eventType+'_'+prodCode
                const event=data.mbEventInfos[eventTypes]
                let events={}
                for(const index in event.mbEventAttrs){
                    events[index]=event.mbEventAttrs[index]
                }
                for(const index in event.mbEventParts){
                    const part=event.mbEventParts[index]
                    for(const key in part){
                        events[key]=part[key]
                    }
                }
                return events
            }
        }
    }
</script>

<style scoped>
    .addClass {
        color: white;
        margin-left: 20%;
        font-size: large;
    }
    .addBtn {
        margin-top: -10px;
        width: 160px
    }
    .depositTreeFixed {
        position: fixed;
        top: 63px;
        width: 24%;
    }
</style>
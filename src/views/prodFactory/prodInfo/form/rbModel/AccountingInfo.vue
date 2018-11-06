<template>
    <v-card>
        <v-toolbar card dense color="transparent">
                <a-button type="primary" class="ml-2" @click="onAdd">新增</a-button>
                <a-button type="primary" class="ml-2" @click="onEdit">修改</a-button>
                <a-button type="primary" class="ml-2" dark @click="onDelete">删除</a-button>
                <v-dialog
                        v-model="dialog"
                        width="500"
                >
                <v-card>
                        <v-card-text>
                            <v-form v-model="valid">
                                <v-text-field
                                        :disabled="disabledFlag"
                                        v-model="selected.prodType"
                                        :counter="10"
                                        label="产品类型"
                                        required
                                        class="mx-5"
                                ></v-text-field>
                    <v-text-field
                            v-model="selected.accountingStatus"
                            :counter="10"
                            label="核算状态"
                            required
                            class="mx-5"
                    ></v-text-field>
                    <v-text-field
                            v-model="selected.businessUnit"
                            :counter="10"
                            label="账套"
                            required
                            class="mx-5"
                    ></v-text-field>
                    <v-text-field
                            v-model="selected.glCodeL"
                            :counter="10"
                            label="负债科目代码"
                            required
                            class="mx-5"
                    ></v-text-field>
                    <v-text-field
                            v-model="selected.glCodeIntE"
                            :counter="10"
                            label="利息支出科目代码"
                            required
                            class="mx-5"
                    ></v-text-field>
                        <v-text-field
                                v-model="selected.glCodeIntPay"
                                :counter="10"
                                label="应付利息科目代码"
                                required
                                class="mx-5"
                        ></v-text-field>
                    </v-form>
                        <v-btn
                                color="green darken-1"
                                flat="flat"
                                @click="submit"
                        >
                            确认
                        </v-btn>
                        <v-btn
                                color="green darken-1"
                                flat="flat"
                                @click="dialog = false"
                        >
                            取消
                        </v-btn>
                    </v-card-text>
                </v-card>
                </v-dialog>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="pa-0">
            <a-table :customRow="customRow" :columns="columns" :dataSource="accountingInfos" bordered>
            </a-table>
            <v-divider></v-divider>
        </v-card-text>
    </v-card>
</template>
<script>
    import {getChargeDefine} from '@/api/table';
    import {getColumnDesc} from '@/utils/columnDesc'
    import toast from '@/utils/toast';
    import { getInitData } from "@/mock/init";
    import {removeByValue} from '@/utils/util'

    export default {
        filters: {
            getDescByKey: function (key) {
                return getColumnDesc(key)
            }
        },
        props: ["prodData"],
        data () {
            return {
                disabledFlag: false,
                valid: true,
                select: {},
                columns: [
                    {dataIndex: 'prodType', title: '产品类型',scopedSlots: { customRender: 'prodType' }},
                    {dataIndex: 'accountingStatus', title: '核算状态'},
                    {dataIndex: 'businessUnit', title: '账套'},
                    {dataIndex: 'glCodeL', title: '负债科目编码'},
                    {dataIndex: 'glCodeIntE', title: '利息支出科目代码'},
                    {dataIndex: 'glCodeIntPay', title: '应付利息科目代码'},
                ],
                dialog: false,
                accountingInfos: [],
                selected: {},
                option: '',
                addFlag: false,
                modFlag: false,
                refData: getInitData,
                editedItem: {
                    prodType: '',
                    accountingStatus: '',
                    businessUnit: '',
                    glCodeL: '',
                    glCodeIntE: '',
                    glCodeIntPay: ''
                },
                defaultItem: {
                    prodType: '',
                    accountingStatus: '',
                    businessUnit: '',
                    glCodeL: '',
                    glCodeIntE: '',
                    glCodeIntPay: ''
                },
                projects: [{
                    prodType: '',
                    accountingStatus: '',
                    businessUnit: '',
                    glCodeL: '',
                    glCodeIntE: '',
                    glCodeIntPay: ''
                }],
                prodAccountingInfo: {}
            };
        },
        computed: {

        },
        watch: {
            prodData (val) {
                this.getAccountingInfo(val)
            }
        },
        mounted: function() {
            this.getAccountingInfo(this._props.prodData)
        },
        methods: {
            submit () {
                if(this.option == 'add'){
                    let dataSource=this.accountingInfos
                    let selected=this.selected;
                    selected.prodType=this.prodType
                    dataSource.push(selected)
                }
                this.dialog=false;
            },
            onDelete () {
                let dataSource=this.accountingInfos
                removeByValue(dataSource,this.selected)
            },
            onAdd () {
                this.option='add';
                this.selected={};
                this.dialog=true;
                this.disabledFlag=true
            },
            onEdit () {
                this.option='edit';
                this.dialog=true;
                this.disabledFlag = true;
            },
            customRow (record) {
                return {
                    on: {
                        click: this.clickRow.bind(this, record)
                    }
                }
            },
            clickRow(record,event){
                var tr=event.currentTarget;
                var tbd=tr.parentNode;
                for (const i in tbd.childNodes) {
                    if (!isNaN(i)) {
                        if (tr == tbd.childNodes[i]) {
                            tbd.childNodes[i].style = 'background-color: #e6f7ff';
                        } else {
                            tbd.childNodes[i].style = '';
                        }
                    }
                }
                this.selected=record;
            },
            getAccountingInfo(val) {
                //初始化产品对应的信息
                if(val!=undefined&&val.prodType.prodType!=undefined) {
                    this.accountingInfos = val.glProdAccounting
                    this.prodType = val.prodType.prodType
                }
            },
            editItem (item) {
                this.editedIndex = this.projects.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
                this.close()

            },
            initRefDate() {
                this.accountingStatus = this.refData[2].paraDataRb.accountingStatus;
                //暂时不区分科目代码
                this.glCodeL = this.refData[2].paraDataRb.glCode;
                this.glCodeIntE = this.refData[2].paraDataRb.glCode;
                this.glCodeIntPay = this.refData[2].paraDataRb.glCode;
            },
            deleteItem (item) {
                const index = this.projects.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
            },
            close () {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },
            save () {
                if (this.editedIndex > -1) {
                    Object.assign(this.projects[this.editedIndex], this.editedItem)
                } else {
                    let flag = 0
                    for(let i = 0; i<this.prodAccountingInfo.length; i++){
                        if(this.editedItem.accountingStatus === "" || this.editedItem.accountingStatus === undefined){
                            toast.info("主键accountingStatus[核算状态]不能为空!");
                            flag = 1
                            break
                        }else if(this.prodAccountingInfo[i].prodType === this.editedItem.prodType && this.prodAccountingInfo[i].accountingStatus === this.editedItem.accountingStatus){
                            toast.info("主键accountingStatus[核算状态:"+this.editedItem.accountingStatus+"]不能重复!");
                            flag = 1
                            break
                        }
                    }
                    if(flag === 0){
                        this.prodAccountingInfo.push(this.editedItem)
                        this.close()
                    }
                }
            },
            getSelect(value){
                this.editedItem = []
                this.editedItem = value
            },
            addClick() {
                this.initRefDate()
                this.editedItem = []
                //新增产品类型默认&&不允许修改
                this.editedItem.prodType = this.prodType
                this.modFlag = false
                this.addFlag = true
            },
            modClick() {
                this.initRefDate()
                this.addFlag = false
                this.modFlag = true
            },
            saveClick() {
                if(this.addFlag){
                    this.save()
                }else if(this.modFlag){
                    this.editItem()
                }
            }
        }
    };
</script>
<style>
    .chargeSelected {
        background-color: #e3f2fd;
    }
</style>

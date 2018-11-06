<template>
    <v-container fluid pr-5 pt-0>
        <v-flex xs12 md12 lg12>
            <div slot="widget-content">
                <v-container fluid pt-1>
                    <v-layout row wrap>
                        <v-layout row wrap v-if="prodType!= undefined ">
                            <v-flex md6 lg6>
                                <dc-text-field labelDesc="产品代码" v-model="prodType.prodType"></dc-text-field>
                            </v-flex>
                            <v-flex md6 lg6>
                                <dc-text-field labelDesc="产品描述" v-model="prodType.prodDesc"></dc-text-field>
                            </v-flex>
                            <v-flex md6 lg6 v-if="prodDefines!=undefined">
                                <dc-multiselect :options="sourceModuleOption" labelDesc="业务模块" :isMultiSelect="false" v-model="prodDefines.SOURCE_MODULE.attrValue" class="dcMulti"></dc-multiselect>
                            </v-flex>
                            <v-flex md6 lg6>
                                <dc-multiselect :options="prodClassOption" labelDesc="产品分类" :isMultiSelect="false" v-model="prodType.prodClass" class="dcMulti"></dc-multiselect>
                            </v-flex>
                            <v-flex md6 lg6>
                                <dc-multiselect :options="prodRangeOption" labelDesc="产品属性" :isMultiSelect="false" v-model="prodType.prodRange" class="dcMulti"></dc-multiselect>
                            </v-flex>
                            <v-flex md6 lg6>
                                <dc-switch v-model="prodType.prodGroup" labelDesc="组合产品"></dc-switch>
                            </v-flex>
                            <v-flex md6 lg6>
                                <dc-multiselect :options="statusOption" labelDesc="产品状态" :isMultiSelect="false" v-model="prodType.status" class="dcMulti"></dc-multiselect>
                            </v-flex>
                            <v-flex md6 lg6>
                                <dc-multiselect :options="baseProdTypeOption" labelDesc="基础产品" :isMultiSelect="false" v-model="prodType.baseProdType" class="dcMulti"></dc-multiselect>
                            </v-flex>
                        </v-layout>
                        <draggable v-model="dataSource" :move="getdata" @update="datadragEnd" class="layout row wrap">
                            <v-flex v-for="(keyData ,key ,index) in dataSource" v-bind:key="key" lg6>
                                <v-layout row wrap>
                                    <v-flex md8 lg4 v-if="keyData.columnType == 'tree'">
                                    </v-flex>
                                    <v-flex md12 lg12 v-if="keyData.columnType == 'tree'">
                                        <v-flex md11 ml-11 class="auto">
                                            <dc-treeview v-if="keyData.columnType == 'tree'" v-model="prodDefines[keyData.key].attrValue" :options="keyData.valueScore" :labelDesc="keyData.columnDesc"></dc-treeview>
                                        </v-flex>
                                    </v-flex>
                                    <v-flex md12 lg12 v-else>
                                        <dc-text-field :showEdit="showEdit" v-if="keyData.columnType == 'input'"
                                                       class="primary&#45;&#45;text mx-1" :label="keyData.columnDesc"
                                                       name="title" :labelDesc="keyData.columnDesc" v-model="prodDefines[keyData.key].attrValue" single-line
                                                       hide-details></dc-text-field>
                                        <dc-multiselect :showEdit="showEdit" v-if="keyData.columnType == 'select'" :labelDesc="keyData.columnDesc" v-model="prodDefines[keyData.key]"
                                                        :options="keyData.valueScore" class="dcMulti" :isMultiSelect=keyData.isMultiSelect></dc-multiselect>
                                        <dc-switch :showEdit="showEdit" v-if="keyData.columnType == 'switch'" :labelDesc="keyData.columnDesc"
                                                   v-model="prodDefines[keyData.key].attrValue"></dc-switch>
                                        <dc-date :showEdit="showEdit" v-if="keyData.columnType == 'date'" :labelDesc="keyData.columnDesc" v-model="prodDefines[keyData.key]"></dc-date>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </draggable>
                    </v-layout>
                </v-container>
            </div>
        </v-flex>
    </v-container>
</template>
<script>
    import columnInfo from '../columnInfo'
    import DcMultiselect from '@/components/widgets/DcMultiselect'
    import DcSwitch from "@/components/widgets/DcSwitch";
    import DcTreeSelect from "@/components/widgets/DcTreeSelect";
    import DcTextField from "@/components/widgets/DcTextField";
    import DcDate from '@/components/widgets/DcDate'
    import {saveColumn} from "@/api/url/prodInfo";
    import toast from '@/utils/toast';
    import draggable from 'vuedraggable'
    import DcTreeview from "@/components/widgets/DcTreeview";

    export default {
        components: {columnInfo, DcMultiselect, DcSwitch, DcTreeSelect,DcDate,DcTextField,draggable,DcTreeview},
        props: {
            prodType: String,
            prodDefines: String,
            tags: String,
            prodTypeCode: String,
            showEdit: {
                type: String,
                default: false
            }
        },
        data: () => ({
            dataSource: {},
            valueData: [],
            sourceModuleOption: [
                {
                    "key": "RB",
                    "value": "RB-存款类"
                },
                {
                    "key": "CL",
                    "value": "CL-贷款类"
                }
            ],
            prodClassOption: [
                {
                    "key": "RB",
                    "value": "RB-存款类"
                },
                {
                    "key": "RB100",
                    "value": "RB100-个人存款组"
                },
                {
                    "key": "RB200",
                    "value": "RB200-对公存款组"
                },
                {
                    "key": "RB300",
                    "value": "RB300-同业存款组"
                },
                {
                    "key": "RBBASE",
                    "value": "RBBASE-存款基础产品组"
                }
            ],
            prodRangeOption: [
                {
                    "key": "S",
                    "value": "S-可售产品"
                },
                {
                    "key": "B",
                    "value": "B-基础产品"
                }
            ],
            statusOption: [
                {
                    "key": "A",
                    "value": "A-启用"
                },
                {
                    "key": "C",
                    "value": "C-废弃"
                }
            ],
            baseProdTypeOption: [
                {
                    "key": "RBA01",
                    "value": "RBA01-AIO基础产品"
                },
                {
                    "key": "RBDQ1",
                    "value": "RBDQ1-普通定期基础产品"
                },
                {
                    "key": "RBDQ2",
                    "value": "RBDQ2-定期一本通产品"
                },
                {
                    "key": "RBDQ3",
                    "value": "RBDQ3-定期联名产品"
                },
                {
                    "key": "RBHQ1",
                    "value": "RBHQ1-普通活期基础产品"
                }
            ]
        }),
        watch: {
            prodDefines: {
                handler(prodDefines) {
                    this.init(prodDefines);
                },
            },
        },
        methods: {
            getdata (evt) {
                console.log(evt.draggedContext.element.id)
            },
            saveColumn (){
                saveColumn({column: this.dataSource,prodType: this._props.prodTypeCode}).then(response => {
                    if(response.status === 200) {
                        toast.success("顺序编辑完成！");
                    }
                });
            },
            datadragEnd (evt) {
                console.log('拖动前的索引 :' + evt.oldIndex)
                console.log('拖动后的索引 :' + evt.newIndex)
                const oldIndex=evt.oldIndex;
                const newIndex=evt.newIndex;
                let dataSourceEnd=[]
                let dataSource=this.dataSource
                for(const index in dataSource){
                    dataSource[index].pageSeqNo=parseInt(index)+1;
                }
                this.saveColumn();
                //拖动后改变column数组
                console.log(this.tags)
            },
            init(prodData) {
                let columnList=[]
                //通过后台的产品有关信息查数据字典
                for(const index in prodData) {
                    const dataSource = columnInfo;
                    let column = dataSource[index];
                    if (column != undefined && column != 'undefined' && this._props.tags == prodData[index].pageCode) {
                        column['key'] = index
                        column['pageSeqNo'] = prodData[index].pageSeqNo
                            column['pageCode'] = prodData[index].pageCode
                        columnList.push(column)
                    }
                }
                this.dataSource = columnList

            }
        }
    }
</script>
<style scoped>
    .dcMulti {
        margin-top: 10px;
    }

    .auto {
        margin-left: auto;
        margin-right: auto;
    }
</style>
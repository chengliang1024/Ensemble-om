<!--
<template>
    <v-container fluid pr-5 pt-0>
        <v-flex xs12 md12 lg12>
            <div slot="widget-content">
                <v-container fluid pt-1>
                    <v-layout row wrap>
                        <v-layout row wrap>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary&#45;&#45;text subheading">产品代码*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-text-field class="primary&#45;&#45;text mx-1" label="产品代码" name="title" v-model="dataSource.prodType" single-line hide-details disabled></v-text-field>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary&#45;&#45;text subheading">产品描述*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-text-field class="primary&#45;&#45;text " label="产品描述" name="title" v-model="dataSource.prodDesc" single-line hide-details disabled/>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary&#45;&#45;text subheading">业务模块*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-multiselect :options="sourceModuleOption" v-model="dataSource.sourceModule" class="dcMulti"></dc-multiselect>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary&#45;&#45;text subheading">产品分类*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-multiselect :options="prodClassOption" v-model="dataSource.prodClass" class="dcMulti"></dc-multiselect>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary&#45;&#45;text subheading">产品属性*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-multiselect :options="prodRangeOption" v-model="dataSource.prodRange" class="dcMulti"></dc-multiselect>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary&#45;&#45;text subheading">组合产品*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-switch v-model="dataSource.prodGroup"></dc-switch>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary&#45;&#45;text subheading">产品状态*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-multiselect :options="statusOption" v-model="dataSource.status" class="dcMulti"></dc-multiselect>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary&#45;&#45;text subheading">基础产品*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-multiselect :options="baseProdTypeOption" v-model="dataSource.baseProdType" class="dcMulti"></dc-multiselect>
                            </v-flex>
                        </v-layout>
                        <v-flex v-for="(keyData ,key ,index) in dataSource" v-bind:key="key" lg6>
                            <v-layout row wrap>
                                <v-flex xs12 md4 lg4 v-if="keyData.columnDesc != undefined">
                                    <v-subheader class="primary&#45;&#45;text subheading">{{keyData.columnDesc}}*</v-subheader>
                                </v-flex>
                                <v-flex md8 lg4 v-if="keyData.columnType == 'tree'">
                                </v-flex>
                                <v-flex md12 lg12 v-if="keyData.columnType == 'tree'">
                                    <v-flex md11 ml-5 class="auto">
                                        <dc-tree-select v-if="keyData.columnType == 'tree'" v-model="prodData.prodDefines[keyData.key].attrValue"
                                                        :multiple="true" :options="keyData.valueScore"></dc-tree-select>
                                    </v-flex>
                                </v-flex>
                                <v-flex md8 lg8 v-else>
                                    <v-text-field v-if="keyData.columnType == 'input'"
                                                  class="primary&#45;&#45;text mx-1" :label="keyData.columnDesc"
                                                  name="title" v-model="prodData.prodDefines[keyData.key].attrValue" single-line
                                                  hide-details></v-text-field>
                                    <dc-multiselect v-if="keyData.columnType == 'select'" v-model="prodData.prodDefines[keyData.key].attrValue"
                                                    :options="keyData.valueScore" class="dcMulti"></dc-multiselect>
                                    <dc-switch v-if="keyData.columnType == 'switch'"
                                               v-model="prodData.prodDefines[keyData.key].attrValue"></dc-switch>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-container>
            </div>
        </v-flex>
    </v-container>
</template>
<script>
    import columnInfo from './baseProd/columnInfo'
    import DcMultiselect from '@/components/widgets/DcMultiselect'
    import DcSwitch from "@/components/widgets/DcSwitch";
    import DcTreeSelect from "@/components/widgets/DcTreeSelect";
    export default {
        components: {columnInfo, DcMultiselect, DcSwitch, DcTreeSelect},
        props: ["prodData"],
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
            prodData: {
                handler(prodData) {
                    this.init(prodData);
                }
            }
        },
        methods: {
            init(prodData) {
                let columnList=[]
                //通过后台的产品有关信息查数据字典
                for(const index in prodData.prodDefines){
                    const dataSource=columnInfo;
                   let column=dataSource[index];
                   if(column!=undefined&&column!='undefined'){
                       column['key']=index
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
</style>-->

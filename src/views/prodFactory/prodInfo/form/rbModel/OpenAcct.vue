<template>
    <v-container fluid pr-5 pt-0>
        <div slot="widget-content">
            <v-container fluid pt-1>
                <v-layout row wrap>
                    <v-flex md6 lg6>
                        <dc-multiselect v-model="prodData.mbEventInfos['OPEN_'+prodData.prodType.prodType].mbEventAttrs.STRUCTURE_TYPE" labelDesc="账号生成规则" :options="structureType" :isMultiSelect="false" :perShow="true"></dc-multiselect>
                    </v-flex>
                    <v-flex md6 lg6>
                        <dc-text-field v-model="prodData.mbEventInfos['OPEN_'+prodData.prodType.prodType].mbEventAttrs.ACCT_PREFIX" labelDesc="账号前缀" :perShow="true"></dc-text-field>
                    </v-flex>
                    <v-flex md6 lg6>
                        <dc-multiselect v-model="prodData.mbEventInfos['OPEN_'+prodData.prodType.prodType].mbEventAttrs.WITHDRAWAL_TYPE" labelDesc="支取方式处理" :options="checkWdrawnType" :isMultiSelect="false" :perShow="true"></dc-multiselect>
                    </v-flex>
                    <v-flex md6 lg6>
                        <dc-switch v-model="prodData.mbEventInfos['OPEN_'+prodData.prodType.prodType].mbEventAttrs.CHECK_RESTRAINT" labelDesc="账户限制处理" :perShow="true"></dc-switch>
                    </v-flex>
                    <v-flex md6 lg6>
                        <dc-switch v-model="prodData.mbEventInfos['OPEN_'+prodData.prodType.prodType].mbEventAttrs.DOC_TYPE_DEAL" labelDesc="凭证类型处理" :perShow="true"></dc-switch>
                    </v-flex>
                    <v-flex md6 lg6>
                        <dc-switch v-model="prodData.mbEventInfos['OPEN_'+prodData.prodType.prodType].mbEventAttrs.AGENT_FLAG" labelDesc="是否允许代办" :perShow="true"></dc-switch>
                    </v-flex>
                    <v-flex md6 lg6>
                        <dc-switch v-model="prodData.mbEventInfos['OPEN_'+prodData.prodType.prodType].mbEventAttrs.CHECK_CLIENT_NUM_FLAG" labelDesc="同客户数量检查标识" :perShow="true"></dc-switch>
                    </v-flex>
                    <v-flex md6 lg6>
                        <dc-text-field v-model="prodData.mbEventInfos['OPEN_'+prodData.prodType.prodType].mbEventAttrs.NUM_OF_CLIENT" labelDesc="同客户允许最大数量" :perShow="true"></dc-text-field>
                    </v-flex>
                    <v-flex md6 lg6>
                        <dc-switch v-model="prodData.mbEventInfos['OPEN_'+prodData.prodType.prodType].mbEventAttrs.START_INT_DATE_FALG" labelDesc="起息日处理标识" :perShow="true"></dc-switch>
                    </v-flex>
                    <v-flex md6 lg6>
                        <dc-text-field v-model="prodData.mbEventInfos['OPEN_'+prodData.prodType.prodType].mbEventAttrs.MAX_BACK_DATE_DAYS" labelDesc="最大倒起息天数" :perShow="true"></dc-text-field>
                    </v-flex>
                    <v-flex md6 lg6>
                        <dc-text-field v-model="prodData.mbEventInfos['OPEN_'+prodData.prodType.prodType].mbEventAttrs.MAX_RATE_DAYS" labelDesc="最大起息天数" :perShow="true"></dc-text-field>
                    </v-flex>
                </v-layout>
            </v-container></div>
    </v-container>
</template>

<script>
    import { getInitData } from "@/mock/init";
    import { getProdData } from "@/api/prod";
    import DcSwitch from "@/components/widgets/DcSwitch";
    import DcMultiselect from '@/components/widgets/DcMultiselect'
    import DcTextField from '@/components/widgets/DcTextField'
    export default {
        components: { DcSwitch, DcMultiselect, DcTextField },
        props: ["prodData"],
        data: () => ({
            title: null,
            refData: getInitData,
        }),
        computed: {
            progress() {
                return Math.min(100, this.value.length * 10);
            }
        },
        mounted() {
            this.initRefDate();
        },
        methods: {
            initRefDate() {
                this.structureType = this.refData[2].paraDataRb.structureType;
                this.checkWdrawnType = this.refData[2].paraDataRb.checkWdrawnType;
                this.restraintFlag = this.refData[2].paraDataRb.restraintFlag;
                this.withdrawTypeHandeling = this.refData[2].paraDataRb.withdrawTypeHandeling;
                this.checkAgent = this.refData[2].paraDataRb.checkAgent;
                this.clientAmtCheckFlag = this.refData[2].paraDataRb.clientAmtCheckFlag;
                this.startDepositAmt = this.refData[2].paraDataRb.startDepositAmt;
            },
            closeDialog() {
                this.$parent.isActive = false;
            }
        }
    };
</script>

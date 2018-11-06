<template>
    <v-container fluid pr-5 pt-0>
        <div slot="widget-content">
            <v-container fluid pt-1>
                <v-layout row wrap>
                    <v-flex md6 lg6>
                        <dc-multiselect v-model="prodData.mbEventInfos['WTD_'+prodData.prodType.prodType].mbEventAttrs.WITHDRAWAL_TYPE" labelDesc="支取控制方式" :perShow="true" :options="drawControlWay" :isMultiSelect="false"></dc-multiselect>
                    </v-flex>
                    <v-flex md6 lg6>
                        <dc-switch v-model="prodData.mbEventInfos['WTD_'+prodData.prodType.prodType].mbEventAttrs.AGENT_FLAG" labelDesc="是否允许代办" :perShow="true"></dc-switch>
                    </v-flex>
                    <v-flex md6 lg6>
                        <dc-multiselect v-model="prodData.mbEventInfos['WTD_'+prodData.prodType.prodType].mbEventAttrs.FUND_TRAN_TYPE" labelDesc="资金去向方式" :perShow="true" :options="cashResource" :isMultiSelect="false"></dc-multiselect>
                    </v-flex>
                    <v-flex md6 lg6>
                        <dc-switch v-model="prodData.mbEventInfos['WTD_'+prodData.prodType.prodType].mbEventAttrs.CHECK_RESTRAINT" :perShow="true" labelDesc="账户限制检查"></dc-switch>
                    </v-flex>
                    <v-flex md6 lg6>
                        <dc-switch v-model="prodData.mbEventInfos['WTD_'+prodData.prodType.prodType].mbEventAttrs.CHECK_WDRAWN_TYPE" labelDesc="支取方式检查" :perShow="true"></dc-switch>
                    </v-flex>
                    <v-flex md6 lg6>
                        <dc-switch v-model="prodData.mbEventInfos['WTD_'+prodData.prodType.prodType].mbEventAttrs.CHECK_DOC_TYPE" labelDesc="凭证类型检查" :perShow="true"></dc-switch>
                    </v-flex>
                    <v-flex md6 lg6>
                        <dc-multiselect v-model="prodData.mbEventInfos['WTD_'+prodData.prodType.prodType].mbEventAttrs.DRAW_BREAK_TYPE" labelDesc="支取违约类型" :perShow="true" :options="breakType" :isMultiSelect="false"></dc-multiselect>
                    </v-flex>
                    <v-flex md6 lg6>
                        <dc-multiselect v-model="prodData.mbEventInfos['WTD_'+prodData.prodType.prodType].mbEventAttrs.BREAK_DEAL_WAY" labelDesc="违约处理方式" :perShow="true" :options="dealingWay" :isMultiSelect="false"></dc-multiselect>
                    </v-flex>
                    <v-flex md6 lg6>
                        <dc-switch v-model="prodData.mbEventInfos['WTD_'+prodData.prodType.prodType].mbEventParts.CHECK_SG_AMT_PA.CHECK_SG_AMT" labelDesc="单次支取金额检查" :perShow="true"></dc-switch>
                    </v-flex>
                    <v-flex md6 lg6>
                        <dc-text-field v-model="prodData.mbEventInfos['WTD_'+prodData.prodType.prodType].mbEventParts.CHECK_SG_AMT_PA.SG_MIN_AMT" labelDesc="最小支取金额" :perShow="true"></dc-text-field>
                    </v-flex>
                    <v-flex md6 lg6>
                        <dc-text-field v-model="prodData.mbEventInfos['WTD_'+prodData.prodType.prodType].mbEventParts.CHECK_SG_AMT_PA.SG_MAX_AMT" labelDesc="最大支取金额" :perShow="true"></dc-text-field>
                    </v-flex>
                    <v-flex md6 lg6>
                        <dc-switch v-model="prodData.mbEventInfos['WTD_'+prodData.prodType.prodType].mbEventParts.CHECK_KEEP_BAL_PA.CHECK_KEEP_BAL" labelDesc="账户留存余额检查" :perShow="true"></dc-switch>
                    </v-flex>
                    <v-flex md6 lg6>
                        <dc-text-field v-model="prodData.mbEventInfos['WTD_'+prodData.prodType.prodType].mbEventParts.CHECK_KEEP_BAL_PA.KEEP_MIN_BAL" labelDesc="最小留存余额" :perShow="true"></dc-text-field>
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
                this.drawControlWay = this.refData[2].paraDataRb.drawControlWay;
                this.daiBanFlag = this.refData[2].paraDataRb.daiBanFlag;
                this.cashResource = this.refData[2].paraDataRb.cashResource;
                this.attrReatraintCheck = this.refData[2].paraDataRb.attrReatraintCheck;
                this.withDrawlCheck = this.refData[2].paraDataRb.withDrawlCheck;
                this.voucherTypeCheck = this.refData[2].paraDataRb.voucherTypeCheck;
                this.breakType = this.refData[2].paraDataRb.breakType;
                this.dealingWay = this.refData[2].paraDataRb.dealingWay;
                this.singleTimeBalCheck = this.refData[2].paraDataRb.singleTimeBalCheck;
                this.acctBalanceCheck = this.refData[2].paraDataRb.acctBalanceCheck;
                this.sgBalCheck = this.refData[2].paraDataRb.sgBalCheck
            },
            closeDialog() {
                this.$parent.isActive = false;
            }
        }
    };
</script>

<template>
    <v-container fluid pr-5 pt-0>
        <div slot="widget-content">
            <v-container fluid pt-1>
                <v-layout row wrap>
                    <v-flex md6 lg6>
                        <dc-multiselect v-model="prodData.mbEventInfos['CLOSE_'+prodData.prodType.prodType].mbEventAttrs.DEPOSIT_CONTRAL_WAY" labelDesc="存入控制方式" :options="systemControlApproach" :isMultiSelect="false" :perShow="true"></dc-multiselect>
                    </v-flex>
                    <v-flex md6 lg6>
                        <dc-switch v-model="prodData.mbEventInfos['CLOSE_'+prodData.prodType.prodType].mbEventAttrs.AGENT_FLAG" labelDesc="是否允许代办" :perShow="true"></dc-switch>
                    </v-flex>
                    <v-flex md6 lg6>
                        <dc-multiselect v-model="prodData.mbEventInfos['CLOSE_'+prodData.prodType.prodType].mbEventAttrs.CAPITAL_ORIGIN_WAY" labelDesc="资金来源方式" :options="cashResouce" :isMultiSelect="false" :perShow="true"></dc-multiselect>
                    </v-flex>
                    <v-flex md6 lg6>
                        <dc-switch v-model="prodData.mbEventInfos['CLOSE_'+prodData.prodType.prodType].mbEventAttrs.CHECK_RESTRAINT" labelDesc="账户限制检查" :perShow="true"></dc-switch>
                    </v-flex>
                    <v-flex md6 lg6>
                        <dc-switch v-model="prodData.mbEventInfos['CLOSE_'+prodData.prodType.prodType].mbEventAttrs.CHECK_SIGN" labelDesc="签约检查" :perShow="true"></dc-switch>
                    </v-flex>
                    <v-flex md6 lg6>
                        <dc-switch v-model="prodData.mbEventInfos['CLOSE_'+prodData.prodType.prodType].mbEventAttrs.CHECK_CLOSE_FEE" labelDesc="欠费检查" :perShow="true"></dc-switch>
                    </v-flex>
                    <v-flex md6 lg6>
                        <dc-switch v-model="prodData.mbEventInfos['CLOSE_'+prodData.prodType.prodType].mbEventAttrs.CLOSE_BACK_FLAG" labelDesc="是否允许销户回退" :perShow="true"></dc-switch>
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
                this.systemControlApproach = this.refData[2].paraDataRb.systemControlApproach;
                this.permitCommersionFlag = this.refData[2].paraDataRb.permitCommersionFlag;
                this.cashResouce = this.refData[2].paraDataRb.cashResouce;
                this.acctReatraintCheck = this.refData[2].paraDataRb.acctReatraintCheck;
                this.resignCheck = this.refData[2].paraDataRb.resignCheck;
                this.ownCheck = this.refData[2].paraDataRb.ownCheck;
                this.closeAcctRollbackFlag = this.refData[2].paraDataRb.closeAcctRollbackFlag;
            }
        }
    }
</script>

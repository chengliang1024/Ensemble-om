<template>
    <v-container fluid pr-5 pt-0><div slot="widget-content">
            <v-container fluid pt-1>
                <v-layout row wrap>
                    <v-flex md6 lg6>
                        <dc-multiselect v-model="prodData.prodDefines.AUTOMATIC_RANGE" labelDesc="通存范围" :options="draRange" :isMultiSelect="false" :perShow="true"></dc-multiselect>
                    </v-flex>
                    <v-flex md6 lg6>
                        <dc-multiselect v-model="prodData.prodDefines.CIR_EXCHANGE_RANGE" labelDesc="通兑范围" :options="depRange" :isMultiSelect="false" :perShow="true"></dc-multiselect>
                    </v-flex>
                    <v-flex md6 lg6>
                        <dc-switch v-model="prodData.prodDefines.TRAN_CIR_EXCG_FLAG" labelDesc="转账通兑标识" :perShow="true"></dc-switch>
                    </v-flex>
                    <v-flex md6 lg6>
                        <dc-switch v-model="prodData.prodDefines.CASH_CIR_EXCG_FLAG" labelDesc="现金通兑标识" :perShow="true"></dc-switch>
                    </v-flex>
                    <v-flex md6 lg6>
                        <dc-switch v-model="prodData.prodDefines.CLIENT_CONTRAL_FLAG" labelDesc="客户控制标识" :perShow="true"></dc-switch>
                    </v-flex>
                    <v-flex md6 lg6>
                        <dc-switch v-model="prodData.prodDefines.CHANNEL_CONT_FLAG" labelDesc="渠道控制标识" :perShow="true"></dc-switch>
                    </v-flex>
                    <v-flex md6 lg6>
                        <dc-switch v-model="prodData.prodDefines.BRC_AREA_CONT_FLAG" labelDesc="机构区域控制" :perShow="true"></dc-switch>
                    </v-flex>
                    <v-flex md6 lg6>
                        <dc-switch v-model="prodData.prodDefines.CHARGE_TYPE" labelDesc="收费标识" :perShow="true"></dc-switch>
                    </v-flex>
                    <v-flex md6 lg6>
                        <dc-switch v-model="prodData.prodDefines.STATUS_TRAN_FLAG" labelDesc="状态转移标识" :perShow="true"></dc-switch>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </v-container>
</template>

<script>
    import DcSwitch from "@/components/widgets/DcSwitch";
    import DcMultiselect from '@/components/widgets/DcMultiselect';
    import { getInitData } from "@/mock/init";
    import { getProdData } from "@/api/prod";
    export default {
        components: { DcSwitch,DcMultiselect},
        props: ["prodData"],
        data: () => ({
            title: null,
            refData: getInitData
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
                this.draRange = this.refData[2].paraDataRb.draRange;
                this.depRange = this.refData[2].paraDataRb.depRange;
                this.tDepFlag = this.refData[2].paraDataRb.tDepFlag;
                this.cashDepFlag = this.refData[2].paraDataRb.cashDepFlag;
                this.clientFlag = this.refData[2].paraDataRb.clientFlag;
                this.channelFlag = this.refData[2].paraDataRb.channelFlag;
                this.branchControlFlag = this.refData[2].paraDataRb.branchControlFlag;
                this.chargeFlag = this.refData[2].paraDataRb.chargeFlag;
                this.moveFlag = this.refData[2].paraDataRb.moveFlag;
            },
            closeDialog() {
                this.$parent.isActive = false;
            }
        }
    };
</script>
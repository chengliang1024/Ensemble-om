<template>
  <v-container fluid pr-5 pt-0>
        <div slot="widget-content">
          <v-container fluid pt-1>
            <v-layout row wrap>
              <v-flex md6 lg6>
                <dc-multiselect v-model="prodData.mbEventInfos['CYCLE_'+prodData.prodType.prodType].mbEventAttrs.CYCLE_FREQ" :options="cycleFreq" labelDesc="结息周期" :isMultiSelect="false" :perShow="true"></dc-multiselect>
              </v-flex>
              <v-flex md6 lg6>
                <dc-text-field v-model="prodData.mbEventInfos['CYCLE_'+prodData.prodType.prodType].mbEventAttrs.INT_DAY" :perShow="true" labelDesc="结息日"></dc-text-field>
              </v-flex>
              <v-flex md6 lg6>
                <dc-switch v-model="prodData.mbEventInfos['CYCLE_'+prodData.prodType.prodType].mbEventAttrs.INT_CAP" :perShow="true" labelDesc="是否结息到本账户"></dc-switch>
              </v-flex>
            </v-layout>
          </v-container>
        </div>
  </v-container>
</template>

<script>
    import  DcSwitch from "@/components/widgets/DcSwitch";
    import { getInitData } from "@/mock/init";
    import DcMultiselect from '@/components/widgets/DcMultiselect'
    import DcTextField from '@/components/widgets/DcTextField'
    import { getProdData } from "@/api/prod";
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
                this.cycleFreq = this.refData[2].paraDataRb.cycleFreq;
                this.cycleSelfFlag = this.refData[2].paraDataRb.cycleSelfFlag;
            },
            closeDialog() {
                this.$parent.isActive = false;
            }
        }
    };
</script>

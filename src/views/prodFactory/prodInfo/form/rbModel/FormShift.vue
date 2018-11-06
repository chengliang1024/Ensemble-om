<template>
    <v-card>
        <v-toolbar card dense color="transparent">
         <v-btn color="success" dark class="mb-2" @click="dialog = true" >新增</v-btn>
         <v-btn color="success" dark class="mb-2" @click="dialog = true">修改</v-btn>
         <form-shift-dialog></form-shift-dialog>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="pa-0">
            <template>
                <v-data-table :headers="headers" :items="projects" hide-actions class="elevation-1">
                    <template slot="items" slot-scope="props">
                        <td class="text-xs-left">{{ props.item.acctStatus }}</td>
                        <td class="text-xs-left">{{ props.item.transferType }}</td>
                        <td class="text-xs-left">{{ props.item.transferPeriod }}</td>
                        <td class="text-xs-left">{{ props.item.restraintAmt }}</td>
                        <td class="text-xs-left">{{ props.item.transferCondition }}</td>
                        <td class="text-xs-left">{{ props.item.tranAferFlag }}</td>
                    </template>
                </v-data-table>
            </template>
            <v-divider></v-divider>
        </v-card-text>
    </v-card>
</template>
<script>
import {getFormShift} from '@/api/table';
import FormShiftDialog from './FormShiftDialog';
export default {
    components: {
        FormShiftDialog
    },
    data () {
        return {
            headers: [
            {text: '账户状态', value: 'acctStatus', width: 'xs1'},
            {text: '转移类型', value: 'transferType', width: 'xs1'},
            {text: '转移周期', value: 'transferPeriod', width: 'xs1'},
            {text: '限制金额', value: 'restraintAmt',width: 'xs1' },
            {text: '转移条件', value: 'transferCondition', width: 'xs1'},
            {text: '转移后是否结息', value: 'tranAferFlag', width: 'xs1'}
            ],
            projects: [{
                acctStatus: '',
                transferType: '',
                transferPeriod: '',
                restraintAmt: '',
                transferCondition: '',
                tranAferFlag: ''
            }]
        };
    },
    mounted: function() {
        this.queryDespositProdData()
    },
    methods: {
        queryDespositProdData() {
            /*getFormShift().then(response => {
                this.projects = response.data.formShift
            })*/
        }
    }
};
</script>

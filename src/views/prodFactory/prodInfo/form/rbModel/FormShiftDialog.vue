<template>
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
            <v-card-title><span class="headline">收费定义</span></v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                <v-layout wrap>
                <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.acctStatus" label="账户状态"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.transferType" label="转移类型"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.transferPeriod" label="转移周期"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.restraintAmt" label="限制金额"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.transferCondition" label="转移条件"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.tranAferFlag" label="转移后是否结息"></v-text-field>
                </v-flex>
                </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="close">取消</v-btn>
                <v-btn color="blue darken-1" flat @click.native="save">保存</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    data () {
        return {
            dialog: false,
            editedItem: {
                acctStatus: '',
                transferType: '',
                transferPeriod: '',
                restraintAmt: '',
                transferCondition: '',
                tranAferFlag: ''
            },
            defaultItem: {
                acctStatus: '',
                transferType: '',
                transferPeriod: '',
                restraintAmt: '',
                transferCondition: '',
                tranAferFlag: ''
            },
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

    methods: {

        editItem (item) {
            this.editedIndex = this.projects.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
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
                this.projects.push(this.editedItem)
            }
            this.close()
        }
    }
};
</script>
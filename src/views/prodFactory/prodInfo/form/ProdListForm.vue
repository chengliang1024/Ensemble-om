<template>
  <div>
    <v-layout row wrap>
      <v-flex md12 lg12>
      <v-toolbar dense class="chat-history-toolbar prodLists">
        <v-text-field flat solo full-width clearable prepend-icon="search" class="top" label="请输入产品代码或描述" v-model="searchValue"></v-text-field>
      </v-toolbar>
      <vue-perfect-scrollbar >
        <v-list two-line subheader :class="depositTree">
          <v-list-tile class="chat-list prodList" avatar v-for="(item, index ) in folders" :key="item.title" @click="handleClick(item)">
            <v-list-tile-avatar>
              <v-icon :class="['amber white--text']">{{ 'call_to_action'}}</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.prodType }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.prodDesc }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </vue-perfect-scrollbar>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
    import {
        getProdType
    } from '@/api/url/prodInfo'

    export default {

        props: ["prodClass"],
        data: () => ({
            folders: [],
            prodType: '',
            depositTree: 'depositTree'
        }),
        watch: {
            prodClass(val) {
                this.initProdList(val)
            }
        },
        mounted() {
            this.initProdList(this._props.prodClass)

        },
        methods: {
            initProdList(val) {
                getProdType(val).then(response => {
                    let length = response.data.data.length
                    for(let j = 0; j<length; j++){
                        this.folders.push(response.data.data[j])
                    }
                });
            },
            handleClick(value) {
                this.prodType = value.prodType
                this.$emit('listenToProdList',{'prodType': this.prodType})
            },
        }
    };
</script>
<style scoped>
  .top {
    padding-top: 8px;
  }
  .depositTree {
    height: calc(90vh - 48px);
  }
  .depositTreeFixed {
    position: fixed;
    top: 0;
    width: 100%;
  }
</style>
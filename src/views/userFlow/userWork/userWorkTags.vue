<template>
  <v-container fluid grid-list-md py-0 px-0>
    <v-tabs v-model="active" slider-color="red">
      <v-tab v-for="n in userWork" :key="n" ripple>
        <v-chip label outline color="red">
          <v-avatar text-color="red">5</v-avatar>{{n}}</v-chip>
      </v-tab>
      <v-tab-item v-for="n in 3" :key="n">
        <user-work-check-table v-if="n==1" v-bind:userWorkData="userWorkData"></user-work-check-table>
        <user-work-release-table v-if="n==2"></user-work-release-table>
        <!-- <v-card>release
          <v-container fluid py-0>
            <v-card-text>

            </v-card-text>
          </v-container>
        </v-card> -->
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
  import userWorkCheckTable from './userWorkCheckTable'
  import userWorkReleaseTable from './userWorkReleaseTable'
  import { getFlowList } from "@/api/url/prodInfo";
  export default {
      components: {
          userWorkCheckTable,
          userWorkReleaseTable
      },
    data() {
      return {
          userWorkData: [],
        active: null,
        text: '.',
        userWork: ['待复核', '待发布']
      }
    },

      mounted: function() {
          this.queryDespositProdData();
      },
    methods: {
        queryDespositProdData() {
            getFlowList().then(response => {
               this.userWorkData = response.data.data
            });
        }
    }
  }
</script>
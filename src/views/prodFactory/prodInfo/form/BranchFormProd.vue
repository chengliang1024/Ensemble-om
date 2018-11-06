<template>
 <v-container grid-list-md fluid id="scroll-target" style="max-height: 800px" class="scroll-y">
  <v-layout wrap v-scroll:#scroll-target="onScroll">
    <v-flex xs12 md6>
      <v-card>
        <div class="d-flex justify-between align-center mb-3">
          <v-btn @click="all">all</v-btn>
          <v-btn @click="none">none</v-btn>
        </div>
        <v-expansion-panel v-model="panel" expand focusable>
          <v-expansion-panel-content v-for="item in items" :key="item">
            <div slot="header" class="subheading font-weight-medium">{{item.title}}-{{item.code}}</div>
            <v-list>
              <v-list-tile v-for="subItem in item.items" :key="subItem.title" @click.stop="doStop">
                <!-- <v-list-tile-action>
                  <v-icon left color="success">label</v-icon>
                </v-list-tile-action> -->
                <v-list-tile-action>
                  <v-checkbox v-model="subItem.value" color="success"></v-checkbox>
                </v-list-tile-action>
                <v-list-tile-content @click="subItem.value = !subItem.value">
                  <v-list-tile-title>{{ subItem.title }}-{{subItem.code}}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-card>
    </v-flex>
    <v-flex xs12 md6>
      <v-card>
        <treeselect v-model="value" :multiple="true" :options="options" :always-open="true" :limit="5" :sort-value-by="INDEX"/>
         <pre class="result">{{ value }}</pre>
      </v-card>
    </v-flex>
  </v-layout>
 </v-container>
</template>
<script>
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles


export default {
  // register the component
  components: { Treeselect },
  data() {
    return {
      // define default value
      value: ["9999", "0102"],
      // define options
      options: [
        {
          id: "9999",
          label: "总行",
          isDefaultExpanded: true,
          children: [
            {
              id: "9996",
              label: "会计结算部"
            },
            {
              id: "9997",
              label: "计财部"
            }
          ]
        },
        {
          id: "0100",
          label: "分行",
          isDefaultExpanded: true,
          children: [
            {
              label: "支行1",
              id: "0101",
              value: false
            },
            {
              label: "支行2",
              id: "0102",
              value: true
            },
            {
              label: "支行3",
              id: "0103",
              value: false
            }
          ]
        },
        {
          id: "0200",
          label: "分行",
          isDefaultExpanded: true,
          children: [
            {
              label: "支行1",
              id: "0201",
              value: false
            },
            {
              label: "支行2",
              id: "0202",
              value: true
            },
            {
              label: "支行3",
              id: "0203",
              value: false
            }
          ]
        }
      ],
      panel: [],
      items: [
        {
          action: "local_offer",
          title: "总行",
          code: "9999",
          active: false,
          value: true,
          items: [
            {
              title: "清算中心",
              code: "9998",
              value: false
            },
            {
              title: "计财部",
              code: "9997",
              value: true
            },
            {
              title: "会计结算部",
              code: "9996",
              value: false
            }
          ]
        },
        {
          action: "local_offer",
          title: "分行",
          code: "0100",
          value: true,
          active: true,
          items: [
            {
              title: "支行1",
              code: "0101",
              value: false
            },
            {
              title: "支行2",
              code: "0102",
              value: true
            },
            {
              title: "支行3",
              code: "0103",
              value: false
            }
          ]
        },
        {
          action: "local_offer",
          title: "分行",
          code: "0200",
          value: true,
          active: true,
          items: [
            {
              title: "支行1",
              code: "0201",
              value: false
            },
            {
              title: "支行2",
              code: "0202",
              value: false
            },
            {
              title: "支行3",
              code: "0203",
              value: false
            }
          ]
        }
      ]
    };
  },
  methods: {
    doStop() {
      console.log("doStop");
    },
    all() {
      //this.items.map(x => (x.active = true));
      this.panel = [...Array(this.items.length).keys()].map(x => true);
    },
    none() {
      //this.items.map(x => (x.active = false));
      this.panel = [];
    },
    onScroll(e) {
      this.offsetTop = e.target.scrollTop;
    }
  }
};
</script>
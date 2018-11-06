<template>
  <div>
    <v-card>
      <v-toolbar flat>
        <v-layout style="color: deepskyblue">
          <v-flex xs12 md5 lg5>
            <v-switch v-model="ex11" label="隐藏未修改参数" color="success" value="Y" hide-details class="prodDiffSwitch"></v-switch>
          </v-flex>
          <v-flex xs12 md4 lg4>
            <v-toolbar-title>修改前参数值</v-toolbar-title>
          </v-flex>
          <v-flex xs12 md3 lg3>
            <v-toolbar-title>修改后参数值</v-toolbar-title>
          </v-flex>
        </v-layout>
      </v-toolbar>

      <v-card-text class="pa-0">
        <v-layout row wrap>
          <div v-for="(prodList, index1) in prodDiffData" class="diffList">
            <v-list dense>
              <template v-for="(item, index) in prodList.items">
                <v-divider
                        v-if="item.divider"
                        :inset="item.inset"
                ></v-divider>
                <v-list-tile
                        avatar
                        v-else
                        :class="{'tbColor':item.diff}"
                >
                  <v-list-tile-content>
                    <v-list-tile-title v-html="item.title"></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list>
          </div>
        </v-layout>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>

import {getColumnDesc} from '@/utils/columnDesc'
import DcSwitch from "@/components/widgets/DcSwitch";
export default {
    components: { DcSwitch },
    props: ['prodData'],
  data() {
    return {
      ex11: "",
      onlyDiff: 'Y',
      prodDiffData: [
        {
          prodType: "",
          items: [
            {
              title: "产品代码"
            },
            { divider: true, inset: true },
            {
              title: "产品名称"
            },
            { divider: true, inset: true },
            {
              title: "产品状态"
            },
            { divider: true, inset: true },
            {
              title: "产品类别"
            },
            { divider: true, inset: true },
            {
              title: "产品结构"
            },
            { divider: true, inset: true },
            {
              title: "余额类型"
            },
            { divider: true, inset: true },
            {
                title: "账户计息标志"
            },
            { divider: true, inset: true },
            {
                title: "利润中心"
            },
            { divider: true, inset: true },
            {
                title: "生效日期"
            },
            { divider: true, inset: true },
            {
                title: "失效日期"
            }
          ]
        }
      ]
    };
  },
  computed: {
    randomColor() {
      let item = Math.floor(Math.random() * this.colors.length);
      return this.colors[item];
    }
  },
  watch: {
    ex11(val) {
      if (val == this.onlyDiff) {
        let prodList = this.prodDiffData;
        let newListSub = [];
        for (const item in prodList) {
          let newList = [];
          for (const items in prodList[item].items) {
            if (prodList[item].items[items].diff == true) {
              newList.push({ divider: true, inset: true });
              newList.push(prodList[item].items[items]);

            }
          }
          if (newList.length > 0) {
            const data = { prodType: prodList[item].prodType };
            data.items = newList;
            newListSub.push(data);
          }
        }
        this.prodDiffData = newListSub;
      } else {
        this.queryDespositProdData();
      }
    },
      prodData (val) {
          this.queryDespositProdData()
      }
  },
  methods: {
    queryDespositProdData() {
       let data= this.$props.prodData;
          this.assemblingDiff(data);
    },
    assemblingDiff(prodService){
        const prodDefines=prodService.prodDefines;
        let prodDiff=prodService.diff;
        const prodType=prodService.prodType;
        if(prodDiff==undefined){
            prodDiff={};
        }
        let columnDesc=[];
        let columnNew=[];
        let columnOld=[];
      //产品本身下参数固定组
      //产品下属性组合
       if(prodDefines!=undefined&&JSON.stringify(prodDefines)!="{}"){
       for(let index in prodDefines){
           let prodDefine=prodDefines[index];
           let attrKey=prodDefine.attrKey;
           let attrValue=prodDefine.attrValue;
           if(attrKey==undefined){
               attrKey=index;
               attrValue=prodDefine;
           }
           let diff=prodDiff[attrKey];
           if(diff==null||diff==undefined){
            diff=attrValue;
           }
           const keyDesc=getColumnDesc(attrKey);
           if(diff != attrValue){
                 columnOld.push({title: attrValue,diff: true});
                 columnNew.push({title: diff,diff: true});
                 columnDesc.push({title: keyDesc,diff: true});
           }else{
                 columnOld.push({title: attrValue});
                 columnNew.push({title: diff});
                 columnDesc.push({title: keyDesc});
           }

           columnDesc.push({ divider: true, inset: true });
           columnOld.push({ divider: true, inset: true });
           columnNew.push({ divider: true, inset: true });
       }
       }else{
                for(let index in prodDiff){
                      let desc= index.substring(index.lastIndexOf('.')+1);
                      columnDesc.push({title: desc});
                      columnDesc.push({ divider: true, inset: true });
                      columnNew.push({title: prodDiff[index]});
                      columnNew.push({ divider: true, inset: true });
                }
       }
       let diffList=[];
       let columnDescList={prodType: '',items: columnDesc};
       let columnNewList={prodType: '',items: columnNew};
       let columnOldList={prodType: '',items: columnOld};
       diffList.push(columnDescList);
       diffList.push(columnNewList);
        diffList.push(columnOldList);
      this.prodDiffData = diffList;
    }
  }
};
</script>
<style scoped>
.diffList {
  width: 33.333333333%;
  border-right-style: solid;
  border-right-width: 1px;
  border-color: rgba(40, 24, 31, 0.21);
  text-align: center;
  font-size: large;
}
.tbColor {
  background-color: #e3f2fd;
}
.diffList .v-divider--inset:not(.v-divider--vertical) {
  margin-left: 0px;
  max-width: 888px;
}
.prodDiffSwitch {
  display: inline-block;
}
.prodDiffButton {
  float: right;
}
.diffIdButton {
  text-align: center;
}
.diffEg {
  height: 48px;
}
  .diffTitle {
    color: #BBDEFB;
  }
</style>
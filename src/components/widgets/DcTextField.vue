<template>
 <div >
  <v-layout row wrap>
   <v-flex md4 lg4>
    <v-layout row wrap right>
     <!--<v-flex md2>-->
    <!--<i v-if="baseAttr==false" class="material-icons baseIcon small">-->
     <!--call_merge-->
    <!--</i>-->
     <!--</v-flex>-->
     <!--<v-flex md10>-->
     <v-flex md12>
         <v-subheader class="primary--text subheading pr-1">{{labelText}}</v-subheader>
     </v-flex>
    </v-layout>
   </v-flex>
   <v-flex md6 lg6>
    <v-text-field class="primary--text mx-1" :disabled="disabled" name="title" v-model="value" single-line hide-details :perShow="perShow" labelDesc="labelDesc"></v-text-field>
   </v-flex>
   <v-flex md2 lg2>
    <v-tooltip right :color="peopleColor" v-if="personShow==1">
    <v-btn flat small :color="peopleColor" icon="people" slot="activator" @click="peopleClick" class="dcMulti1">
     <v-icon>people</v-icon>
    </v-btn>
    <span>{{peopleDesc}}</span>
   </v-tooltip>
    <dc-navbar v-if="showEdit == true"></dc-navbar>
    <i v-if="baseAttr=='BASE'" class="material-icons baseIcon small">
     call_merge
    </i>
   </v-flex>
  </v-layout>
 </div>
</template>

<script>
    import DcNavbar from './DcNavbar'
    export default {
        components: {
            DcNavbar
        },
        model: {
            prop: "msg",
            event: "getVue"
        },
        props: {
            msg: String,
            perShow: String ,
            labelDesc: String ,
            disabled: String,
            baseAttr: {
                type: String,
                default: "SOLD"
            },
            showEdit: {
                type: String,
                default: false
            }
        },
        data() {
            return {
                labelText: "",
                value: [],
                peopleColor: "grey lighten-1",
                peopleDesc: "产品生效",
                personShow: 0
            };
        },
        watch: {
            msg: {
                handler(msg) {
                    this.init(msg);
                }
            },
            value: {
                handler(newValue) {
                    this.reback(newValue);
                }
            }
        },
        created() {
            this.init(this._props.msg);
        },
        mounted() {
            if (this._props.baseAttr === "BASE") {
                this.disabled = true
            } else {
                this.disabled = false
            }
        },
        methods: {
            reback(newValue) {
                let value = newValue;
                let reValue=this._props.msg
                if(typeof reValue === "object") {
                    reValue.attrValue = value
                }else{
                    reValue = value
                }
                if(reValue != undefined){
                this.$emit("getVue", reValue);
                }

            },
            peopleClick() {
                //预留 未处理v-model为String类型时 分户生效标识处理 (如果传入为String时 分户生效标识不显示 )
                if(this.peopleColor === "grey lighten-1") {
                    this.peopleColor = "red"
                    this.peopleDesc = "分户生效"
                    this._props.msg.perEffect = "true"
                }else if (this.peopleColor === "red"){
                    this.peopleColor = "grey lighten-1"
                    this.peopleDesc = "产品生效"
                    this._props.msg.perEffect = "false"
                }
            },
            init(msg) {
                if(typeof this._props.labelDesc !== "undefined") {
                    this.labelText = this._props.labelDesc + ' :';
                }                //初始化数据 msg为对象时获取attrValue属性 否则直接赋值
                this.value = typeof msg === "object"?this._props.msg.attrValue:this._props.msg
                //判断是否显示分户生效标识
                if(this._props.perShow === true){
                    this.personShow = 1
                }
                //分户生效标识回显 如果传入msg为对象 则进入if判断  如果为String 则this._props.msg.perEffect === undefined 不执行以下操作
                if(this._props.msg!== undefined&&typeof this._props.msg === "object"&&this._props.msg.perEffect !== undefined && this._props.msg.perEffect !== null){
                    if(this._props.msg.perEffect === "true"){
                        this.peopleColor = "red"
                        this.peopleDesc = "分户生效"
                    }else{
                        this.peopleColor = "grey lighten-1"
                        this.peopleDesc = "产品生效"
                    }
                }
            }
        }
    };
</script>
<style scoped>
 .dcMulti1 {
  margin-top: 18px;
 }
 .baseIcon {
  padding-top: 15px;
  color: #ff110e;
 }
 .lock {
  color: #ff8511;
  padding-top: 20px;
 }
</style>

<template>
 <div class="navbar">  <v-btn
         fab
         dark
         class="smallButton"
         :color="selected.color"
 >
  <v-icon>{{selected.text}}</v-icon>
 </v-btn>
  <ul class="menu" >
   <li v-for="btn in btnList" v-if="btn.text!=selected.text">
    <v-btn
            fab
            dark
            :color="btn.color"
    >
     <v-icon class="smallIconChild" @click="changeSelected(btn)">{{btn.text}}</v-icon>
    </v-btn>
   </li>
  </ul>
 </div>
</template>
<script>
    export default {
        model: {
            prop: "option",
            event: "getVue"
        },
        props: {
            option: String
        },
        data()
        {
            return {
               btnList: [
                   {
                       color: 'blue darken-2',
                       text: 'edit',
                       opt: 'E'
                   },{
                       color: 'indigo',
                       text: 'no_sim',
                       opt: 'N'
                   },
                   {
                       color: 'green',
                       text: 'visibility_off',
                       opt: 'V'
                   },{
                       color: 'red',
                       text: 'delete',
                       opt: 'D'
                   }
               ],
                selected: {
                    color: 'blue darken-2',
                    text: 'edit',
                    opt: 'E'
                }
            }
        },
        watch: {
            option: {
                handler(msg) {
                  this.init(msg)
                }
            }
        },
        created() {
            if(typeof this._props.option !== "undefined") {
                this.init(this._props.option)
            }
        },
        methods: {
             changeSelected (seleted) {
                 this.$emit("getVue", seleted.opt);
             },
            init (msg){
                for(const select in this.btnList){
                    if(this.btnList[select].opt == msg){
                        this.selected=this.btnList[select]
                    }
                }
            }
        }
    }
 </script>
<style scoped>
 .demo{
  padding: 2em 0;
  transform: translate3d(0, 0, 0);
 }
 .navbar {

  padding-top: 9px;
  border-radius: 50%;
  background: #fff;
  height: 100px;
  width: 100px;
  position: absolute;
  cursor: pointer;
  font-size: 1.75em;
  font-weight: bold;
  color: #99b977;
  transition: 0.24s 0.2s;
 }
 .navbar:hover{
  background: rgba(255, 255, 255, 0.75);
 }
 .navbar .menu{
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  cursor: default;
  border-radius: 50%;
  transform: scale(0);
  transition: transform 1.4s 0.07s;
  z-index: -1;
 }
 .navbar:hover .menu{
  transition: transform 0.4s 0.08s, z-index   0s  0.5s;
  transform: scale(1);
  z-index: 1;
 }
 .navbar .menu li{
  position: absolute;
  left: 0px;
  top: -85px;
  transform-origin: 22px 65px;
  transition: all 0.5s 0.1s;
 }
 .navbar:hover .menu li{
  transition: all 0.6s;
 }
 .navbar .menu li button{
  width: 25px;
  height: 25px;
  line-height: 45px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  font-size: 60%;
  transition: 0.6s;
 }
 .navbar:hover .menu li:nth-child(1){
  transition-delay: 0.52s;
  transform: rotate(45deg);
 }
 .navbar:hover .menu li:nth-child(1)  button{
  transition-delay: 0.54s;
  transform: rotate(290deg);
 }
 .navbar:hover .menu li:nth-child(2){
  transition-delay: 0.52s;
  transform: rotate(90deg);
 }
 .navbar:hover .menu li:nth-child(2)  button{
  transition-delay: 0.54s;
  transform: rotate(445deg);
 }
 .navbar:hover .menu li:nth-child(3){
  transition-delay: 0.52s;
  transform: rotate(135deg);
 }
 .navbar:hover .menu li:nth-child(3)  button{
  transition-delay: 0.54s;
  transform: rotate(620deg);
 }
 .navbar:hover .menu li:nth-child(4){
  transition-delay: 0.08s;
  transform: rotate(205deg);
 }
 .navbar:hover .menu li:nth-child(4)  button{
  transition-delay: 0.16s;
  transform: rotate(515deg);
 }
 .navbar:hover .menu li:nth-child(5){
  transition-delay: 0.1s;
  transform: rotate(245deg);
 }
 .navbar:hover .menu li:nth-child(5)  button{
  transition-delay: 0.2s;
  transform: rotate(475deg);
 }
 .navbar:hover .menu li:nth-child(6){
  transition-delay: 0.12s;
  transform: rotate(285deg);
 }
 .navbar:hover .menu li:nth-child(6)  button{
  transition-delay: 0.24s;
  transform: rotate(435deg);
 }
 .navbar:hover .menu li:nth-child(7){
  transition-delay: 0.14s;
  transform: rotate(325deg);
 }
 .navbar:hover .menu li:nth-child(7)  button{
  transition-delay: 0.28s;
  transform: rotate(395deg);
 }
 .navbar:hover .menu li:nth-child(8){
  transition-delay: 0.16s;
  transform: rotate(365deg);
 }
 .navbar:hover .menu li:nth-child(8)  button{
  transition-delay: 0.32s;
  transform: rotate(355deg);
 }
 .navbar:hover .menu li:nth-child(9){
  transition-delay: 0.18s;
  transform: rotate(405deg);
 }
 .navbar:hover .menu li:nth-child(9)  button{
  transition-delay: 0.36s;
  transform: rotate(315deg);
 }
 .smallButton {
  width: 30px;
  height: 30px;
 }
 .smallIconChild {
  font-size: 16px;
 }
</style>
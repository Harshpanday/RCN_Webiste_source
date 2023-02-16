<template>
<div class="wrapper">
  <div class="box" id="box">

  <TableComp :dataset="dataset" :persona="persona" :getdata="getdata"/>
  </div>
  <div @mouseover="res" class="handler"></div>
  <div class="box" id="box">

  <GraphComp :prac="data" :target="target" :source="source"  />
</div>
</div>

</template>

<script lang="ts">
import { defineComponent } from "vue"
import dataset from "./ds.json"
import persona from "./persona.json"
import TableComp from '../components/TableComp.vue'
import GraphComp from '../components/GraphComp.vue'


export default defineComponent ({
  name: 'HomePage',
  props: {},
  components: {
      TableComp,
      GraphComp
   },
  data(){
    return {
      dataset:dataset,
      persona:persona,
      data:{},
      table_data_child:{},
      source_from_table:String,
      target_from_table:String,
      source:String,
      target:String      
    }
  },
  methods: {
    getdata(table_data_child: any,source_from_table: any,target_from_table: any){
      this.data = table_data_child
      this.source = source_from_table
      this.target = target_from_table
      console.log(this.source)
      console.log(this.target)
    },
    res(){
          var handler = document.querySelector('.handler') as HTMLElement;
          var wrapper = handler.closest('.wrapper') as HTMLElement;
          var boxA = wrapper.querySelector('.box') as HTMLElement;
          var isHandlerDragging = false;

          document.addEventListener('mousedown', function(e) {
            if (e.target === handler) {
              isHandlerDragging = true;
            }
          });

          document.addEventListener('mousemove', function(e) {
            if (!isHandlerDragging) {
              return false;
            }
            var containerOffsetLeft = wrapper.offsetLeft;
            var pointerRelativeXpos = e.clientX - containerOffsetLeft;
            var boxAminWidth = 60;
            boxA.style.width = (Math.max(boxAminWidth, pointerRelativeXpos - 8)) + 'px';
            boxA.style.flexGrow = "0";
          });

          document.addEventListener('mouseup', function(e) {
            isHandlerDragging = false;
          });
    }
  }
})
</script>

<style scoped>
body {
  margin: 40px;
}

.wrapper {
  /*background-color: #fff;
  color: #fff;*/
  /* Use flexbox */
  display: flex;
}

.box {
  /*background-color: #fff;*/
  /*color: #fff;*/
  border-radius: 5px;
  padding: 20px;
  font-size: 150%;
  
  /* Use box-sizing so that element's outerwidth will match width property */
  box-sizing: border-box;
  
  /* Allow box to grow and shrink, and ensure they are all equally sized */
  flex: 1 1 auto;
}

.handler {
  width: 20px;
  padding: 0;
  cursor: ew-resize;
  flex: 0 0 auto;
}

.handler::before {
  content: '';
  display: block;
  width: 4px;
  height: 100%;
  background: grey;
  margin: 0 auto;
}

/*
* {
  box-sizing: border-box;
}
body {
  font-size: 1.25rem;
  font-family: sans-serif;
  line-height: 150%;
  text-shadow: 0 2px 2px #b6701e;
}

section {
  text-align: center;
}
div {
  height: 68%;
}

article {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  padding: 20px;
}

h1 {
  font-size: 1.75rem;
  margin: 0 0 0.75rem 0;
}

.container {
  display: table;
  width: 100%;
}

.left-half {
  position: absolute;
  left: 0px;
  width: 55%;
}

.right-half {
  position: absolute;
  right: 0px;
  width: 45%;
}
.wrapper {
  width: 100%;
  height: 50%;
  color: black;
  overflow:hidden;
}

.flex_box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
form {
  position: absolute;
  padding: 30px 20px;
  width: 320px;
  border-radius: 7px;
  background-color: white;
  backdrop-filter: blur(5px);
  background-color: rgba(158, 189, 199, 0.288);
  overflow: hidden;
}
.input {
  display: flex;
  flex-direction: column;
}
.button_wrapper {
  display: flex;
  justify-content: flex-end;
}
button {
  padding: 8px 14px;
  margin: 20px 8px 0 0;
  border-width: 0px;
  border-radius: 5px;
  color: white;
  background-color: #2dd2a6;
  transition: 0.3s;
  z-index: 1;
}

button:hover {
  color: rgb(60, 35, 153);
  background-color: white;
}
*/
</style>
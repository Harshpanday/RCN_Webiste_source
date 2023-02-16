<template>
<section class="container">
  <div>
  <div class="demo-control-panel">
    <el-tabs type="border-card">
      <!--<el-tab-pane label="Operations on Nodes">
        <div class="control">
          <label>Field to show on the nodes : </label>
          <el-select v-model="configs.node.label.text">
          <el-option label="Source and Target" value="name" />            
            <el-option label="URL" value="URL" />
          </el-select>
        </div>        
      </el-tab-pane>-->
      <el-tabs>
            <el-tab-pane label="hover">
              <demo_label_config_panel
                v-model:type="configs.node.hover.type"
                v-model:radius="configs.node.hover.radius"
                v-model:width="configs.node.hover.width"
                v-model:height="configs.node.hover.height"
                v-model:borderRadius="configs.node.hover.borderRadius"
                v-model:strokeWidth="configs.node.hover.strokeWidth"
                v-model:strokeColor="configs.node.hover.strokeColor"
                v-model:strokeDasharray="configs.node.hover.strokeDasharray"
                v-model:color="configs.node.hover.color"
              />
            </el-tab-pane>
            <el-tab-pane label="selected">
              <demo_label_config_panel
                v-model:type="configs.node.selected.type"
                v-model:radius="configs.node.selected.radius"
                v-model:width="configs.node.selected.width"
                v-model:height="configs.node.selected.height"
                v-model:borderRadius="configs.node.selected.borderRadius"
                v-model:strokeWidth="configs.node.selected.strokeWidth"
                v-model:strokeColor="configs.node.selected.strokeColor"
                v-model:strokeDasharray="configs.node.selected.strokeDasharray"
                v-model:color="configs.node.selected.color"
              />
            </el-tab-pane>
            </el-tabs>
    </el-tabs>
    <input type="checkbox" id="force" v-model="d3ForceEnabled">
      <label for="force">D3-Force enabled</label>

      <div class="fit_zoom">
          <el-button @click="graph?.panToCenter()">To center</el-button>
          <el-button @click="graph?.fitToContents()">Fit</el-button>
          <el-button @click="graph?.zoomIn()">Zoom In</el-button>
          <el-button @click="graph?.zoomOut()">Zoom Out</el-button>

        </div>
  </div>
  <el-button type="warning" round @click="gr">Create Graph </el-button>
  <el-button type="primary" @click="downloadasSVG">
      <el-icon><download /></el-icon>
      Download Graph
    </el-button>
    
  <v-network-graph ref="graph"
            :nodes="nodes"
            :edges="edges"
            :configs="configs"
            :event-handlers="eventHandlers"/>  

  
  </div>  
  
  </section>
</template>

<script lang="ts">
import { ref,reactive, toRefs } from 'vue'
import demo_label_config_panel from '@/components/NodeConfigPanel.vue'
import { defineComponent } from "vue"
import * as vNG from "v-network-graph"
export default defineComponent ({
  name: 'GraphView',
  props: ['prac','source','target'],
  components: {
    demo_label_config_panel
  },
  data(){
    return {
      e1:"",
      e2:"",
    nodes:{} as { [key: string]: { name: string;URL:string;size: number;label: boolean;color:string } },
    edges:{} as { [key: string]: { source: string; target: string} },
    //graph:ref<vNG.Instance>()
    }
  },
  methods: {
    gr() {    
    //  const { prac } = toRefs(props)
    //  const n = reactive( prac.value )
    //  const n= prac.length
    const n = this.prac
    this.nodes={}
    this.edges={}
    const x = this.source
    const y = this.target
    console.log(x)
    console.log(this.target)
    for (let i = 0; i < n.length; i++) {
    this.nodes[`${n[i][x]}`] = {
    name: `${n[i][x]}`,
    URL: `${n[i].URL}`,
    size: 12,
    label: true,
    color:`Red`
  },
  this.nodes[`${n[i][y]}`] = {
    name: `${n[i][y]}`,
    URL: `${n[i].URL}`,
    size: 12,
    label: true,
    color:`blue`
  };
}
    for (let i=0;i<n.length;i++){      
      this.edges[`edge${i}`]={
        source:`${n[i][x]}`,
        target:`${n[i][y]}`
      }
    }
    console.log(this.nodes)
    console.log(this.edges)
  // return { this.nodes, this.edges }
  }
  
  
}})
</script>

<script setup lang='ts'>
import { computed } from "vue"
import {ForceLayout} from "v-network-graph/lib/force-layout"
import {VNetworkGraphInstance, EventHandlers } from "v-network-graph"
const configs = reactive(
  vNG.defineConfigs({
    view: {
      boxSelectionEnabled: true,
      autoPanOnResize: true,
      minZoomLevel: 0.1,
      maxZoomLevel: 16,
      layoutHandler: new ForceLayout({
        positionFixedByDrag: false,
        positionFixedByClickWithAltKey: true
      }),
    },
    node: {
      selectable: true,
      normal: {
        type: "circle",
        radius: node => node.size, // Use the value of each node object
        color: node => node.color,
      },
      hover: {
        type: "circle",
        radius: node => node.size + 2,
        color: "#dd2288",
        // for type is "rect" -->
        width: 32,
        height: 32,
        borderRadius: 4,
        // <-- for type is "rect"
        strokeWidth: 0,
        strokeColor: "#000000",
        strokeDasharray: "0",
      },
      selected: {
        type: "circle",
        radius: node => node.size + 2,
        // for type is "rect" -->
        width: 32,
        height: 32,
        borderRadius: 4,
        // <-- for type is "rect"
        strokeWidth: 0,
        strokeColor: "#000000",
        strokeDasharray: "0",
        color:"#4466cc",
      },
      label: {
        visible: node => !!node.label,
        fontFamily: undefined,
        fontSize: 11,
        lineHeight: 1.1,
        color: "#000000",
        margin: 4,
        direction: "south",
        background: {
          visible: false,
          color: "#ffffff",
          padding: {
            vertical: 1,
            horizontal: 4,
          },
          borderRadius: 2,
        },
      },
      focusring: {
        visible: true,
        width: 4,
        padding: 3,
        dasharray: "0",
        color: "darkgray",
      },
    },
    edge: {
      selectable: true,
      normal: {
        width: edge => edge.width, // Use the value of each edge object
        color: edge => edge.color,
        dasharray: edge =>(edge.dashed ? "4" : "0"),
      },
      marker: {
        source: {
          type: "none",
          width: 4,
          height: 4,
          margin: -1,
          units: "strokeWidth",
          color: null,
        },
        target: {
          type: "arrow",
          width: 10,
          height: 10,
          margin: -1,
          units: "strokeWidth",
          color: null,
        },
    },
    },
  })
)
const d3ForceEnabled = computed({
  get: () => configs.view.layoutHandler instanceof ForceLayout,
  set: (value: boolean) => {
    if (value) {
      configs.view.layoutHandler = new ForceLayout()
    } else {
      configs.view.layoutHandler = new vNG.SimpleLayout()
    }
  },
})
const graph = ref<vNG.Instance>()
function downloadasSVG(){
    if(!graph.value) return
    const text = graph.value.getAsSvg()
    const url = URL.createObjectURL(new Blob([text],{type:"octet/stream"}))
    const a = document.createElement("a")
    a.href = url
    a.download = "graph.svg"
    a.click()
    window.URL.revokeObjectURL(url)
    //console.log(text)
    
  }
  const isBoxSelectionMode = ref(false)
const eventHandlers: EventHandlers = {
  "view:mode": mode => {
    // Observe mode change events
    isBoxSelectionMode.value = mode === "box-selection"
  },
}
//const zoomLevel = ref(1)
</script>

<style scoped>
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

/* Pattern styles */
.container {
  display: table;
  width: 100%;
}

.left-half {
  position: absolute;
  left: 0px;
  width: 60%;
}

.right-half {
  position: absolute;
  right: 0px;
  width: 40%;
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
.outer-box {
  margin: 12px;
  width: 100%;
  height: 700px;
  position: relative;
  background-color: #ffffff;
}
.resizable {
  position: relative;
  resize: both;
  overflow: hidden;
  min-width: 100px;
  min-height: 100px;
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
  border: 1px solid #444444;
  background-color: #ffffff;
}
.handle {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-left: 8px solid transparent;
  border-right: 8px solid #ff8f8f;
  border-bottom: 8px solid #ff8f8f;
  pointer-events: none;
}
</style>

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//import store from './store'
import VNetworkGraph from "v-network-graph"
import "v-network-graph/lib/style.css"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(VNetworkGraph)
app.use(ElementPlus)
app.use(router)
//app.component("demo_label_config_panel", NodeConfigPanel)
app.mount("#app")
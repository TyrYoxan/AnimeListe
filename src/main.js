import { createApp } from 'vue'
import App from './App.vue'
import api from "@/conf/api.js";
import toolsMixin from "@/conf/tools.js"

const app = createApp(App)

app.use(api,{baseUrl:'https://kitsu.io/api/edge'})
app.mixin(toolsMixin);

app.mount('#app')


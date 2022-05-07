import { createApp } from 'vue'
import { createPinia } from 'pinia'
import urql from '@urql/vue';
import App from './App.vue'
import { GRAPH_URL } from './contract';
const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

import "./index.css"
createApp(App)
    .use(urql, { url: GRAPH_URL })
    .use(createPinia())
    .mount('#app')


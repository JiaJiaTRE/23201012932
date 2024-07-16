import './assets/main.css' 

import Vant from 'vant';
import 'vant/lib/index.css';

import './assets/font/iconfont.css'

import { createApp } from 'vue'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

import Nav from './components/NavBottom.vue'

const app = createApp(App)

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
// app.use(createPinia())
app.use(pinia)
app.use(router)
app.use(Vant);
app.use(Vant.Lazyload);
app.component('Nav', Nav)
app.mount('#app')

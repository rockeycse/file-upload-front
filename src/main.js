import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import ProgressBar from 'vuejs-progress-bar'
// Vue.use(ProgressBar)

createApp(App).use(store).use(router).mount('#app')

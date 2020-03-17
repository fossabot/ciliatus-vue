import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import vuetify from "./plugins/vuetify"
import {VueMasonryPlugin} from 'vue-masonry'
import Masonry from "./components/misc/Masonry"
import MasonryTile from "./components/misc/MasonryTile"
import axios from "axios";
import '@mdi/font/css/materialdesignicons.css'
import 'typeface-roboto/index.css';

Vue.use(VueMasonryPlugin)

Vue.component('v-masonry', Masonry)
Vue.component('v-masonry-tile', MasonryTile)

Vue.config.productionTip = false

window.vueApp = new Vue({
    router,
    store,
    vuetify,
    iconfont: 'mdi',
    render: h => h(App)
}).$mount('#app')

axios.defaults.withCredentials = true;
axios.defaults.headers.common = {
    "Accept": "application/json"
}

axios.get('/airlock/csrf-cookie')

String.prototype.sprintf = function (...args) {
    let i = 0;
    return this.replace(/%s/g, () => args[i++]);
}

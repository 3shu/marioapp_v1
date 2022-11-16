import './bootstrap';

import { createApp } from 'vue';
import router from './router.js'
import store from './store'

import App from './Layouts/App.vue'

createApp(App)
    .use(router)
    .use(store)
    .mount("#app")

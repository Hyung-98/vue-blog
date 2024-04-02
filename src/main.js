import { createApp } from 'vue';
import router from './router/router';
import App from './App.vue';
import mitt from 'mitt';
import axios from 'axios';
import store from './vuex/store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp({
  extends: App,
  beforeCreate() {
    this.$store.dispatch('getMemberInfo');
  },
});
let emitter = mitt();

app.config.globalProperties.$axios = axios;
app.config.globalProperties.emitter = emitter;
app.config.globalProperties.$store = store;

app.use(router).mount('#app');

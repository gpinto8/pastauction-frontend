import store from '@/store';
import { createApp } from 'vue';

import App from '@/App.vue';
import vuetify from '@/plugins/vuetify';
import router from '@/router/index';
import './assets/main.css';
import axios from 'axios';
import config from '@/config';

const vue = createApp(App);
vue.use(router);
vue.use(store);
vue.use(vuetify);

axios.defaults.baseURL = config.apiUrl;

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem('past_token')
      ? window.localStorage.getItem('past_token')
      : null;
    if (config.cancelToken) return config;

    if (token) config.headers['Authorization'] = 'Bearer ' + token;
    return { ...config, cancelToken: axios.CancelToken.source().token };
  },
  err => {
    console.log(err);
    throw err;
  }
);

// Run!
router
  .isReady()
  .then(() => vue.mount('#app'))
  .catch(e => console.error(e));

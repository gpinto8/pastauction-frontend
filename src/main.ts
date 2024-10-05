import store from '@/store';
import { createApp, watch } from 'vue';
import 'swiper/swiper-bundle.css';

import App from '@/App.vue';
import vuetify from '@/plugins/vuetify';
import router from '@/router/index';
import './assets/main.css';
import './assets/fonts.css';
import axios from 'axios';
import config from '@/config';
import { loadFonts } from './plugins/webfontloader'
import { useAuthStore } from './store/auth'

loadFonts();

// https://github.com/alvarotrigo/vue-fullpage.js
import 'vue-fullpage.js/dist/style.css';
import VueFullPage from 'vue-fullpage.js';

const vue = createApp(App);
vue.use(VueFullPage);
vue.use(router);
vue.use(store);
vue.use(vuetify);

axios.defaults.baseURL = config.apiUrl;
axios.interceptors.request.use(
  (config: any) => {
    if (config.cancelToken) return config;
    return { ...config, cancelToken: axios.CancelToken.source().token };
  },
  err => {
    console.log(err);
    throw err;
  }
);

function setToken (token:string| null = window.localStorage.getItem('past_token')) {
  if (!token) return
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
setToken()

const auth = useAuthStore()
watch(() => auth.authToken, (token) => {
  if (token) {
    setToken(token)
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
})



// Run!
router
  .isReady()
  .then(() => vue.mount('#app'))
  .catch(e => console.error(e));

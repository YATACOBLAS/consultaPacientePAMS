import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

//axios
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios,axios);

Vue.config.productionTip = false

axios.defaults.baseURL='http://localhost:3000/api';

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

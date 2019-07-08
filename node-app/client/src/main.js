import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from './http';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import moment from 'moment'



Vue.use(ElementUI);
Vue.prototype.$axios = axios;

Vue.config.productionTip = false

//日期过滤器
Vue.filter('moment', (value, formatString) => {
    formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
    return moment(value).format(formatString)
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
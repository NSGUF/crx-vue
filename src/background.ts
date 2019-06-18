import Vue from 'vue';
import App from './Background.vue';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#background');

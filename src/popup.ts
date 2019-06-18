import Vue from 'vue';
import App from './Popup.vue';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#popup');

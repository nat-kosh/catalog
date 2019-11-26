import Vue from 'vue';
import App from './Content.vue';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  el: '#films-search',
  store,
  render: h => h(App)
});

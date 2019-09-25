import Vue from 'vue';
import App from './App.vue';
import store from '@/js/.store';
import router from '@/js/.router';
import * as Mixins from '@/js/.mixins';
import * as Uses from '@/js/.use';
import './registerServiceWorker';

Vue.config.productionTip = false;
for (let name in Mixins) Vue.mixin(Mixins[name]);
for (let name in Uses) Vue.use(Uses[name]);

window.mainVue = new Vue({
  router,
  store,
  mounted,
  render: h => h(App)
});

window.mainVue.$mount('#app');

function mounted() {
  console.info('Vue engine mounted.');
}

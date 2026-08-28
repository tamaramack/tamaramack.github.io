import Vue from 'vue';
import App from './App.vue';
import store from '@/js/.sys/store';
import router from '@/js/.sys/router';
import * as Mixins from '@/js/.sys/mixins';
import * as Uses from '@/js/.sys/use';
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

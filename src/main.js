// import '@progress/kendo-ui';
// import '@progress/kendo-theme-default/scss/all.scss';
import Vue from 'vue';
/* import {
  DateinputsInstaller,
  Calendar,
  DateInput,
  DatePicker,
  DateRangePicker,
  DateTimePicker,
  TimePicker,
  MultiViewCalendar
} from '@progress/kendo-dateinputs-vue-wrapper'; */
import App from './App.vue';
import router from './router';
import store from './store';
import initFoundation from './js/foundation';
import Mixins from './mixin';
import './registerServiceWorker';

Vue.config.productionTip = false;
// Vue.use(DateinputsInstaller);
Mixins(Vue);

window.mainVue = new Vue({
  router,
  store,
  beforeCreate,
  mounted,
  render: h => h(App)
});

window.mainVue.$mount('#app');

function mounted() {
}

function beforeCreate() {
  console.debug('Vue before Create');
  console.dir(Vue);
  console.debug(this);
  initFoundation(Vue);
}

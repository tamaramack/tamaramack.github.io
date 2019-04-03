import Vue from 'vue';
import Vuex from 'vuex';
import searchModule from '@/pages/rv-vue-search/store-module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    rover: searchModule
  },
  state: {},
  mutations: {},
  actions: {}
});

import Vue from 'vue';
import Vuex from 'vuex';
import searchModule from '@/pages/rv-vue-search/store-module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    rover: searchModule
  },
  state: {
    geoError: false,
    latitude: 0,
    longitude: 0
  },
  mutations: {
    updateLocation(state, results) {
      if (results.message)
        this.state.geoError = results.message;
      else
        [state.latitude, state.longitude] = [results.latitude, results.longitude];
    }
  },
  actions: {}
});

/**
 * index js file created by Tamara G. Mack on 24-Sep-19 for tamaramack.github.io
 */
import Vue from 'vue';
import Vuex from 'vuex';
import geolocation from './geolocation';
import searchModule from '@/pages/rover/store-module';
import ColorsModule from '@/pages/colors/store-module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    rover: searchModule,
    colors: ColorsModule
  },
  state: {
    styleMode: 'light',
    geoError: false,
    latitude: 0,
    longitude: 0
  },
  mutations: {
    updateLocation(state, results) {
      if (results.message) this.state.geoError = results.message;
      else [state.latitude, state.longitude] = [results.latitude, results.longitude];
    }
  },
  actions: {
    geolocation
  }
});

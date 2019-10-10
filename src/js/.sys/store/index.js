/**
 * index js file created by Tamara G. Mack on 24-Sep-19 for tamaramack.github.io
 */
import Vue from 'vue';
import Vuex from 'vuex';
import geolocation from './geolocation';
import enums from './enums';
import searchModule from '@/pages/rover/store-module';
import ColorsModule from '@/pages/colors/store-module';

const { view, theme } = enums;

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    rover: searchModule,
    colors: ColorsModule
  },
  getters: {
    navigationComponent(state, getters) {
      return () => import('@/components/tmp/GeoLocation.vue');
    }
  },
  state: {
    styleMode: theme.light,
    activeView: false,
    activePage: null,
    geoError: false,
    latitude: 0,
    longitude: 0
  },
  mutations: {
    updateLocation(state, results) {
      if (results.message) state.geoError = results.message;
      else [state.latitude, state.longitude] = [results.latitude, results.longitude];
    },
    updateView(state, v) {
      state.activeView = view[v] || state.activeView;
      console.info('Commit view state', v, state.activeView);
    },
    updateStyle(state, mode) {
      state.styleMode = theme[mode] || theme.light;
    }
  },
  actions: {
    geolocation
  }
});

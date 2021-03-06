/**
 * store-module js file created by Tamara G. Mack on 03-Apr-19 for tamaramack.github.io
 */
import createLogger from '@/js/utilities/logger';
import { debounce } from '@/js/utilities/utilities';
import { getEndPoints, getList } from './js/api';
import { ResultModel } from './js/models';
import getters from './js/getters';

const debug = process.env.NODE_ENV !== 'production';
const rover = 'rover/';

export default {
  namespaced: true,
  getters,
  state: {
    fetchData: false,
    isLoading: false,
    centerlat: 0,
    centerlng: 0,
    searchValue: 'test',
    services: {},
    service_type: null,
    selectedPetTypes: [],
    dog_preference: null,
    residence_preference: null,
    dog_size: [],
    person_summary: false,
    start_date: null,
    end_date: null,
    minprice: null,
    maxprice: null,
    count: 0,
    listings: [],
    urlParameters: ''
  },
  mutations: {
    updateSearch(state, textValue) {
      state.searchValue = textValue;
      console.info('UPDATED!!', state.searchValue);
    },
    geolocation(state, results) {
      console.log(results);
      if (!results.message) {
        state.centerlat = results.latitude;
        state.centerlng = results.longitude;

        this.commit(`${rover}setUrlParameters`, { data: this.getters[`${rover}parameters`] });
        this.dispatch(`${rover}getEndPoints`);
      }
    },
    updatePets(state, pets) {
      state.selectedPetTypes = pets;
      this.dispatch(`${rover}availableServices`);
    },
    updateService(state, slug) {
      state.service_type = slug;
    },
    updateResidencePreference(state, newPreference) {
      state.residence_preference = newPreference;
    },
    updateDogPreference(state, newPreference) {
      state.dog_preference = newPreference;
    },
    updateDogSize(state, size) {
      state.dog_size = size;
    },
    updatePrice(state, { min, max }) {
      if (min) state.minprice = min;
      if (max) state.maxprice = max;
    },
    updateDate(state, { start, end }) {
      if (start) state.start_date = start;
      if (end) state.end_date = end;
    },
    setUrlParameters(state, { form, data }) {
      state.fetchData = true;
      console.info(data);
      if (typeof data !== 'string') data = this._vm.$.param(data, true);
      state.urlParameters = decodeURIComponent(data);
      this.dispatch(`${rover}getList`);
    },
    setSlugs(state, data) {
      // console.debug('service SLUGS', data);
      state.services = data;
    },
    mapResults(state, data) {
      // console.log('mapResults RAW', data);
      state.count = data.count;
      state.listings = data.results.map(item => new ResultModel(item));
      // console.log('mapResults', state.listings);
    }
  },
  actions: {
    getEndPoints,
    getList: debounce(getList, 300)
  },
  plugins: debug ? [createLogger()] : []
};

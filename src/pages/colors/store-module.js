import getters from '../rover/js/getters';

/**
 * store-module js file created by Tamara G. Mack on 02-May-19 for tamaramack.github.io
 */
import createLogger from '@/js/utilities/logger';
import { debounce } from '@/js/utilities/utilities';
import Colors from '@/js/colors/colors';

const debug = process.env.NODE_ENV !== 'production';
const page = 'colors/';

export default {
  namespaced: true,
  state: {
    color: null,
    list: []
  },
  mutations: {
    updateActiveColor(state, value) {
      state.color = value;
      console.log('new Color', value);
    }
  },
  getters: {

  },
  actions: {},
  plugins: debug ? [createLogger()] : []
};

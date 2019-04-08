/**
 * getters js file created on 01-Apr-19 for
 * interview-190319-tm
 */
import { InputItems, InputList } from '@/js/models/input';

export default getters();

const petTypes = new Set(['cat', 'dog']),
  dogPreferences = new Set(['no_other_dogs', 'other_dogs', 'no_pref']),
  dogSizes = new Set(['small', 'medium', 'large', 'giant']),
  residencePreferences = new Set(['houses', 'apartments', 'no_pref']);

function getters() {
  const obj = {};

  obj.petTypes = state => petTypes;
  obj.dogPreferences = state => dogPreferences;
  obj.dogSizes = state => dogSizes;
  obj.residencePreferences = state => residencePreferences;

  obj.mapServices = (state) => {
    const services = Object.keys(state.services) || [];
    return services.map(service => new InputItems(service));
  };

  obj.exact = state => (state.centerlat && state.centerlng ? 1 : null);
  obj.dateRange = state => ({
    start: state.start_date,
    end: state.end_date
  });
  obj.priceRange = state => ({
    default_min: state.count ? Math.min(
      ...state.listings.map(item => parseFloat(item.price))
    ) : 0,
    default_max: state.count ? Math.max(
      ...state.listings.map(item => parseFloat(item.price))
    ) : 0,
    min: state.minprice,
    max: state.maxprice
  });

  // pure Getters
  obj.selectedService = state => state.service_type;
  obj.residencePreference = state => state.residence_preference;
  obj.dogPreference = state => state.dog_preference;

  obj.parameters = (state) => {
    const params = {};
    let keys = [
      'dog_size',
      'start_date',
      'end_date',
      'minprice',
      'maxprice',
      'person_summary',
      'dog_preference',
      'residence_preference',
      'centerlat',
      'centerlng'
    ];

    let i = keys.length;
    while (i--) {
      const property = keys[i];
      if (state[property]) params[property] = state[property];
    }

    if (obj.exact) params.exact = obj.exact;

    return JSON.parse(JSON.stringify(params));
  };

  return obj;
}

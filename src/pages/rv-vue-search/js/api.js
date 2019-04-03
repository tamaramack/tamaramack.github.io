const endPoints = 'https://www.rover.com/api/v3/search-endpoints/';
const baseUrl = 'https://www.rover.com/api/v3/search/';

export {
  getEndPoints,
  getList
};

function getEndPoints({ commit, state }) {
  state.fetchData = true;
  get(endPoints, {
    success: data => commit('setSlugs', data),
    error: error => console.error('ERROR: ', error)
  }, state);
}

function getList({ commit, state }) {
  const parameters = state.urlParameters;

  if (state.service_type && state.centerlng) get(`${baseUrl}${state.service_type}/`, {
    parameters,
    success: data => commit('mapResults', data),
    error: error => console.error('ERROR: ', error)
  }, state);
}

function get(url, { parameters, success, error }, state) {
  let init = {};
  if (parameters) {
    let data = `?${parameters}`;

    url += data;
    init = {
      method: 'get'
    };
  }

  fetch(url, init)
    .then((response) => {
      // console.log('Response', response);
      if (response.ok) return response.json();
      return undefined;
    })
    .then(success)
    .catch(error)
    .finally(() => {
      state.fetchData = false;
    });
}

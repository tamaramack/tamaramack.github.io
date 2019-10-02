/**
 * geolocation js file created on 30-Mar-19 for
 * interview-190319-tm
 */

const location = 'updateLocation';
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

export default geolocation;

async function geolocation({ commit }) {
  const message = 'geolocation IS NOT available';
  let results = { message };

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(success, error, options);
  } else {
    console.error('ERROR:', message);
    commit(location, results);
  }

  function success(position) {
    const { latitude, longitude, accuracy } = position.coords;
    let date = new Date(position.timestamp);
    date = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

    console.debug(date, 'Your current position is:');
    console.log(`Latitude : ${latitude}`);
    console.log(`Longitude: ${longitude}`);
    console.log(`More or less ${accuracy} meters.`);
    commit(location, position.coords);
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    commit(location, err);
  }
}

/**
 * geolocation file for tamaramack.github.io on 14-Apr-17.
 */

/**
 * Set geolocation to all html pages
 * @param isProd
 * @returns {getGeoLocation}
 */
module.exports = function geoLocation(isProd) {
  const geolocation = require('geolocation');
  var options = {
    enableHighAccuracy: isProd,
    timeout: isProd ? 2000 : 5000,
    maximumAge: isProd ? 2 : 0
  };

  return function getGeoLocation(req, res, next) {
    const datastring = JSON.parse(res.locals.datastring || '{}');

    function complete(obj) {
      res.query.geolocation = obj;
      datastring.geolocation = obj;
      res.locals.datastring = encodeURIComponent(JSON.stringify(datastring));
      next();
    }

    function error(err) {
      const msg = `ERROR(${err.code}): ${err.message}`;
      console.warn(msg);
      complete({ error: msg });
    }

    function success(position) {
      console.log(position);
      const crd = position.coords;
      complete({
        lat: crd.latitude,
        long: crd.longitude,
        accuracy: crd.accuracy
      });
    }

    geolocation.getCurrentPosition(success, error, options);
  };
};

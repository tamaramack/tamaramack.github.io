/**
 * request-json file for tamaramack.github.io on 16-Apr-17.
 */

module.exports = function requestJsonCallback(res, isCached) {
  return function(error, response, body) {
    if (isCached) {
      response = (response && response.value && response.value.response) || response;
    }
    var _json = {
      status: 'success',
      statusCode: response && response.statusCode,
      statusMessage: response && response.statusMessage,
      timestamp: Date.now()
    };
    console.log(_json);
    if (error) {
      console.log('\nERROR_TIMED_OUT', error.code === 'ETIMEDOUT');
      console.error(error);
      _json.status = 'error';
      _json.error = JSON.parse(JSON.stringify(error));
      _json.timestamp = Date.now();
    }

    if (body) _json.json = body;
    if (response) res.json(_json);
  };
};

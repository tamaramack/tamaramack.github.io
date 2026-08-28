/**
 * request-json file for tamaramack.github.io on 16-Apr-17.
 */

module.exports = requestJsonCallback;

function requestJsonCallback() {
  const request = require('request');

  return callback;

  function callback(url, querystring, res) {
    request({
      url: url,
      qs: querystring
    }, (error, response, body) => {
      const json = {};
      if (error) {
        json.error = error;
        console.error(error);
      }

      console.log('statusCode:', response && response.statusCode);
      json.response = response;
      if (response && body) {
        json.body = JSON.parse(body);
        res.json(json);
      }
    });
  }
}

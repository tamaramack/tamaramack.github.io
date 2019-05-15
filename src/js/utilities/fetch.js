/**
 * get-json js file created by Tamara G. Mack on 14-May-19 for
 * tamaramack.github.io
 */

export function getJson(url, {
  data,
  success,
  error,
  final
}) {
  let init = {
    method: 'GET'
  };

  if (typeof data === 'string')
    url += `?${data}`;
  else if (data)
    init.body = data;

  const verifyJson = (response) => {
    // console.log('Response', response);
    if (response.ok) return response.json();
    return undefined;
  };

  return myFetch(url, init, { error, final, success }, verifyJson);
}

export function getScripts() {

}

export function getMedia(mediaURL, {
  init = {},
  success,
  error,
  final
}) {
  if (typeof mediaURL !== 'string' || !(mediaURL instanceof Request))
    throw new Error('Media Url must be a string or Request.');

  const myRequest = new Request(mediaURL);
  const verifyBlob = (response) => {
    if (response.ok) return response.blob();
    return undefined;
  };
  const onSuccess = (blob) => {
    const obj = URL.createObjectURL(blob);
    if (success) success(obj);
  };

  return myFetch(myRequest, init, {
    error,
    final
  }, verifyBlob, onSuccess);
}

export function get(resource, {
  init = {},
  success,
  error,
  final
}) {
  init.method = 'GET';
  return myFetch(resource, init, { success, error, final });
}

export function postJSON(url, {
  data,
  success,
  error,
  final
}) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  let init = {
    method: 'POST',
    body: JSON.stringify(data),
    headers
  };

  const verifyJson = response => response.json();

  return myFetch(url, init, { error, final, success }, verifyJson);
}

export function post(resource, {
  init = {},
  success,
  error,
  final,
  isPut
}) {
  init.method = isPut ? 'PUT' : 'POST';
  return myFetch(resource, init, { success, error, final });
}

export function postFiles(url, {
  success,
  error,
  final,
  isPut
}, ...files) {
  const method = isPut ? 'PUT' : 'POST';
  const verifyJson = response => response.json();
  const promises = [];

  for (let i = 0; i < files.length; i++) {
    const fileData = files[i];
    let init;
    if (fileData instanceof FormData) {
      init = {
        method,
        body: fileData
      };
    } else {
      const formData = new FormData();
      for (let prop in fileData) {
        if (!fileData.hasOwnProperty(prop)) continue;
        const value = fileData[prop];
        if (Array.isArray(value))
          value.forEach((item) => {
            formData.append(prop, item);
          });
        else
          formData.append(prop, value);
      }
      init = {
        method,
        body: formData
      };
    }
    promises.push(myFetch(url, init, { error, final, success }, verifyJson));
  }

  return promises;
}

function myFetch(response, init, {
  success,
  error,
  final
}, ...fulfillments) {
  let fetchPromise = fetch(response, init);

  for (let i = 0; i < fulfillments.length; i++) fetchPromise.then(fulfillments[i]);

  if (success) fetchPromise.then(success);

  if (error) fetchPromise.catch(error);

  if (final) fetchPromise.finally(final);

  return fetchPromise;
}

// async call to retrieve JSON
function getJSON_legacy(url) {
  return new Promise(((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open('get', url, true);
    xhr.onreadystatechange = function () {
      const status = xhr.status;
      if (status == '200' && xhr.readyState === 4)
        resolve(xhr.response);
      else
        reject(status);
    };
    xhr.send(null);
  }));
}

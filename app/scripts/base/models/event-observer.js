/**
 * event-observer file for ndp-video-spa on 14-Jun-16.
 */

(function (base) {
  function AbstractEventObserver() {
    Object.defineProperties(this, {
      timestamp: { value: Date.now() }
      , listeners: {
        value: {},
        enumerable: true
      }
    });
    this.listeners['*'] = [];
  }

  AbstractEventObserver.prototype = Object.create({
    constructor: AbstractEventObserver
  }, {
    addListener: {
      value: addListener,
      enumerable: true
    }
    , removeListener: {
      value: removeListener,
      enumerable: true
    }
    , notify: {
      value: notify,
      enumerable: true
    }
    , getIndex: { value: getIndex }
  });

  Object.defineProperty(base.models, 'AbstractEventObserver', {
    value: AbstractEventObserver,
    enumerable: true
  });

  function addListener(eventStringOrArray, callback) {
    let eventArray = (typeof eventStringOrArray === 'string') ? eventStringOrArray.split(' ') : eventStringOrArray,
      len = eventArray.length;

    var eventName;
    while (len--) {
      eventName = eventArray[len];
      _addListener.call(this, eventName, callback, arguments[2]);
    }
    // console.error(eventArray, this.listeners);
  }

  function _addListener(eventName, callback, scope) {
    if (!this.listeners[eventName]) this.listeners[eventName] = [];
    if (scope) callback = {
      scope: scope,
      callback: callback
    };


    let index = this.getIndex(this.listeners[eventName], callback);
    if (index === -1) (this.listeners[eventName]).push(callback);
  }

  function removeListener(eventStringOrArray, callback) {
    let eventArray = (typeof eventStringOrArray === 'string') ? eventStringOrArray.split(' ') : eventStringOrArray,
      len = eventArray.length;

    var eventName;
    while (len--) {
      eventName = eventArray[len];
      _removeListener.call(this, eventName, callback, arguments[2]);
    }
  }

  function _removeListener(eventName, callback, scope) {
    if (!this.listeners[eventName]) return;
    if (callback === '*' || typeof callback === 'undefined') {
      this.listeners[eventName] = [];
      delete this.listeners[eventName];
      return;
    }

    if (scope) callback = {
      scope: scope,
      callback: callback
    };


    let index = this.getIndex(this.listeners[eventName], callback);
    if (index > -1) (this.listeners[eventName]).splice(index, 1);
  }

  function notify(eventType, event) {
    let _type = eventType;
    if (!!eventType && typeof eventType !== 'string') {
      _type = eventType.type;
      event = eventType;
    }
    // console.warn('notify', _type, this.listeners[_type], event);

    var callback,
      listeners = this.listeners[_type] || [],
      len = listeners.length;
    while (len--) {
      callback = listeners[len];
      if (callback instanceof Function) callback(event);
      else if (callback.notify instanceof Function) callback.notify(_type, event);
      else if (!!(callback.scope)) callback.callback.call(callback.scope, event);
    }
  }

  function getIndex(fnArray, fn) {
    var index = fnArray.length,
      scope = null,
      handler = null;

    if (fn.scope) {
      scope = fn.scope;
      handler = fn.callback;
    }

    var callback;
    while (index--) {
      callback = fnArray[index];
      if (callback === fn
                || ((scope && handler)
                && callback.scope === scope && callback.callback === handler)) return index;
    }
    return -1;
  }
}(window.$base));
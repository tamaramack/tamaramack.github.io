/**
 * request-frame file for tamaramack.github.io on 07-Feb-17.
 */

(function (base) {
  var GlobalID,
    CURRENT_STATE;
  const CALLBACKS = [];

  const requestAnimationFrame = window.requestAnimationFrame
      || window.webkitRequestAnimationFrame
      || window.mozRequestAnimationFrame
      || window.msRequestAnimationFrame
      || function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };

  const cancelAnimationFrame = window.cancelAnimationFrame
      || window.mozCancelAnimationFrame
      || function (requestId) {
        window.clearTimeout(requestId);
      };

  const STATES = {
    on: 'ON',
    off: 'OFF'
  };

  /** *
   *
   * @constructor
   */
  function RequestFrame() {
    CURRENT_STATE = STATES.off;

    Object.defineProperties(this, {
      timestamp: { value: Date.now() }
      , requestId: {
        get: () => GlobalID,
        enumerable: true
      }

      , callbacks: {
        get: () => CALLBACKS,
        enumerable: true
      }

      , length: {
        get: () => CALLBACKS.length,
        enumerable: true
      }
    });
  }

  /** *
   *
   * @type {Object}
   */
  RequestFrame.prototype = Object.create({
    constructor: RequestFrame
  }, {

    /**
     *
     */
    process: { value: process }

    /**
     *
     */
    , start: { value: start }

    /**
     *
     */
    , stop: { value: stop }

    /**
     *
     */
    , add: {
      value: add,
      enumerable: true
    }

    /**
     *
     */
    , remove: {
      value: remove,
      enumerable: true
    }
  });

  Object.defineProperty(base, 'request', {
    value: new RequestFrame(),
    enumerable: true
  });

  function process() {
    var item;
    let i = CALLBACKS.length;
    while (i--) {
      item = CALLBACKS[i];
      if (item.fn instanceof Function) if (item.async) {
        setTimeout((item.fn).bind(item.scope), 1);
      } else {
        (item.fn).call(item.scope);
      }
    }
    GlobalID = requestAnimationFrame(process);
  }

  function start() {
    if (this.startTime) return false;
    Object.defineProperty(this, 'startTime', {
      value: window.performance.now(),
      configurable: true
    });
    GlobalID = requestAnimationFrame(this.process);
    CURRENT_STATE = STATES.on;
    return true;
  }

  function stop() {
    CURRENT_STATE = STATES.off;
    if (!GlobalID) return;
    cancelAnimationFrame(GlobalID);
    delete this.startTime;
    GlobalID = 0;
  }

  function add(fn, owner, async) {
    const results = _find(fn, owner);
    if (results.length || !(fn instanceof Function)) {
      window.console.warn('Adding new function to request frame has failed:',
        results.length, 'results. Is Function?', !(fn instanceof Function));
      return;
    }
    CALLBACKS.push(new CallbackModel(fn, owner, async));
  }

  function remove(fn, owner) {
    const results = _find(fn, owner);
    let i = results.length;
    if (!i) return;
    while (i--) CALLBACKS.splice(results[i], 1);
  }

  function CallbackModel(fn, owner, async) {
    this.fn = fn;
    this.scope = owner;
    this.async = async || false;
    this.id = `${!!async ? 'async_' : ''}fn_${fn.name || Date.now()}`;
  }

  function _find(fn, owner) {
    const results = [];
    let item,
      i = CALLBACKS.length;
    while (i--) {
      item = CALLBACKS[i];
      if (fn === item.fn && owner === item.scope) results.push(i);
    }
    return results;
  }
}(window.$base));

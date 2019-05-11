/**
 * wait file for tamaramack.github.io on 07-Feb-17.
 */

(function (base, $) {
  Date = window.Date;
  let { console } = window;
  const eventObject = $({});

  function Wait() {
    Object.defineProperties(this, {
      // Pages
      timestamp: { value: Date.now() }
      , SUMMARY: _define('summary')
      , HOMEPAGE: _define('homepage')
      , SIMCITY: _define('simcity')
      , RESUME: _define('resume')
      , CANVAS: _define('canvas')
      , VIDEO: _define('video')

      // Modules
      , MODELS: _define('models')
      , UTILS: _define('utils')
      , DATA: _define('data')
      , CONFIGURATION: _define('configuration')
      , LINKS: _define('links')
      , LOG: _define('log')
      , LAYOUT: _define('layout')
    });
  }

  Wait.prototype = Object.create({
    constructor: Wait
  }, {
    debounce: _define(debounce)
    , throttle: _define(throttle)
    , on: _define(on)
    , trigger: _define(trigger)
    , events: { value: {} }
    , _hold: { value: {} }
    , _waitCondition: { value: waitCondition }
    , _setWait: { value: setWait }
  });

  Object.defineProperty(base, 'wait', {
    value: new Wait(),
    enumerable: true
  });

  function debounce(callback, time, unqId) {
    let { _hold } = this;
    return function () {
      const _arguments = arguments.slice();
      if (!isNaN(parseInt(_hold[unqId]))) clearTimeout(_hold[unqId]);

      _hold[unqId] = setTimeout(() => {
        // console.log('debounceTime for ' + unqId + ':  ' + _hold[unqId]);
        if (callback instanceof Function) callback.apply(this, _arguments);
        delete _hold[unqId];
      }, time);
    };
  }

  function throttle(callback, time, unqId) {
    let { _hold } = this;
    this._hold[unqId] = false;
    const clear = () => {
      _hold[unqId] = false;
    };
    return function () {
      if (!_hold[unqId]) {
        callback.apply(this, arguments);
        window.setTimeout(clear, time);
        _hold[unqId] = true;
        // console.log('throttleTime for ' + unqId + ':  ' + _hold[unqId]);
      }
    };
  }

  function on(eventType, callback, timeInterval) {
    if (eventType instanceof Function) {
      this._waitCondition(eventType, callback, timeInterval);
      return;
    }

    if (typeof (this.events[eventType]) === 'undefined') this.events[eventType] = {
      condition: false,
      callbacks: []
    };

    eventObject.on(eventType, callback);
    if (!((this.events[eventType]).callbacks)) {
      this.trigger(eventType);
      return;
    }
    this.events[eventType].callbacks.push(callback);
  }

  function trigger(eventType) {
    if (typeof (this.events[eventType]) === 'undefined') {
      console.warn(eventType, 'NOT INITIATED ON $PAGE_WAIT');
      return;
    }
    eventObject.trigger(eventType).off(eventType);
    if (this.events[eventType]) this.events[eventType].callbacks = false;
  }

  function waitCondition(condition, callback, timeInterval) {
    var item;
    let eventName = false;
    for (let _event in this.events) {
      item = this.events[_event];
      if (item.condition === condition) {
        eventName = _event;
        break;
      }
    }

    if (eventName) {
      eventObject.on(eventName, callback);
      if (!(this.events[eventName].callbacks)) {
        this.trigger(eventName);
        return;
      }
      (this.events[eventName]).callbacks.push(callback);
      return;
    }

    eventName = `c_${Math.ceil(Math.random() * Date.now())}`;
    this.events[eventName] = {
      condition: condition,
      callbacks: [callback],
      status: 0
    };
    console.debug('*** Anonymous Condition initialized!! ***', eventName, this.events[eventName]);
    eventObject.on(eventName, callback);
    this._setWait(eventName, timeInterval);
  }

  function setWait(eventName, timeInterval) {
    timeInterval = parseInt(timeInterval) || 5;
    const _condition = (this.events[eventName]).condition;

    if (_condition instanceof Function && !_condition()) {
      if ((this.events[eventName]).status > 2000) {
        console.warn(`Conditional WAIT TIMED OUT (5s) :: ${
          Date.now()}`, eventName, this.events[eventName]);
        return;
      }

      setTimeout(() => {
        (this.events[eventName]).status++;
        setWait.call(this, eventName, timeInterval);
      }, timeInterval);
      return;
    }

    (this.events[eventName]).callbacks = false;
    eventObject.trigger(eventName).off(eventName);
  }

  function _define(obj) {
    return {
      value: obj,
      enumerable: true
    };
  }
}(window.$base, jQuery));

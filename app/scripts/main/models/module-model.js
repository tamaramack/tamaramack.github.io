/**
 * abstract-module file for ndp-video-spa on 14-Apr-16.
 */

window.$GLOBAL_MODELS.AbstractModule = (function (EventObserver, ko) {
  Date = window.Date;

  function abstract(Module) {
    EventObserver.call(this);
    Object.defineProperties(this, {
      _module: {
        value: Module || false
      }
      , view: {
        value: ko.observable(false),
        enumerable: true
      }
      , html: {
        value: false,
        writable: true
      }
    });

    this.view.subscribe(function (_bool) {
      (window.$page.layout).view(this._module, _bool);
    }, this);
  }

  abstract.prototype = Object.create(EventObserver.prototype, {
    timestamp: { value: Date.now() }
    , constructor: {
      value: abstract,
      configurable: true,
      writable: true
    }
    , parent: {
      get: function () {
        return window.$page.modules;
      }
    }
    , _view: {
      get: function () {
        return window.$GLOBAL_PARAM.$MODULES[this._module];
      }
    }
    , start: {
      value: function (deferTimeout) {
        this.view(true);

        if (this._module) {
          if (window.$page[this._module] instanceof Function) window.$page[this._module](this);


          if (deferTimeout) return;

          var _this = this;
          setTimeout(() => {
            window.$PAGE_WAIT.trigger(_this._module);
          }, 1);
        }
      },
      writable: true,
      enumerable: true
    }
    , restart: {
      value: function (resetFn) {
        this.stop();
        if (resetFn instanceof Function) resetFn();

        var _this = this;
        setTimeout(() => {
          _this.start(true);
        }, 10);
      },
      enumerable: true
    }
    , stop: {
      value: function () {
        this.view(false);
        if (window.$page[this._module] instanceof Function) window.$page[this._module](false);
      },
      writable: true,
      enumerable: true
    }
    , _callbacks: {
      value: []
    }
  });

  return abstract;
}(window.$GLOBAL_MODELS.AbstractEventObserver, window.ko));

/**
 * page file for tamaramack.github.io on 07-Feb-17.
 */

define(['_Console'], (_Console) => {
  function PageConsole(owner) {
    _Console.call(this, '<TM>');

    if (owner && owner.data)
      owner.data.callback.addListener(owner.data.callback.mode, (e) => {
        // console.warn('console update!');
        this.reloadAll(owner.data.mode);
      }, this);
  }

  PageConsole.prototype = Object.create(_Console.prototype, {
    timestamp: {value: (Date.now())}
    , getInstance: {
      value: getInstance,
      enumerable: true
    }
    , reloadAll: {
      value: reloadAll,
      enumerable: true
    }
    , scope: {
      value: scope,
      enumerable: true
    }
    , _scopes: {value: []}
  });

  return PageConsole;

  function scope(owner, ...args) {
    if (!owner) return owner;
    // console.debug('SCOPE', owner);
    if (typeof owner === 'string') {
      var len = (this._scopes).length;
      while (len--)
        if ((this._scopes[len]).id === owner
            || (this._scopes[len]).name === owner) {
          owner = this._scopes[len];
          break;
        }
    }

    // console.debug('FIND CONSOLE SCOPE Results', owner);
    if (!(owner instanceof _Console)) {
      owner = new _Console(owner, args[0], this);
      // console.debug('NEW CONSOLE SCOPE', owner);
    } else if (arguments.length > 1) {
      owner.reload(...args);
    }

    return owner;
  }

  function getInstance(name, mode) {
    name = name || '';
    var _scope = this.scope(name, mode);
    if (!this._debug) return _scope;

    this._scopes.push(_scope);
    return _scope;
  }

  function reloadAll(mode) {
    var len = this._scopes.length;
    this.reload(mode);
    while (len--)
      (this._scopes[len]).reload(mode);
  }
});

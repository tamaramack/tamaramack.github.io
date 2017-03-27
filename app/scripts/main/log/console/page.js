/**
 * page file for tamaramack.github.io on 07-Feb-17.
 */

define(['_Console'],function(_Console){

    function PageConsole(owner) {
        _Console.call(this, '<TM>');

        if (owner && owner.data) {
            owner.data.callback.addListener(owner.data.callback.mode, function (e) {
                //console.warn('console update!');
                this.reloadAll(owner.data.mode);
            }, this);
        }
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

    function scope(scope) {
        if (!scope) return scope;
        //console.debug('SCOPE', scope);
        if (typeof scope === 'string') {
            var len = (this._scopes).length;
            while (len--) {
                if ((this._scopes[len])['id'] === scope
                    || (this._scopes[len])['name'] === scope) {
                    scope = this._scopes[len];
                    break;
                }
            }
        }

        //console.debug('FIND CONSOLE SCOPE Results', scope);
        if (!(scope instanceof _Console)) {
            scope = new _Console(scope, arguments[1], this);
            //console.debug('NEW CONSOLE SCOPE', scope);
        } else if (arguments.length > 1) {
            var arg = Array.prototype.slice.call(arguments, 1);
            scope.reload.apply(scope, arg);
        }

        return scope;
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
        while (len--) {
            (this._scopes[len]).reload(mode);
        }
    }
});
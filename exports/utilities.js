/**
 * utilities file for tamaramack.github.io on 13-Apr-17.
 */

module.exports = {
    isTrue: isTrue,
    verifyString: verifyString,
    isOne: isOne
};

function isTrue(obj) {
    if (typeof obj === 'undefined') return false;
    if (typeof obj === 'boolean') return obj;
    var _obj = parseInt(obj);
    if (isNaN(_obj))return obj === 'true';
    return _obj !== 0;
}

function isOne(obj, defValue) {
    if (typeof obj === 'undefined') return defValue || 0;
    var _obj = parseInt(obj);
    if (isNaN(_obj)) {
        _obj = 0;
        if (obj === true || obj === 'true') _obj = 1;
    }
    return _obj;
}

function verifyString(obj) {
    if (!!obj)return obj.toString();
    return false;
}

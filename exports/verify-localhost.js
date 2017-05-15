/**
 * verify-localhost file for tamaramack.github.io on 16-Apr-17.
 */

module.export = function verifyLocalhost(ENV, PORT) {
  return function isLocalSPA(ipChain) {
    if (ENV === 'development') return true;
    if (PORT === 9005) return true;
    let len = ipChain.length;
    while (len--) {
      const _ip = (ipChain[len]).address || '';
      if ((_ip.split(':'))[0] === '172')
        return true;
    }

    return false;
  };
};

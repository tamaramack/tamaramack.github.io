/**
 * express file for ndp-video-spa on 16-Mar-16.
 */
module.exports = function (grunt, opt) {
    var path = opt.path;
    return {
        dev: {
            options: {
                port: opt.port,
                server: (path).resolve("web"),
                hostname: '*'
            }
        }
    };
}
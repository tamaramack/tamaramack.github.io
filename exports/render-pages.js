/**
 * render-pages file for tamaramack.github.io on 14-Apr-17.
 */

module.exports = function renderPages(app, ENV) {
    const geolocation = require(__dirname + '/geolocation.js');
    const isPROD = (ENV === 'production');

    /**
     * Set geolocation to all html pages
     */
    //app.use(geolocation(isPROD));

    /**
     * Set base parameters to all html pages
     */
    app.use(require(__dirname + '/base.js'));


    return {};
};
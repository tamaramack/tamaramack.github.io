/**
 * render-pages file for tamaramack.github.io on 14-Apr-17.
 * http://stackoverflow.com/questions/37694878/how-to-render-data-using-express-4-pug-jade-angularjs
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


    app.use('/', require(__dirname + '/pages/main'));

    return {};
};
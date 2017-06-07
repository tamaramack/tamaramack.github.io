/**
 * render-pages file for tamaramack.github.io on 14-Apr-17.
 * http://stackoverflow.com/questions/37694878/how-to-render-data-using-express-4-pug-jade-angularjs
 */

module.exports = function renderPages(app, ENV) {
  const geolocation = require('./geolocation');
  const isPROD = (ENV === 'production');

  app.param('pageModule', /^[a-zA-Z0-9-_]+$/);

  /**
   * Set geolocation to all html pages
   */
  // app.use(geolocation(isPROD));

  /**
   * Set base parameters to all html pages
   */
  app.use(require('./base'));

  app.get('/', require('./pages/main'));

  app.get('/i/:pageModule', (req, res) => {
    res.render('');
  });

  app.get('/:pageModule', (req, res) => {
    res.render('');
  });

  app.get('/help', (req, res) => {
    res.render('hook');
  });

  return {};
};

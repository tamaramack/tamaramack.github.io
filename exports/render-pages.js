/**
 * render-pages file for tamaramack.github.io on 14-Apr-17.
 * http://stackoverflow.com/questions/37694878/how-to-render-data-using-express-4-pug-jade-angularjs
 */

module.exports = function renderPages(app, ENV) {
  const geolocation = require(`${__dirname}/geolocation.js`);
  const isPROD = (ENV === 'production');

  app.param('pageModule', /^[a-zA-Z0-9-_]+$/);

  /**
   * Set geolocation to all html pages
   */
  // app.use(geolocation(isPROD));

  /**
   * Set base parameters to all html pages
   */
  app.use(require(`${__dirname}/base.js`));

  app.get('/', require(`${__dirname}/pages/main`));

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

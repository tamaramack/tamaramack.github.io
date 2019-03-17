/**
 * render-pages file for tamaramack.github.io on 14-Apr-17.
 * http://stackoverflow.com/questions/37694878/how-to-render-data-using-express-4-pug-jade-angularjs
 * https://webapplog.com/jade/
 */

module.exports = (() => {
  const mainFn = require('./pages/main');
  const baseFn = require('./base');
  const pug = require('pug');

  return renderPages;

  function renderPages(app, ENV, PORT) {
    const isPROD = (ENV === 'production');

    /**
     * Set base parameters to all html pages
     */
    app.use(baseFn(ENV, PORT));

    app.get('/', mainFn);

    /**
     * Full Page Module
     */
    app.get('/i/:pageModule', (req, res) => {
      // Compile the source code
      const { params } = req;

      const pageFile = '',
        pageLocals = {
          debug: !isPROD
        };

      pug.renderFile(pageFile, pageLocals, (error, html) => {
        res.locals.renderHTML = html;
        res.render('page');
      });
    });

    /**
     * Partial Page Module
     */
    app.get('/:pageModule', (req, res) => {
      const { params } = req;
      const locals = {
        layout: false
      };
      res.render('', locals, (err, html) => {
        res.send(html);
      });
    });

    app.get('/help', (req, res) => {
      res.render('hook');
    });

    return {};
  }
})();

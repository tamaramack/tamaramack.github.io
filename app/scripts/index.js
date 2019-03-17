/**
 * index.js file for tamaramack.github.io on 1/9/2017.
 */

require(['./config.js'], () => {
  document = window.document;
  var _console = window.console;
  _console.debug('Index.js Initialized');

  var wait = window.$PAGE_WAIT;
  wait.on(wait.LOG, () => {
    _console = window.$page.console;
  });

  require(['configuration'], () => {
    _console.info('Data configuration ADDED', new Date().toLocaleString());

    require(['viewmodel'],
      (ViewModel) => {
        window.$page = new ViewModel();
        _console.debug('window[$page]', window.$page);

        setTimeout(() => {
          $(document).foundation();
          window.$page.init();
        }, 1);

        $(() => {
          ko.applyBindings(window.$page);
          _console.debug('foundation initialized!');
          $('#module_pages').removeClass('hide');
        });
      });
  });
});

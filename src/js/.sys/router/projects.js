/**
 * projects js file created by Tamara G. Mack on 24-Sep-19 for
 * tamaramack.github.io
 */
import i from '@/js/.sys/router/import-url';

const { projects: imp, _async: iAsync } = i;

const c = {
  projects: imp('views/Projects.vue'),
  playground: imp('pages/playground/Playground.vue'),
  rover: imp('pages/rover/Search.vue'),
  substring: imp('pages/substring/Substring.vue'),
  colors: imp('pages/colors/Colors.vue'),
  string_reader: iAsync('pages/substring/StringReader'),
  canvas: '',
  simcity: '',
  video: ''
};

export default (() => {
  const playground = {
    path: '/playground',
    name: 'playground',
    component: c.playground
  };

  const substring = {
    path: '/substring',
    name: 'substring',
    component: c.substring,
    children: [
      {
        path: ':name',
        name: 'string-reader',
        beforeEnter: (to, from, next) => {
          next();
        },
        component: c.string_reader
      }
    ]
  };

  const rover = {
    path: '/rover',
    name: 'rover',
    component: c.rover
  };

  const colors = {
    path: '/colors',
    name: 'colors',
    component: c.colors
  };

  const projects = {
    path: '/projects',
    name: 'projects',
    component: c.projects,
    children: [ colors, playground, rover, substring ]
  };

  return [projects];
})();

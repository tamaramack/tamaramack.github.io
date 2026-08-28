/**
 * home js file created by Tamara G. Mack on 24-Sep-19 for tamaramack.github.io
 */
import Home from '@/views/Home.vue';
import i from '@/js/.sys/router/import-url';

const { home: imp } = i;

const c = {
  Home,
  foundation: imp('pages/home/Foundation.vue'),
  docs: imp('pages/home/Docs.vue'),
  summary: imp('pages/home/Summary.vue'),
  helloworld: imp('pages/home/HelloWorld.vue')
};

export default (() => {
  const helloworld = {
    path: '',
    name: 'hello',
    component: c.helloworld
  };

  const foundation = {
    path: 'foundation',
    name: 'foundation',
    component: c.foundation
  };

  const docs = {
    path: 'docs',
    name: 'docs',
    component: c.docs
  };

  const summary = {
    path: 'summary',
    name: 'summary',
    component: c.summary
  };

  const home = {
    path: '/',
    name: 'home',
    component: c.Home,
    children: [ foundation, docs, summary, helloworld ]
  };

  return [home];
})();

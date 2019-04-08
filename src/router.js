import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/r-search',
      name: 'rv-search',
      component: () => import(/* webpackChunkName: "about" */ './pages/rv-vue-search/Search.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/foundation',
      name: 'foundation',
      component: () => import('./pages/foundation/Foundation.vue')
    },
    {
      path: '/substring',
      name: 'substring',
      component: () => import('./views/Substring.vue')
    }
  ]
});

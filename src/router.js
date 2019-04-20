import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Projects from './views/Projects.vue';

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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/rover',
      name: 'rover',
      component: () => import(/* webpackChunkName: "about" */ './pages/rover/Search.vue')
    },
    {
      path: '/foundation',
      name: 'foundation',
      component: () => import('./pages/foundation/Foundation.vue')
    },
    {
      path: '/substring',
      name: 'substring',
      component: () => import('./pages/substring/Substring.vue'),
      children: [
        {
          path: ':name',
          name: 'string-reader',
          beforeEnter: (to, from, next) => {
            next();
          },
          component: () => import('./pages/substring/StringReader')
        }
      ]
    },
    {
      path: '/projects',
      name: 'projects',
      component: Projects,
      children: [
      ]
    }
  ]
});

/**
 * index js file created by Tamara G. Mack on 24-Sep-19 for tamaramack.github.io
 */
import Vue from 'vue';
import Router from 'vue-router';
import home from './home';
import about from './about';
import projects from './projects';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...home,
    ...about,
    ...projects
  ]
});

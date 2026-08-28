/**
 * about js file created by Tamara G. Mack on 24-Sep-19 for tamaramack.github.io
 */
import i from '@/js/.sys/router/import-url';

const { about: imp } = i;
const c = {
  about: imp('views/About.vue'),
  resume: imp('pages/about/Resume.vue'),
};

export default (() => {
  const resume = {
    path: 'resume',
    name: 'resume',
    component: c.resume
  };

  const about = {
    path: '/about',
    name: 'about',
    component: c.about,
    children: [ resume ]
  };
  return [about];
})();

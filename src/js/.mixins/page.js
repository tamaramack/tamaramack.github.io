import def from '@/defaults.json';

export default {
  beforeMount() {
    if (!document.title.includes(def.title)) document.title = `${def.title}`;
    setPage(this);
  }
};

function setPage(vm) {
  let {
    page: {
      title = null
    } = {}
  } = vm.$options;

  if (title) titleFn.call(vm, title);
}

function titleFn(title) {
  title = typeof title === 'function' ? title.call(this) : title;
  document.title = `${title} | ${document.title}`;
  // console.debug('MIXINS TITLE', title, document.title);
}

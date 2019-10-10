import def from '@/defaults.json';

export default {
  beforeMount() {
    if (!document.title.includes(def.title.trim())) document.title = `${def.title}`;
    setPage(this);
  }
};

function setPage(vm) {
  let {
    page: {
      title = null,
      view = false
    } = {}
  } = vm.$options;

  if (title) titleFn.call(vm, title);
  if (view) viewFn.call(vm, view);
}

function titleFn(title) {
  title = typeof title === 'function' ? title.call(this) : title;
  document.title = `${title} | ${def.title.trim()}`;
  // console.debug('MIXINS TITLE', title, document.title);
}

function viewFn(view) {
  view = typeof view === 'function' ? view.call(this) : view;
  this.$store.commit('updateView', view);
}

// import def from '@/defaults';

export default {
  async mounted() {
    const { foundation } = this.$options;

    if (foundation) {
      let { init = false, callback = null } = foundation;
      if (!callback && typeof foundation === 'function')
        callback = foundation;

      const jQuery = await import('jquery'),
        $ = jQuery.default;
      const Foundation = await import('foundation-sites');
      if (init) $(document).foundation();

      if (typeof callback === 'function') {
        this.$nextTick(() => {
          callback.call(this, Foundation, $);
        });
      }
    }
  }
};

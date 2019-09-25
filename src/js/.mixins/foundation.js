// import def from '@/defaults';

export default {
  async mounted() {
    const { foundation } = this.$options;
    if (foundation) {
      console.log('has jQuery', document.$);
      const jQuery = await import('jquery'),
        $ = jQuery.default;
      const Foundation = await import('foundation-sites');
      if (typeof foundation === 'function') {
        $(document).foundation();
        this.$nextTick(() => {
          foundation.call(this, Foundation, $);
        });
      } else if (typeof foundation.callback === 'function') {
        if (!foundation.no_js) $(document).foundation();
        this.$nextTick(() => {
          foundation.callback.call(this, Foundation, $);
        });
      }
    }
  }
};

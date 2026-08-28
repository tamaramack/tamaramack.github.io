<template lang="pug">
    div(:style="boxStyle", :title="title")
      span(:style="contentStyle") {{text}}
</template>

<script>
import Colors from '@/js/colors/colors';
import Color from '@/js/colors/color';

export default {
  name: 'ItemCard',
  props: {
    Color: Color
  },
  computed: {
    title: {
      get() {
        return `${this.Color.hex}\n ${this.Color.rgb}\n ${this.Color.hsl}`;
      }
    },
    text: {
      get() {
        let name = this.Color.hex;
        if (this.Color.names.length) name = this.Color.names[0];

        return `${name} (${this.Color.id})`;
      }
    },
    boxStyle: {
      get() {
        return {
          'border-color': this.Color.invert.rgb,
          'background-color': this.Color.rgb
        };
      }
    },
    contentStyle: {
      get() {
        return {
          color: this.Color.bw
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>

</style>

<template lang="pug">
div
  div.item-details.grid-x.grid-padding-x(:style="boxStyle")
    div.cell
      h2(:style="headerStyle", v-html="header")
      div.grid-x
        div.cell.auto.align-center-middle
          h4 Hex {{Color.hex}}
        div.cell.auto.align-center-middle(:style="rgbStyle")
          h4 {{Color.rgb}}
        div.cell.auto.align-center-middle(:style="hslStyle")
          h4 {{Color.hsl}}

    div.cell.text-left
      h3 Manipulation
      div
</template>

<script>
import Colors from '@/js/colors/colors';
import Color from '@/js/colors/color';

export default {
  name: 'ItemDetails',
  props: {
    Color: Color
  },
  data() {
    return {
      blends: []
    };
  },
  computed: {
    header: {
      get() {
        let name = this.Color.hex;
        if (this.Color.names.length) {
          name = this.Color.names[0];
          if (this.Color.names.length > 1) name += ` <small>(${this.Color.names.slice(1).join(', ')})</small>`;
        }
        return `${name}`;
      }
    },
    headerStyle: {
      get() {
        return {
          'color': this.Color.bw,
          'text-shadow': `1px 1px 1px ${this.Color.invert.hex}`
        };
      }
    },
    boxStyle: {
      get() {
        return {
          'border-color': this.Color.invert.rgba,
          'color': this.Color.bw,
          'text-shadow': `1px 0 0 ${this.Color.invert.rgb}`,
          'background-color': this.Color.hex
        };
      }
    },
    rgbStyle: {
      get() {
        return {
          'background-color': this.Color.rgb
        };
      }
    },
    hslStyle: {
      get() {
        return {
          'background-color': this.Color.hsl
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .item-details {
    border: rem-calc(3) solid transparent;

    h2 {
      text-transform: uppercase;
      }
  }

</style>

<template lang="pug">
div
  .grid-x.grid-padding-y.bordered
    .cell.auto.cell-block(style="background-color: #000000", title="Black")
    .cell.auto.cell-block(style="background-color: #ffffff", title="White")
    .cell.auto.cell-block(style="background-color: #ff0000", title="Red")
    .cell.auto.cell-block(style="background-color: #ffff00", title="Yellow")
    .cell.auto.cell-block(style="background-color: #00ff00", title="Green")
    .cell.auto.cell-block(style="background-color: #00ffff", title="Cyan")
    .cell.auto.cell-block(style="background-color: #0000ff", title="Blue")
    .cell.auto.cell-block(style="background-color: #ff00ff", title="Magenta")

  .item-details(:style="style.box")
    div
      h2(:style="style.header", v-html="header")
      div.grid-x
        div.cell.auto.align-center-middle
          h4 Hex {{Color.hex}}
        div.cell.auto.align-center-middle(:style="style.rgb")
          h4 {{Color.rgb}}
        div.cell.auto.align-center-middle(:style="style.hsl")
          h4 {{Color.hsl}}

    div.mani
      hr/
      h3.text-left Manipulation
      .grid-y.grid-padding-y
        .cell.auto.align-center-middle(:style="style.invert")
          h4 Inverted {{invert.hex}} | {{invert.rgb}} | {{invert.hsl}}
        .cell.auto

  div.callout.secondary
    h4 footer
</template>

<script>
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
    invert: {
      get() {
        return this.Color.invert;
      }
    },
    header: {
      get() {
        let name = this.Color.hex;
        if (this.Color.names.length) {
          name = this.Color.names[0];
          if (this.Color.names.length > 1) {
            name += ` <small>(${this.Color.names.slice(1).join(', ')})</small>`;
          }
        }
        return `${name}`;
      }
    },
    style: {
      get() {
        const { Color: color, invert } = this;
        console.log('test styles');
        return {
          header: {
            'color': color.bw,
            'text-shadow': `1px 1px 1px ${invert.hex}`
          },
          box: {
            'border-color': invert.rgba,
            'color': color.bw,
            'text-shadow': `1px 0 0 ${invert.rgb}`,
            'background-color': color.hex
          },
          rgb: {
            'background-color': color.rgb
          },
          hsl: {
            'background-color': color.hsl
          },
          invert: {
            'color': invert.bw,
            'text-shadow': `0 1px 0 ${color.rgb}`,
            'background-color': invert.rgb
          }
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .bordered {
    border: 1px solid rgba(0,0,0,0.3);
  }

  .item-details {
    /*filter: invert(100%);*/
    border: rem-calc(3) solid transparent;

    h2 {
      text-transform: uppercase;
      }

    .mani > .grid-y {
      min-height: 30vh;
    }
  }

</style>

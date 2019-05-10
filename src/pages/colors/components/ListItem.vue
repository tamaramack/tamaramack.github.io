<template lang="pug">
  div.list-item(:class="{selected: active}", :title="title")
    span.color(:style="colorStyle")
    span.text {{text}}
</template>

<script>
import Colors from '@/js/colors/colors';
import Color from '@/js/colors/color';

export default {
  name: 'ListItem',
  props: {
    Color: Color,
    active: Boolean
  },
  computed: {
    text: {
      get() {
        const c = this.Color;
        let name = c.hex;
        if (c.names.length) name = c.names[0];
        return name;
      }
    },
    colorStyle: {
      get() {
        return {
          'border-color': this.Color.invert.rgb,
          'background-color': this.Color.rgb
        };
      }
    },
    title: {
      get() {
        return `${this.Color.hex}\n ${this.Color.rgba}\n ${this.Color.hsla}`;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  li {
    .list-item {
      display: flex;
      align-items: center;
      height: 40px;
      cursor: pointer;
      transition: all 200ms linear;

      .color {
        display: inline;
        height: 25px;
        width: 50px;
        border: rem-calc(4) double transparent;
      }
      .text {
        display: inline;
        padding: 0.2em .6em;
        text-align: left;
        text-transform: uppercase;
      }

      &:hover {
        background-color: rgba(0,0,0,0.1);
      }

      &.selected {
        background-color: rgba($darkslateblue,0.2);
        outline: 1px solid rgba($darkslateblue, .75);
        &:hover {
          background-color: rgba($darkslateblue,0.3);
        }
      }
    }
  }
</style>

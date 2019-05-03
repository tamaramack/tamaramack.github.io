<template lang="pug">
  div
    Navigation(page="playground")
    .content-size.grid-y.medium-grid-frame
      .cell.shrink.header.medium-cell-block-container
        div.grid-x
          div.cell.auto
            h1.text-left Colors
          div.cell.auto
            div.text-right
              button.button(v-show="color", @click="onShowCards") Show Color Cards

      .cell.medium-auto.medium-cell-block-container
        div.grid-x.grid-padding-x
          div.cell.small-12.medium-4.large-3.cell-block-y
            ul.no-bullet
              li(v-for="item in colors", @click.stop="onSelectColor(item)")
                ListItem(:Color="item", :active="item === color")

          div.cell.small-12.medium-8.large-9.cell-block-y
            transition(name="fade")
              ItemDetails(v-if="color", :Color="color")

            transition(name="fade")
              div.box(v-if="!color")
                ItemCard.inline(v-for="(item, index) in colors", :Color="item",
                  :key="index+item.id", :id="'card'+index+item.id")


</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import Colors from '@/js/colors/colors';
import { Navigation } from '@/components';
import { ListItem, ItemCard, ItemDetails } from './components';

const { mapState, mapGetters } = createNamespacedHelpers('colors');

console.log('Colors');
console.dir(Colors);

const colors = new Colors();

console.dir(colors);
colors.add('#bada55', 'rgb(98, 100, 210)');

const badassDark = (colors.get('#bada55')).darken(0.3);
const badassLight = (colors.get('#bada55')).lighten(0.3);
colors.add(badassDark, badassLight);

export default {
  name: 'Colors',
  title: 'Colors',
  components: {
    ItemCard,
    ItemDetails,
    ListItem,
    Navigation
  },
  data() {
    return {
      colors: colors.colors
    };
  },
  computed: {
    ...mapState([
      'color'
    ])
  },
  methods: {
    onSelectColor(data) {
      this.$store.commit('colors/updateActiveColor', data);
    },
    onShowCards() {
      this.$store.commit('colors/updateActiveColor', null);
    }
  }
};
</script>

<style lang="scss">
  .fade-leave-active {
    transition: opacity 200ms ease-out;
  }
  .fade-enter-active {
    transition: opacity .5s ease-in .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .box {
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .inline {
      display: flex;
      justify-content: center;
      align-items: center;

      height: 100px;
      width: 250px;
      border: rem-calc(8) double transparent;
      border-radius: rem-calc(5);

      span {
        text-transform: uppercase;
      }
    }
  }
</style>

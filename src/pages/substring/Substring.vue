<template lang="pug">
  .substring-container
    Navigation(page="substring")
    .content-size.grid-y.medium-grid-frame
      .cell.shrink.header.medium-cell-block-container
        h1 The Substring Code Challenge

        .grid-x.padding-gutters
          .cell.medium-4.text-left
            .button-group
              button.button(@click="getString") Get String
              button.button(@click="getQueries") Get Queries
              button.button.alert(@click="runScripts") Run Script

          .cell.medium-auto
            div Substring Length {{substring.length}}
            div Query Amt {{queries.length}}

          .cell.medium-4.text-right
            InputGroup(:listModel="showSelectModel", type="checkbox")

      .cell.medium-auto.medium-cell-block-container.text-left
        .grid-x.grid-padding-x

          .cell.medium-2.medium-cell-block-y
            div
              ul.no-bullet(v-if="showR")
                li(v-for="(item, index) in results")
                  div(:title="index") {{item}}

          .cell.medium-10.medium-cell-block-y
            div.wrap-text
              p(v-if="showS") {{substring}}
            div
              ul.no-bullet(v-if="showQ")
                li.display-inline-block(v-for="(item, index) in queries")
                  .label.secondary(:title="'index: ' + index") {{item[0]}}, {{item[1]}}

      .cell.shrink.footer
        .callout.secondary

          .grid-x.grid-margin-x
            .call.medium-2
              h3 Footer
            .cell.auto
</template>

<script>
import { Navigation, FormComponents } from '@/components';
import { InputItems, InputList } from '@/js/models/input';
import params from "./js/data/100.1";
import readTextFile from "./js/get-data";
import countstrings from "./js/substrings";

const { InputGroup } = FormComponents;

readTextFile('5.1');

export default {
  name: 'Substring',
  components: {
    InputGroup,
    Navigation
  },
  data() {
    return {
      r: {},
      s: '',
      q: [],
      show: [],
      showS: false,
      showQ: false,
      showR: false
    };
  },
  computed: {
    showSelectModel() {
      const list = [
        'show_string',
        'show_queries',
        'show_results'
      ].map(type => new InputItems(type));
      return new InputList({
        desc: null,
        group: null,
        key: 'show',
        model: this,
        list: list
      });
    },
    substring: {
      get() {
        return this.s;
      }
    },
    queries: {
      get() {
        return this.q;
      }
    },
    results: {
      get() {
        if (!(this.r && this.r.results)) return [];
        return this.r.results;
      },
      set(update) {
        this.r = update;
      }
    }
  },
  watch: {
    show() {
      this.showQ = (this.show).includes('show_queries');
      this.showS = (this.show).includes('show_string');
      this.showR = (this.show).includes('show_results');
    }
  },
  methods: {
    getString() {
      const sub = params.substring().replace(/[\W]/gm, "");
      // console.info("substring", sub);
      this.s = sub;
    },
    getQueries() {
      let queryArray = params.queries();
      queryArray = queryArray.split("\n");
      // console.debug("queryArray array", queryArray);
      queryArray = queryArray.map(i => i.split(" ").map(p => parseInt(p)));
      // console.debug("queryArray mapped", queryArray);
      this.q = queryArray;
    },
    runScripts() {
      console.log("Start Calculations");
      this.results = countstrings(this.s, this.q);
      console.log("Post Calculations");
    }
  }
};
</script>

<style scoped lang="scss">
  .display-inline-block{
    display: inline-flex;
    padding: .2rem;
  }
.wrap-text {
  word-wrap: break-word;
}
</style>

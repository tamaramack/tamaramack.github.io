<template lang="pug">
  .substring-container
    Navigation(page="substring")
    .content-size.grid-y.medium-grid-frame
      .cell.shrink.header.medium-cell-block-container
        h1 The Substring Code Challenge

        .grid-x.padding-gutters
          .cell.medium-4.text-left
            .button-group
              button.button(@click="getJson") Get JSON
              button.button.alert(@click="runScripts") Run Script

          .cell.medium-auto
            div Substring Length {{substring.length}}
            div Query Amt {{queries.length}}

          .cell.medium-4.text-right
            InputGroup(:listModel="showSelectModel", type="checkbox")

      .cell.medium-auto.medium-cell-block-container.text-left
        .grid-x.grid-padding-x

          .cell.medium-2.medium-cell-block-y
            Dropdown(desc="Choose Length", :options="choices", :model="model", selectedKey="optionSelect")
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
            .cell.auto {{optionSelect}} {{options}}
</template>

<script>
import { Navigation, FormComponents } from '@/components';
import { InputItems, InputList } from '@/js/models/input';
import options from '@/js/data/substr/options.json';
import countstrings from "./js/substrings";

const { Dropdown, InputGroup } = FormComponents;

export default {
  name: 'Substring',
  components: {
    Dropdown,
    InputGroup,
    Navigation
  },
  data() {
    return {
      options,
      json: {},
      output: [],
      r: {},
      s: '',
      q: [],
      show: [],
      showS: false,
      showQ: false,
      showR: false,
      optionSelect: null
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
    },
    choices: {
      get() {
        return this.options.map(opt => ({
          value: opt.replace('.', '_'),
          label: opt
        }));
      }
    },
    model: {
      get() {
        return this;
      }
    }
  },
  watch: {
    show() {
      this.showQ = (this.show).includes('show_queries');
      this.showS = (this.show).includes('show_string');
      this.showR = (this.show).includes('show_results');
    },
    json() {
      const { input, output } = this.json;
      this.s = input.s;
      this.q = input.queries;
      this.output = output;
    }
  },
  methods: {
    async getJson() {
      const name = this.optionSelect.replace('_', '.');
      this.json = await importJson(name);
    },
    runScripts() {
      console.log("Start Calculations");
      this.results = countstrings(this.s, this.q);
      console.log("Post Calculations");
    }
  }
};

async function importJson(name) {
  return import(`@/js/data/substr/${name}.json`);
}

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

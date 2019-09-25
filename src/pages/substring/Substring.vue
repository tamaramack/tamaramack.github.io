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
            Dropdown(desc="Choose Length", :options="choices", :model="model",
              selectedKey="optionSelect")
            div
              ul.no-bullet(v-if="showResults")
                li(v-for="(item, index) in results")
                  div(:title="index") {{item}}

          .cell.medium-10.medium-cell-block-y
            div.wrap-text
              p(v-if="showString") {{substring}}
            div
              ul.no-bullet(v-if="showQueries")
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
import optionsJson from '@/js/data/substr/options.json';
import countSubstrings from './js/map-query-substring';

const { Dropdown, InputGroup } = FormComponents;
const options = optionsJson.sort();

export default {
  name: 'Substring',
  foundation: true,
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
      showString: false,
      showQueries: false,
      showResults: false,
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
        console.debug('Results', update);
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
      this.showQueries = (this.show).includes('show_queries');
      this.showString = (this.show).includes('show_string');
      this.showResults = (this.show).includes('show_results');
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
      console.debug('getJson', name);
      this.json = await importJson(name);
    },
    runScripts() {
      const then = Date.now();
      console.log('Start Calculations', dt(Date.now() - then));
      countSubstrings(this.s, this.q, then).then((data) => {
        this.results = data;
        console.log('Post Calculations', dt(Date.now() - then));
      });
    }
  }
};

async function importJson(name) {
  return import(`@/js/data/substr/${name}.json`);
}

function dt(now) {
  now = new Date(now);
  const t = n => (`0${now[`get${n}`]()}`).slice(-2);
  return `${t('Minutes')}:${t('Seconds')}.${now.getMilliseconds()}`;
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

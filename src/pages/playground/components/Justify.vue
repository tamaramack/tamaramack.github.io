<template lang="pug">
  div
    h2 Justify

    div.grid-x.grid-padding-x
      div.form.cell.small-12.medium-4.large-3.text-left
        div
          label Length
            input(type="number", v-model="count")
        div
          label Sentence
            textarea(v-model="text")
        button.button(@click="onSubmit") Submit

      div.cell.small-12.medium-8.large-9
        div(v-for="(sentence, index) in justified", :key="index")
          p(v-html="sentence")
          hr/
</template>

<script>
import justify from '../js/justify';

let sentences = [
  [null, 0],
  [undefined, 1],
  [1, 2],
  [true, 3],
  ['     word    thus     ', 10],
  ['Is NaN can be a number too?', Number.NaN],
  ['How about null?', null],
  ['Or undefined?', undefined],
  ['No, actual undefined'],
  ['A string can be a number too', '40'],
  ['Hello, my friend!', 40],
  ['The quick brown fox jumps over the lazy dogs.', 60],
  ["Of all the skies I've loved before, you are the only that's blue. and green. sometimes pink...", 135],
  ['Life is like a box of chocolates', 80],
  ['Hello, my friend!', 'Hello, my friend!'.length + 2]
];

export default {
  name: 'Justify',
  data() {
    return {
      sentences,
      text: '',
      count: 0
    };
  },
  computed: {
    justified() {
      const res = [];
      for (let obj of this.sentences) {
        res.push(`${obj[0]} [${obj[1]}]<br/>${justify(...obj)}`);
      }
      return res;
    }
  },
  methods: {
    onSubmit(e) {
      if (this.text.length && this.count) sentences.unshift([this.text, +this.count]);
    }
  }
};
</script>

<style lang="scss" scoped>
  .form {
  }

  pre, p {
    background-color: rgba(0, 0, 0, 0.02);
    border: 1px solid rgba(0, 0, 0, 0.1);
    margin: 0.5rem auto;
  }

  p {
    white-space: pre;
    text-align: center;
  }

</style>

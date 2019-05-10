<template lang="pug">
  div
    h2 Justify

    div.grid-x.grid-padding-x
      div.cell.small-12.medium-4.large-3.text-left
        div
          label Length
            input(type="number", v-model="count")
        div
          label Sentence
            textarea(v-model="text")
        button.button(@click="onSubmit") Submit

      div.cell.small-12.medium-8.large-9
        pre(v-for="(sentence, index) in sentences", :key="index") {{sentence}}
</template>

<script>
import justify from '../js/justify';

const sentences = [];

sentences.push(justify("The quick brown fox jumps over the lazy dogs.", 55),
  justify('Hello, my friend!', 40),
  justify('Of all the skies I\'ve loved before, you are the only one that\'s blue. and green. sometimes pink...', 135));

export default {
  name: 'Justify',
  data() {
    return {
      sentences,
      text: '',
      count: 0
    };
  },
  methods: {
    onSubmit(e) {
      if (this.text.length && this.count)
        sentences.push(justify(this.text, +this.count));
    }
  }
};
</script>

<style lang="scss" scoped>
  .form {
  }

  pre {
    background-color: rgba(0,0,0,0.02);
    border: 1px solid rgba(0,0,0,0.1);
    margin: 0.5rem auto;
  }

</style>

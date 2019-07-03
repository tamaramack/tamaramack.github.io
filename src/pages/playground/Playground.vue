<template lang="pug">
div
  Navigation(page="playground")
  h1 Playground

  div.grid-x.grid-padding-x
    div.cell.small-12.medium-4.large-3.text-left

    div.cell.small-12.medium-8.large-9

</template>

<script>
import { Navigation } from '@/components';

/*
 * Complete the countSubstrings function below.
 */
function countSubstrings(s, queries) {
  class Tree extends Set {
    constructor(s, set) {
      super(set || [...s]);
      this.firstBranch(s);
      this.add(s);
    }

    firstBranch(sub) {
      if (!(sub && sub.length)) return;
      let first = sub.slice(0, -1);
      let second = sub.slice(1);

      if (first
        && first.length
        && !this.has(first)) {
        this.add(first);
        this.firstBranch(first);
      }

      if (second
        && second.length
        && !this.has(second)) {
        this.add(second);
        this.secondBranch(second);
      }
    }

    secondBranch(sub) {
      if (!(sub && sub.length)) return;
      let second = sub.slice(1);

      if (second
        && second.length
        && !this.has(second)) {
        this.add(second);
        this.secondBranch(second);
      }
    }
  }
  const results = new Array(queries.length).fill(null).map(() => 0);
  const subs = new Map();
  queries = map(queries, s);

  console.log('Queries Objects', ...queries.map(v => v[1]));
  for (let i = 0; i < queries.length; i += 1) {
    const q = queries[i];
    results[q[0]] = q[1].c;
  }

  return results;
  function map(queries, str) {
    let mapped = [];
    for (let i = 0; i < queries.length; i += 1) {
      const q = queries[i],
        start = q[0],
        end = q[1] + 1,
        sub = str.slice(start, end);
      mapped[mapped.length] = [i, new QueryObject(start, sub)];
    }

    return mapped.sort((a, b) => a[1].l - b[1].l);
  }
  function QueryObject(start, substring) {
    this.d = distinctString(substring);
    this.i = start;
    this.l = substring.length;
    this.s = substring;
    this.c = 0;

    if (this.d.length === 1) {
      this.c = this.l;
    } else if (this.d.length === this.l) {
      this.c = plusFactor(this.l);
    } else if (this.d.length === 2) {
      let arr = [],
        len = this.l < 5 ? this.l : 5;
      if (this.l < 100 && this.l > 100) len = this.l;

      for (let i = 0; i < len; i += 1) arr = [...arr, ...getSet(this.s, i + 1)];
      this.set = new Set(arr);
      this.c = this.set.size;
      if (this.l >= 100) {
        // do the math
        const halfway = Math.floor(this.l / 2);
        let subs = getSet(this.s, halfway);

        const start = subs.length - 1,
          end = this.l - subs.length + 1,
          diff = end - start,
          fact = plusFactor(start);
        this.c = 2 * fact + halfway * diff;
      }
    } else {
      let arr = [],
        len = this.l < 100 ? this.l : 100;
      for (let i = 0; i < len; i += 1) arr = [...arr, ...getSet(this.s, i + 1)];
      this.set = new Set(arr);

      if (this.l > 3000) {

      } else {
        this.set = new Tree(this.s, this.set);
      }
      this.c = this.set.size;
    }
  }
  function distinctString(str) {
    return [...new Set(str)].join('');
  }
  function plusFactor(count) {
    let n = count;
    let sum = count;
    while (n--) {
      sum += n;
    }
    return sum;
  }
  function getSet(str, num) {
    const finds = [],
      count = num;
    let len = str.length,
      i = 0;
    while (i + count <= len) {
      finds[finds.length] = str.slice(i, i + count);
      i += 1;
    }
    return [...new Set(finds)];
  }
}

export default {
  name: 'playground',
  components: {
    Navigation
  }
};
</script>

<style lang="scss" scoped>
  .form {
  }
</style>

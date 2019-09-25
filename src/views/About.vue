<template lang="pug">
  div.about
    Navigation(page="about")
    .content-size.grid-y.medium-grid-frame
      .cell.shrink.header.medium-cell-block-container
        h1 {{content.frameHeader}}

        .grid-x.padding-gutters
          .cell.medium-4.text-left
            p.callout.primary {{content.grid1[0]}}
          .cell.medium-auto
            p {{content.grid1[1]}}
          .cell.medium-4.text-right
            p.callout.alert {{content.grid1[2]}}

      .cell.medium-auto.medium-cell-block-container.text-left
        .grid-x.grid-padding-x

          .cell.medium-4.medium-cell-block-y
            h2 {{content.frameHeader2}}
            p {{content.grid2[0]}}
            p {{content.grid2[1]}}
            p {{content.grid2[2]}}

          .cell.medium-8.medium-cell-block-y
            h2 {{content.frameHeader3}}
            p {{content.grid3[0]}}
            p {{content.grid3[1]}}
            p {{content.grid3[2]}}
            p {{content.grid3[3]}}
            p {{content.grid3[4]}}

      .cell.shrink.footer
        .callout.secondary
          h3 Footer
</template>

<script>
// @ is an alias to /src
import { Navigation } from '@/components';
import generic from '@/js/data/generic';

export default {
  name: 'about',
  page: {
    title: 'Home'
  },
  foundation: true,
  components: {
    Navigation
  },
  data() {
    return {
      content: generic
    };
  }
};
</script>

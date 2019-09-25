<template lang="pug">
div
  h2 Accordion
  ul.accordion(data-accordion)
    li.accordion-item.is-active(data-accordion-item)
      a.accordion-title(href="#") Accordion 1
      .accordion-content(data-tab-content)
        p Panel 1. Lorem ipsum dolor
        a(href="#") Nowhere to Go
    li.accordion-item(data-accordion-item)
      a.accordion-title(href="#") Accordion 2
      .accordion-content(data-tab-content)
        textarea
        button.button I do Nothing!
    li.accordion-item(data-accordion-item)
      a.accordion-title(href="#") Accordion 3
      .accordion-content(data-tab-content)
        | Type your name!
        input(type="text")

  h2 Accordion Menu
  ul.vertical.menu(data-accordion-menu)
    li
      a(href="#0") Item 1
      ul.menu.vertical.nested.is-active
        li
          a(href="#0") Item 1A
          ul.menu.vertical.nested
            li: a(href="#0") Item 1Ai
            li: a(href="#0") Item 1Aii
            li: a(href="#0") Item 1Aiii
        li: a(href="#0") Item 1B
        li: a(href="#0") Item 1C
    li
      a(href="#0") Item 2
      ul.menu.vertical.nested
        li: a(href="#0") Item 2A
        li: a(href="#0") Item 2B
    li: a(href="#0") Item 3
</template>

<script>
export default {
  name: 'Accordion'
};
</script>

<style lang="scss" scoped>

</style>

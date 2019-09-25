<template lang="pug">
  div
    h2 Abide
    form(data-abide, novalidate)
      div(class="grid-x grid-margin-x")
        div.cell
          div(data-abide-error, class="alert callout" style="display:none")
            p <i class="fi-alert"></i> There are some errors in your form.
      div(class="grid-x grid-margin-x")
        div(class="cell small-12")
          label Number Required
            input(type="text", placeholder="1234", aria-describedby="exampleHelpText",
            required pattern="number")
            span.form-error Yo, you had better fill this out, it's required.
          p.help-text#exampleHelpText Here's how you use this input field!
        div(class="cell small-12")
          label Nothing Required!
            input(type="text", placeholder="Use me, or don't", aria-describedby="exampleHelpTex",
            data-abide-ignore)
          p.help-text#exampleHelpTex This input is ignored by Abide using `data-abide-ignore`
        div(class="cell small-12")
          label Password Required
            input(type="password", placeholder="yeti4preZ", aria-describedby="exampleHelpText2",
            required)
            span.form-error I'm required!
          p.help-text#exampleHelpText2 Enter a password please.
        div(class="cell small-12")
          label Re-enter Password
            input(type="password", placeholder="yeti4preZ", aria-describedby="exampleHelpText3",
            required, pattern="alpha_numeric", data-equalto="password")
            span.form-error Hey, passwords are supposed to match!
          p.help-text#exampleHelpText3 This field is using the `data-equalto="password"`
            | attribute, causing it to match the password field above.
      div(class="grid-x grid-margin-x")
        div(class="cell medium-6")
          label URL Pattern, not required, but throws error if it doesn't match the Regular
            | Expression for a valid URL.
            input(type="text", placeholder="https://foundation.zurb.com", pattern="url")
        div(class="cell medium-6")
          label European Cars, Choose One, it can't be the blank option.
            select#select(required)
              option(value="")
              option(value="volvo") Volvo
              option(value="saab") Saab
              option(value="mercedes") Mercedes
              option(value="audi") Audi
      div(class="grid-x grid-margin-x")
        fieldset(class="cell medium-6")
          legend Choose Your Favorite, and this is required, so you have to pick one.
          input#pokemanRed(type="radio" name="pokemon" value="Red")
          label(for="pokemanRed") Red
          input#pokemanBlue(type="radio" name="pokemon" value="Blue" required)
          label(for="pokemanBlue") Blue
          input#pokemanYellow(type="radio" name="pokemon" value="Yellow")
          label(for="pokemanYellow") Yellow
        fieldset(class="cell medium-6")
          legend Choose Your Favorite - not required, you can leave this one blank.
          input#pocketsRed(type="radio" name="pokemon" value="Red")
          label(for="pocketsRed") Red
          input#pocketsBlue(type="radio" name="pokemon" value="Blue")
          label(for="pocketsBlue") Blue
          input#pocketsYellow(type="radio" name="pokemon" value="Yellow")
          label(for="pocketsYellow") Yellow
        fieldset(class="cell medium-6")
          legend Choose Your Favorite - not required, you can leave this one blank.
          input#checkbox1(type="checkbox")
          label(for="checkbox1") Checkbox 1
          input#checkbox2(type="checkbox" required)
          label(for="checkbox2") Checkbox 2
          input#checkbox3(type="checkbox")
          label(for="checkbox3") Checkbox 3
      div(class="grid-x grid-margin-x")
        fieldset(class="cell medium-6")
          button.button(type="submit" value="Submit") Submit
        fieldset(class="cell medium-6")
          button.button(type="reset" value="Reset") Reset
</template>

<script>
export default {
  name: 'Abide'
};
</script>

<style scoped>

</style>

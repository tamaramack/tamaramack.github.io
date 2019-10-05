<template>
  <div>
    <div class="callout">
      <h5>This is a callout.</h5>
      <p>It has an easy to override visual style, and is appropriately subdued.</p>
      <a href="#0">It's dangerous to go alone, take this.</a>
    </div>

    <div class="callout primary">
      <h5>This is a primary callout.</h5>
      <p>It has an easy to override visual style, and is appropriately subdued.</p>
      <a href="#0">It's dangerous to go alone, take this.</a>
    </div>

    <div class="callout secondary">
      <h5>This is a secondary callout</h5>
      <p>It has an easy to override visual style, and is appropriately subdued.</p>
      <a href="#0">It's dangerous to go alone, take this.</a>
    </div>

    <div class="callout success">
      <h5>This is a success callout</h5>
      <p>It has an easy to override visual style, and is appropriately subdued.</p>
      <a href="#0">It's dangerous to go alone, take this.</a>
    </div>

    <div class="callout warning">
      <h5>This is a warning callout</h5>
      <p>It has an easy to override visual style, and is appropriately subdued.</p>
      <a href="#0">It's dangerous to go alone, take this.</a>
    </div>

    <div class="callout alert">
      <h5>This is an alert callout</h5>
      <p>It has an easy to override visual style, and is appropriately subdued.</p>
      <a href="#0">It's dangerous to go alone, take this.</a>
    </div>

    <div class="callout" data-closable>
      <button class="close-button" aria-label="Close alert" type="button" data-close>
        <span aria-hidden="true">&times;</span>
      </button>
      <p>This is a close button example.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'callout'
};
</script>

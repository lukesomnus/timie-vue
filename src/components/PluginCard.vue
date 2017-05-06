<template>
  <md-card>
    <md-card-media>
      <div class="plugin-img"></div>
    </md-card-media>

    <md-card-header>
      <div class="md-title">{{name}}</div>
      <div class="md-subhead">{{desc}}</div>
    </md-card-header>
  </md-card>
</template>
<script>
  export default {
    name: 'pluginCard',
    props: ['name', 'desc']
  }

</script>
<style>
  .plugin-img {
    height: 150px;
    background: #E57373;
  }

  .md-card {
    width: 100%;
    margin: 0 20px;
  }

</style>

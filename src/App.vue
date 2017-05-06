<template>
  <div id="app">
        <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
@import '~normalize.css';
@import '~vue-material/dist/vue-material.css';
</style>

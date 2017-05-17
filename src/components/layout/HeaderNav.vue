<style lang="stylus" scoped>
    .root
      color #000
</style>

<template>
  <div class="root">
    <div class="nav-item">
      <router-link to="/">Home</router-link>
    </div>
    <div class="nav-item">Plugins</div>
  </div>
</template>

<script>
export default {
  name: 'headerNav',
}
</script>

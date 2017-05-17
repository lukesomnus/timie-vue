<template>
  <md-whiteframe md-elevation="4">
    <div class="header">
      <div class="title">Timie</div>
      <!--<header-nav></header-nav>-->
    </div>
  </md-whiteframe>
</template>
<script>
  import HeaderNav from './HeaderNav'
  export default {
    name: 'Header',
    components: {
      HeaderNav
    }
  }

</script>
<style scoped>
  .header {
    background-color: #000;
    color: #fff;
  }

  .title {
    text-align: center;
    font-size: 40px;
    height: 100px;
    line-height: 100px;
  }

  .nav {
    text-align: right;
  }

  .nav-item {
    display: inline-block;
  }

</style>

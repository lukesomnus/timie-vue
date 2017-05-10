<template>
  <md-whiteframe md-elevation="4">
    <div class="header">
      <div class="title">Timie</div>
      <div class="nav">
        <div class="nav-item">Home</div>
        <div class="nav-item">Plugins</div>
      </div>
    </div>
  </md-whiteframe>
</template>
<script>
  export default {
    name: 'Header'
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
    height: 150px;
    line-height: 150px;
  }

  .nav {
    text-align: right;
  }

  .nav-item {
    display: inline-block;
  }

</style>

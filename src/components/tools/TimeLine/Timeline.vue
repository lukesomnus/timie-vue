<template>
  <div class="timeline">
    <div class="wrapper">
        <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'timeline',
    data() {
      return {

      }
    }
  }

</script>
<style scoped>
  .timeline {
    margin-top: 20px;
    padding-top: 10px;
    position: relative;
    width: 100%;
  }

  .timeline::before {
    content: '';
    position: absolute;
    top: 0;
    width: 4px;
    left: 50%;
    height: 100%;
    margin-left: -2px;
    background-color: #8d94b1;
  }
</style>

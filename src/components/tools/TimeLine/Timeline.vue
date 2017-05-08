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
<style>
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

  .timeline-item {
    position: relative;
    margin-bottom: 40px;
    width: 100%;
  }

  .timeline-item::after {
    clear: both;
    content: '';
    display: table;
  }

  .timeline-item-station {
    position: absolute;
    background-color: #65adb7;
    left: 50%;
    margin-left: -30px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 4px solid #8d94b1;
  }
</style>

<template>
  <div class="timeline-item">
      <div class="timeline-item-station"></div>
    <div class="timeline-item-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'itemlineItem'
  }

</script>
<style scoped>
  .timeline-item-content {
    float: left;
    width: 40%;
    /*background-color: #65adb7;*/
  }

  .timeline-item:nth-child(2n) .timeline-item-content {
    float: right;
  }

  .timeline-item:nth-child(2n) .timeline-item-content::before {
    right: 40%;
    left: inherit;
  }

  .timeline-item-content::before {
    position: absolute;
    content: '';
    left: 40%;
    top: 30px;
    height: 4px;
    width: 10%;
    background-color: #8d94b1;
    margin-top: -2px;
    z-index: 1;
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
    z-index: 100;
    background-color: #65adb7;
    left: 50%;
    margin-left: -30px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 4px solid #8d94b1;
    box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px rgba(0,0,0,.14), 0 1px 10px rgba(0,0,0,.12);
  }

</style>

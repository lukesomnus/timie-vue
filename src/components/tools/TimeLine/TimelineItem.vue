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
<style>
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
    z-index: -1;
  }

</style>

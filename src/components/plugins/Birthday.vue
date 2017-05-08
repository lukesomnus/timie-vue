<template>
  <div class="root">
    <time-line>
      <timeline-item>
        <md-whiteframe md-elevation="4">
          <div class="birthday-card">
            <div class="birthday-card-header">
              <div class="birthday-card-date">2015/6/5</div>
            </div>
            <div class="birthday-card-content">
              <div>
                Voyager 1 launched from Kennedy Space Flight Center, Voyager 1 returns first spacecraft photo of Earth and Moon
              </div>
            </div>
          </div>
        </md-whiteframe>
      </timeline-item>
      <timeline-item>
        <md-whiteframe md-elevation="4">
          <div class="birthday-card">
            <div class="birthday-card-header">
              <div class="birthday-card-date">2015/6/5</div>
            </div>
            <div class="birthday-card-content">
              <div>
                Voyager 1 launched from Kennedy Space Flight Center, Voyager 1 returns first spacecraft photo of Earth and Moon
              </div>
            </div>
          </div>
        </md-whiteframe>
      </timeline-item>
      <timeline-item>
        <md-whiteframe md-elevation="4">
          <div class="birthday-card">
            <div class="birthday-card-header">
              <div class="birthday-card-date">2015/6/5</div>
            </div>
            <div class="birthday-card-content">
              <div>
                Voyager 1 launched from Kennedy Space Flight Center, Voyager 1 returns first spacecraft photo of Earth and Moon
              </div>
            </div>
          </div>
        </md-whiteframe>
      </timeline-item>
    </time-line>
  </div>
</template>
<script>
  import {
    TimeLine,
    TimelineItem
  } from '../tools/TimeLine'
  export default {
    name: 'birthday',
    components: {
      TimeLine,
      TimelineItem
    }
  }

</script>
<style scoped>
  .root {
    margin: 0 100px;
  }


  .birthday-card {
    background-color: #65adb7;
    padding: 20px;
    color: #fff;
  }

  .birthday-card-header {
    margin-bottom: 10px;
  }

  .birthday-card-date {
    font-size: 20px;
    display: inline-block;
    border: 2px solid #fff;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 10px;
  }

</style>

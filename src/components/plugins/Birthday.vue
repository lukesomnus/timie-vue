<template>
  <div class="root">
    <time-line>
      <timeline-item v-for="birthday in birthdays" :key="birthday.id">
        <md-whiteframe md-elevation="4">
          <div class="birthday-card">
            <div class="birthday-card-header">
              <div class="birthday-card-date">{{birthday.birthdayDate}} {{birthday.personName}}</div>
            </div>
            <div class="birthday-card-content">
              <div>
                {{birthday.remark}}
              </div>
            </div>
          </div>
        </md-whiteframe>
      </timeline-item>
      </timeline-item>
    </time-line>
  </div>
</template>
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
<script>
  import {
    TimeLine,
    TimelineItem
  } from '../tools/TimeLine'
  import uuid from 'uuid';
  export default {
    name: 'birthday',
    data() {
      return {
        birthdays: [{
            id: uuid(),
            birthdayDate: '5/11',
            personName: '杨建明',
            remark: '送他一个TT'
          },
          {
            id: uuid(),
            birthdayDate: '12/22',
            personName: '周悦',
            remark: '要买一份很有纪念意义的生日礼物'
          }]
      }
    },
    components: {
      TimeLine,
      TimelineItem
    }
  }

</script>

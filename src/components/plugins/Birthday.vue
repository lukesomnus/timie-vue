<template>
  <div class="root">
    <div class="birthday-header">
      <span class="birthday-header-day">今天</span>
      <span class="birthday-header-date">星期六 5月6日</span>
      <md-button class="md-raised md-primary birthday-add-button" id="addbirthday" @click.native="addbirthday">
        <md-icon>add</md-icon>
      </md-button>
    </div>
    <time-line>
      <timeline-item v-for="birthday in birthdayList" :key="birthday.id" >
        <md-whiteframe md-elevation="4">
          <div class="birthday-card" :class="{birthdayIsNow:nowDate===birthday.birthdayDate}">
            <div class="birthday-card-header">
              <div class="birthday-card-date">{{birthday.birthdayDate}} {{birthday.personName}}</div>
              <div class="birthday-cake" v-show="nowDate===birthday.birthdayDate">
                <img src="../../assets/cake.png" alt="cake">
              </div>
            </div>
            <div class="birthday-card-content">
              <div>
                {{birthday.remark}} {{nowDate}}
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
  padding: 30px 100px;
  background-color: #fff;
}

.birthday-header {
  padding: 10px 20px 20px;
  position: relative;
}

.birthday-header-day {
  font-size: 20px;
  font-weight: bold;
}

.birthday-header-date {
  color: #999;
  padding-left: 6px;
}

.birthday-add-button {
  position: absolute;
  right: 20px;
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
  display: inline-block;
}

.birthday-cake {
  display: inline-block;
  width: 30px;
  margin-left: 10px;
}
.birthdayIsNow{
  background-color: #EF5350 !important;
}
</style>
<script>
import uuid from 'uuid'
import moment from 'moment'
import {
  TimeLine,
  TimelineItem
} from '../tools/TimeLine'

export default {
  name: 'birthday',
  data() {
    return {
      birthdays: [{
        id: uuid(),
        birthdayDate: '06/11',
        personName: '杨建明',
        remark: '送他一个TT'
      },
      {
        id: uuid(),
        birthdayDate: '12/22',
        personName: '周悦',
        remark: '要买一份很有纪念意义的生日礼物'
      },
      {
        id: uuid(),
        birthdayDate: '05/17',
        personName: 'luke',
        remark: '要买一份很有纪念意义的生日礼物'
      }],
      nowDate: moment().format('MM/DD')
    }
  },
  computed: {
    birthdayList() {
      // 排序
      return this.birthdays.sort(compareFunc)

      // 排序规则
      function compareFunc(prev, cur) {
        if (moment(prev.birthdayDate, 'MM/DD').isAfter(moment(cur.birthdayDate, 'MM/DD'))) {
          return 1
        } else {
          return -1
        }
      }
    }
  },
  components: {
    TimeLine,
    TimelineItem
  }
}

</script>

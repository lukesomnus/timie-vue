<template>
  <div class="root">
    <md-layout md-gutter>
      <md-layout>
        <md-input-container>
          <md-input placeholder="计划名称" v-model="rememberContent"></md-input>
        </md-input-container>
      </md-layout>
      <md-layout>
        <div>
          <md-button class="md-primary md-raised" @click.native="addRemeber()">
            <md-icon>add</md-icon>
          </md-button>
        </div>
      </md-layout>
    </md-layout>
    <!--<div>当前时间：{{now}}</div>-->
    <!--<div>
                      今天的任务：{{todayRemember}}
                    </div>
                    <div>
                      明天的任务：{{tomorrowRemember || '无'}}
                    </div>-->
    <!--<div v-for="(value, key) in timeline" :key="key">
          {{key}}:{{value}}
        </div>-->
    <div>
      <md-whiteframe md-elevation="2" class="calendar clearfix">
        <div class="calendar-control">
          <md-button-toggle md-single>
            <md-button class="md-primary md-raised" @click.native="changeMonth('last')">
              <md-icon>navigate_before</md-icon>
            </md-button>
            <md-button class="md-primary md-raised" @click.native="changeMonth('now')">
              <!--<md-icon>today</md-icon>-->
              {{currentMonth+1}}月
            </md-button>
            <md-button class="md-primary md-raised" @click.native="changeMonth('next')">
              <md-icon>navigate_next</md-icon>
            </md-button>
          </md-button-toggle>
          <div>
          </div>
        </div>
        <div class="calendar-header clearfix">
          <div class="day" v-for="(weekday,index) in weekdays">{{weekday}}</div>
        </div>
        <div class="calendar-days">
          <div class="day" v-for="(day,index) in calendar" :key="index" @click="(event)=>{chooseDay(event,timeline[day.date])}">
            <div class="day-number">{{day.value}}</div>
            <!--<div v-if="(index%3)===0">asdasd</div>-->
            <div v-if="timeline[day.date]" class="task-group">
              <div class="task" v-for="item in timeline[day.date]">{{item.rememberContent}}</div>
            </div>
          </div>
        </div>
      </md-whiteframe>
    </div>

  </div>
</template>
<script>
import moment from 'moment';
import uuid from 'uuid/v1';
import local from '@/utils/localStorage'
let {
    saveLocal,
  getLocal,
  removeLocal
  } = local('rememberCurve')
export default {
  name: 'rememberCurve',
  data() {
    return {
      now: moment().format("YYYY-MM-DD"),
      rememberContent: '',
      remembers: [],
      timeline: {},
      todayRemember: '',
      tomorrowRemember: '',
      weekdays: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      currentMonth: moment().month()
    }
  },
  created() {
    this.getRemembers()
  },
  computed: {
    allRemeberDays() {
      const now = moment(this.now)
      const rememberDays = EbbinghausCurve(this.now)
      return rememberDays;
    },
    calendar() {
      const currentMonthMoment = moment().month(this.currentMonth)
      const month = moment().month(this.currentMonth).month() + 1
      const currentMonthDays = moment().month(this.currentMonth).daysInMonth()
      const lastMonthDays = moment().month(this.currentMonth).subtract(1, 'month').daysInMonth()
      const nextMonthDays = moment().month(this.currentMonth).add(1, 'month').daysInMonth()
      const currentDay = + moment().month(this.currentMonth).format('DD')
      const firstDayofCurrentMonthWeekDay = moment().month(this.currentMonth).subtract(currentDay - 1, 'days').weekday()
      const lastDayofCurrentMonthWeekDay = moment().month(this.currentMonth).add(currentMonthDays - currentDay, 'days').weekday()
      const days = []

      for (let i = 1; i <= currentMonthDays; i++) {
        days.push({
          value: i,
          date: moment().month(this.currentMonth).subtract(currentDay - i, 'days').format('YYYY-MM-DD')
        })
      }
      // 当前月的第一天不是周一，需要显示上周的几天
      if (firstDayofCurrentMonthWeekDay > 1) {
        for (let i = 0; i < firstDayofCurrentMonthWeekDay - 1; i++) {
          days.unshift({
            value: lastMonthDays - i,
            date: moment().month(this.currentMonth).subtract(currentDay + i, 'days').format('YYYY-MM-DD')
          })
        }
      }
      if (lastDayofCurrentMonthWeekDay < 7) {
        for (let i = 1; i <= (7 - lastDayofCurrentMonthWeekDay); i++) {
          days.push({
            value: i,
            date: moment().month(this.currentMonth).add(currentMonthDays - currentDay + i, 'days').format('YYYY-MM-DD')
          })
        }
      }
      console.log(moment().days())

      return days
    }
  },
  methods: {
    addRemeber() {
      const now = moment()
      const data = {
        id: uuid(),
        rememberContent: this.rememberContent,
        rememberDays: EbbinghausCurve(now)
      }
      this.remembers.push(data);
      saveLocal({
        remembers: this.remembers
      })
      this.timeline = RemembersMerge(this.remembers)
    },
    getRemembers() {
      const remembers = getLocal().remembers
      if (!remembers) return
      this.remembers = remembers
      this.timeline = RemembersMerge(remembers)
      const today = moment().format("YYYY-MM-DD")
      const tomorrow = moment().add(1, 'days').format("YYYY-MM-DD")
      if (this.timeline[today]) {
        this.todayRemember = this.timeline[today]

        delete this.timeline[today]
        // console.log(this.timeline)
      }
      if (this.timeline[tomorrow]) {
        this.tomorrowRemember = this.timeline[tomorrow]

        delete this.timeline[tomorrow]
      }
    },
    changeMonth(action) {
      switch (action) {
        case 'next':
          this.currentMonth = this.currentMonth + 1
          break
        case 'last':
          this.currentMonth = this.currentMonth - 1
          break
        case 'now':
          this.currentMonth = moment().month()
          break
      }
    },
    chooseDay(event, task) {
      // event.target.className +=' click-day'
      // console.log(event,task)
    }
  }
}
const curveDays = [{
  number: 0,
  type: 'days'
}, {
  number: 2,
  type: 'days'
}, {
  number: 4,
  type: 'days'
}, {
  number: 7,
  type: 'days'
}, {
  number: 15,
  type: 'days'
}, {
  number: 30,
  type: 'days'
}]

function EbbinghausCurve(currentDate) {
  const curveDates = curveDays.map(day => {
    return moment(currentDate).add(day.number, day.type).format("YYYY-MM-DD")
  })
  return curveDates;
}

function RemembersMerge(arr) {
  var timeline = {}
  arr.forEach(remember => {
    let {
        id,
      rememberContent
      } = remember
    remember.rememberDays.forEach(item => {
      const temp = {
        id,
        rememberContent
      }
      timeline[item] = timeline[item] ? [...timeline[item], temp] : [temp]
    })
  })
  return timeline
}

</script>
<style>
.root {
  padding-right: 20px;
}

.calendar {
  background-color: #fff;
  padding: 10px;
}

.clander-days {
  width: 100%;
}

.calendar-control {
  margin-bottom: 20px;
}

.calendar-header {
  border-bottom: 1px solid #aaa;
}

.day {
  width: 14.2857143%;
  float: left;
  display: block;
}

.calendar-header .day {

  /*height: 40px;*/
  text-align: right;
  padding-right: 4px;
}

.calendar-days .day {
  width: 14.2857143%;
  height: 100px;
  overflow: scroll;
  /*overflow-x: hidden;*/
  border-bottom: 1px solid #aaa;
  border-left: 1px solid #aaa;
}

.calendar-days .day::-webkit-scrollbar {
  display: none;
}

.calendar-days .day:nth-child(7n) {
  border-right: 1px solid #aaa;
}

.calendar-days .day:nth-child(7n-1),
.calendar-days .day:nth-child(7n) {
  background-color: #eee;
}

.day-number {
  text-align: right;
  padding: 8px 10px 0;
  width: 100%;
}

.task-group {}

.task {
  background-color: #FFEBEE;
  margin: 0 4px 4px;
  color: #333;
  padding-left: 6px;
}
</style>

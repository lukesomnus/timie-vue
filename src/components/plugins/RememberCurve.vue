<template>
  <div>
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
    <div>当前时间：{{now}}</div>
    <div>
      今天的任务：{{todayRemember}}
    </div>
    <div>
      明天的任务：{{tomorrowRemember || '无'}}
    </div>
    <div v-for="(value, key) in timeline" :key="key">
      {{key}}:{{value}}
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
        timeline: null,
        todayRemember: '',
        tomorrowRemember: ''
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


</style>

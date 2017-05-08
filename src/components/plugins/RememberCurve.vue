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
    <div v-for="(value, key) in timeline" :key="key">
      {{key}}:{{value}}
    </div>
  </div>
</template>
<script>
  import moment from 'moment';
  import uuid from 'uuid/v1';
  import {
    saveLocal,
    getLocal
  } from '@/utils/localStorage'

  export default {
    name: 'rememberCurve',
    data() {
      return {
        now: moment().format("YYYY-MM-DD"),
        rememberContent: '',
        remembers: [],
        timeline: null,
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
        saveLocal('rememberCurve', {
          remembers: this.remembers
        })
        this.timeline = RemembersMerge(this.remembers)
      },
      getRemembers() {
        const remembers = getLocal('rememberCurve').remembers
        if (!remembers) return
        this.remembers = remembers
        this.timeline = RemembersMerge(remembers)
      }
    }
  }


  const curveDays = [{
    number: 1,
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

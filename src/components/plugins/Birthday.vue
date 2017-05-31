<template>
  <div class="root">
    <div class="birthday-header">
      <span class="birthday-header-day">今天</span>
      <span class="birthday-header-date">星期六 5月6日</span>
      <md-button-toggle md-single class="birthday-add-button">
        <md-button class="md-raised md-primary " id="addbirthday" @click.native="openDialog">
          <md-icon>add</md-icon>
        </md-button>
        <md-button class="md-raised md-primary" id="addbirthday" @click.native="toggleRightSidenav">
          <md-icon>settings</md-icon>
        </md-button>
      </md-button-toggle>
    </div>
    <time-line>
      <timeline-item v-for="birthday in birthdayList" :key="birthday.id">
        <md-whiteframe md-elevation="4">
          <div class="birthday-card" :class="{birthdayIsNow:nowDate===birthday.date}">
            <div class="birthday-card-header">
              <div class="birthday-card-date">{{birthday.date}} {{birthday.text}}</div>
              <div class="birthday-cake" v-show="nowDate===birthday.date">
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
    <!--弹框-->
    <md-dialog md-open-from="#addBirthday" md-close-to="#addBirthday" ref="addBirthdayDialog">
      <md-dialog-title>添加书单</md-dialog-title>
      <md-dialog-content>
        <md-input-container>
          <md-input placeholder="姓名" v-model="personName"></md-input>
        </md-input-container>
        <md-input-container>
          <md-input placeholder="时间" v-model="personTime"></md-input>
        </md-input-container>
        <md-input-container>
          <md-input placeholder="备注" v-model="remark"></md-input>
        </md-input-container>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click.native="closeDialog('cancel')">取消</md-button>
        <md-button class="md-primary" @click.native="closeDialog('confirm')">保存</md-button>
      </md-dialog-actions>
    </md-dialog>
    <!--侧边栏-->
    <md-sidenav class="md-right" ref="rightSidenav">
      <md-toolbar>
        <div class="md-toolbar-container">
          <h3 class="md-title">Birthday 设置</h3>
        </div>
      </md-toolbar>
      <div class="setting-container">
        <md-input-container>
          <md-input placeholder="什么时候和ta在一起" v-model="togetherTime"></md-input>
        </md-input-container>
        <md-switch v-model="isShowAnniversary" name="my-test1" class="md-primary">显示纪念日</md-switch>
        <md-switch v-model="isShowFestival" name="my-test1" class="md-primary">显示重要节日</md-switch>
      </div>
      <md-button class="md-raised md-accent" @click.native="saveSetting">保存</md-button>
    </md-sidenav>
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
  right: 40px;
}

.birthday-setting-button {
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

.birthdayIsNow {
  background-color: #EF5350 !important;
}

.md-dialog-container {
  z-index: 1000 !important;
}

.setting-container {
  padding: 10px;
}
</style>
<script>
import uuid from 'uuid'
import moment from 'moment'
import {
  TimeLine,
  TimelineItem
} from '../tools/TimeLine'

// 重要节日
// const importantFestivals=[{
//   id:uuid(),
//   date:moment().month(4).format('MM/DD'),
//   text:'母亲节',
// },
// {
//   id:uuid(),
//   date:moment('061','MMDD').add(13,'days').format('MM/DD'),
//   text:'母亲节',
// }]

// console.log(moment().month(5).format('MM/DD'))

export default {
  name: 'birthday',
  data() {
    return {
      birthdays: [{
        id: uuid(),
        date: '06/11',
        text: '杨建明',
        remark: '送他一个TT'
      },
      {
        id: uuid(),
        date: '12/22',
        text: '周悦',
        remark: '要买一份很有纪念意义的生日礼物'
      },
      {
        id: uuid(),
        date: '05/22',
        text: 'luke',
        remark: '要买一份很有纪念意义的生日礼物'
      }],
      nowDate: moment().format('MM/DD'),
      personName: '',
      personTime: '',
      remark: '',
      isShowAnniversary: true,
      isShowFestival: true,
      togetherTime: ''
    }
  },
  computed: {
    birthdayList() {
      // 排序
      return this.birthdays.concat(importantFestivals).sort(compareFunc)

      // 排序规则
      function compareFunc(prev, cur) {
        if (moment(prev.date, 'MM/DD').isAfter(moment(cur.date, 'MM/DD'))) {
          return 1
        } else {
          return -1
        }
      }
    }
  },
  methods: {
    openDialog() {
      this.$refs.addBirthdayDialog.open()
    },
    closeDialog() {
      this.$refs.addBirthdayDialog.close()
    },
    toggleRightSidenav() {
      this.$refs.rightSidenav.toggle();
    },
    saveSetting() {

      this.$refs.rightSidenav.close();
    },
  },
  components: {
    TimeLine,
    TimelineItem
  }
}
</script>

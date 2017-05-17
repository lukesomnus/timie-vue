<template>
  <div>
    <md-whiteframe md-elevation="4" class="container">
      <div class="header">
        <!--<md-icon class="setting">add</md-icon>-->
        <md-icon class="setting" @click.native="toggleRightSidenav">settings</md-icon>
        <div class="header-tip">{{isWorkTime?tipWorkText:tipRestText}}</div>
      </div>
      <div class="task-area">
        <div>{{taskName}}</div>
      </div>
      <div class="time-area">
        <div class="time-item" v-for="(word,index) in toMinutsText" :key="index">{{word}}</div>
      </div>
      <div class="control-area">
        <md-layout md-gutter class="control-play">
          <md-layout md-flex="33">
            <md-button class="md-icon-button md-primary">
              <md-icon class="md-accent" @click.native="stopTomato">stop</md-icon>
            </md-button>
          </md-layout>
          <md-layout>
            <md-button class="md-fab" @click.native="toggleTomato">
              <md-icon v-show="isPause">play_arrow</md-icon>
              <md-icon v-show="!isPause">pause</md-icon>
            </md-button>
          </md-layout>
          <md-layout md-flex="33">
            <md-button class="md-icon-button md-primary">
              <md-icon class="md-accent" @click.native="nextTomato">skip_next</md-icon>
            </md-button>
          </md-layout>
        </md-layout>
      </div>
    </md-whiteframe>

    <!--设置窗口-->
    <md-sidenav class="md-right" ref="rightSidenav">
      <md-toolbar>
        <div class="md-toolbar-container">
          <h3 class="md-title">番茄时钟设置</h3>
        </div>
      </md-toolbar>
      <div class="setting-container">
        <div class="setting-focus-time">
          <md-input-container>
            <label>专注时间(分钟)</label>
            <md-input placeholder="设置专注时间" v-model.trim="settingFocusTime"></md-input>
          </md-input-container>
        </div>
        <div class="setting-rest-time">
          <md-input-container>
            <label>休息时间(分钟)</label>
            <md-input placeholder="设置休息时间" v-model.trim="settingRestTime"></md-input>
          </md-input-container>
        </div>
      </div>
      <md-button class="md-raised md-accent" @click.native="saveSetting">保存</md-button>
    </md-sidenav>
  </div>
</template>
<script>
var countTimer;
export default {
  name: 'tomato',
  data() {
    return {
      workTime: 1500,
      restTime: 360,
      isWorkTime: true,
      isPause: true,
      tomatoTime: 1500,
      tipWorkText: 'Tomato Work Time',
      tipRestText: 'Tomato Rest Time',
      taskName: '',
      settingFocusTime: 25, //minutes
      settingRestTime: 5,
    }
  },
  created() {
    const { from, taskName } = this.$route.query
    this.taskName = taskName || ''
    switch (from) {
      case 'todo':
        // todo 的特性
        break;
    }
  },
  computed: {
    toMinutsText() {
      let minutes = `${Math.floor(this.tomatoTime / 60)}`;
      let seconds = `${this.tomatoTime % 60}`;
      minutes = minutes.length === 1 ? `0${minutes}` : minutes;
      seconds = seconds.length === 1 ? `0${seconds}` : seconds;
      var result = `${minutes}:${seconds}`
      return [...result];
    }
  },
  methods: {
    toggleTomato() {

      if (!this.isPause) {
        clearTimeout(countTimer)
      } else {
        var countTime = () => {
          this.tomatoTime -= 1
          countTimer = setTimeout(countTime, 1000)
        }
        countTime()
      }
      this.isPause = !this.isPause
    },
    nextTomato() {
      this.isWorkTime = !this.isWorkTime
      this.tomatoTime = this.isWorkTime ? this.workTime : this.restTime
      this.isPause = false
      this.toggleTomato();
    },
    stopTomato() {
      this.tomatoTime = this.isWorkTime ? this.workTime : this.restTime
      this.isPause = true
      clearTimeout(countTimer)
    },
    toggleRightSidenav() {
      this.$refs.rightSidenav.toggle();
    },
    saveSetting() {
      this.tomatoTime = this.settingFocusTime * 60
      this.restTime = this.settingRestTime * 60
      this.$refs.rightSidenav.close();
    },
  }
}

</script>

<style scoped>
.container {
  height: 400px;
  width: 300px;
  margin: 20px auto;
  padding-top: 10px;
  background-color: #fff;
}

.header {
  text-align: center;
  height: 30px;
  line-height: 30px;
  font-size: 20px;
  position: relative;
  color: #EF5350;
}

.header-tip {}

.setting {
  position: absolute;
  right: 10px;
  cursor: pointer;
}

.list {
  position: absolute;
  right: 10px;
}

.task-area {
  height: 40px;
  font-size: 20px;
  text-align: center;
  padding-top: 30px;
  color: #F44336;
}

.time-area {
  margin-top: 100px;
  text-align: center;
  font-size: 50px;
  display: flex;
  padding: 0 18%;
}

.time-item {
  flex: 1;
}

.control-area {
  margin-top: 100px;
}

.control-play .md-fab {
  margin: 0 auto;
}

.control-play .md-button {
  margin: auto auto;
}

.setting-container {
  padding: 10px 10px 0;
}
</style>

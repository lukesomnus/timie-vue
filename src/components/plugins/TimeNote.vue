<template>
  <!--<md-whiteframe md-elevation="4" >-->
  <div class="container">
    <div class="timenote-header">
      <span class="timenote-header-day">今天</span>
      <span class="timenote-header-date">星期六 5月6日</span>
      <md-button class="md-raised md-accent timenote-setting" @click.native="toggleRightSidenav">
        设置
      </md-button>
    </div>
    <!--添加时间记录-->
    <md-whiteframe md-elevation="2">
      <div class="input-area">
        <md-layout md-gutter>
          <md-layout md-column md-gutter>
            <md-layout md-gutter>
              <md-layout>
                <md-input-container>
                  <md-input placeholder="添加任务" v-model.trim="thingContentInputVal"></md-input>
                </md-input-container>
              </md-layout>
              <md-layout md-flex="30" class="use-time">
                <md-input-container :class="{'md-input-invalid':isTimeInputErrorMsg}">
                  <md-input type="number" placeholder="用时（h）" v-model.trim="thingTimeInputVal"></md-input>
                  <span class="md-error" v-show="isTimeInputErrorMsg">一天只有24小时哦！</span>
                </md-input-container>
              </md-layout>
            </md-layout>
            <md-layout>
              <div>
                <md-radio v-for="tag in tags" :key="tag.id" :id="tag.id" v-model="thingUsage" class="md-primary" name="thingTag" :md-value="tag.text">
                  {{tag.text}}
                </md-radio>
              </div>
            </md-layout>
          </md-layout>
          <md-layout md-column md-gutter md-flex="20">
            <!--<md-layout>-->
            <md-button class="md-raised md-primary add-btn" @click.native="addTimenote" :disabled="thingContentInputVal.length===0">
              <md-icon>add</md-icon>
            </md-button>
            <!--</md-layout>-->
          </md-layout>
        </md-layout>
      </div>
    </md-whiteframe>
    <div class="timenote-group" v-show="timenotes.length>0">
      <md-table-card>
        <md-table>
          <md-table-header>
            <md-table-row>
              <md-table-head>事件名称</md-table-head>
              <md-table-head>用时</md-table-head>
              <md-table-head>用途</md-table-head>
              <!--<md-table-head md-numeric>Carbs (g)</md-table-head>-->
              <!--<md-table-head md-numeric>Protein (g)</md-table-head>-->
            </md-table-row>
          </md-table-header>
          <md-table-body>
            <md-table-row v-for="timenote in timenotes" :key="timenote.id">
              <md-table-cell>{{timenote.text}}</md-table-cell>
              <md-table-cell>{{timenote.time}}</md-table-cell>
              <md-table-cell>{{timenote.usage}}</md-table-cell>
            </md-table-row>
            <!--<md-table-row>
              <md-table-cell colspan="3" class="time-sum-up">
                <span>总用时：{{totalTime}}</span>
                <span>工作:{{computeTime('work')}}</span>
                <span>学习:{{computeTime('study')}}</span>
                <span>娱乐:{{computeTime('enjoyment')}}</span>
                <span>休息:{{computeTime('rest')}}</span>
              </md-table-cell>
            </md-table-row>-->
          </md-table-body>
        </md-table>
      </md-table-card>

      <div class="timenote-item" v-for="timenote in timenotes" :key="timenote.id" @mouseover="selectedOne=timenote.id" @mouseout="selectedOne=''">
        <!--<md-icon class="timenote-delete" @click.native="removeTimenote(timenote.id)" v-show="selectedOne==timenote.id">delete</md-icon>-->
      </div>
    </div>
    <!--图表-->
    <md-whiteframe md-elevation="2" class="timenote-chart" v-show="timenotes.length>0">
      <!--<div class="time-piechart" id="main" ref="timenoteChart"></div>-->
      <pie-chart :data="pieData" title="一天的总结"></pie-chart>
    </md-whiteframe>
    <!--<div class="timenote-add-tip tip-task" @click="showTimenoteInput" v-show="!isShowTimenoteInput">
      <md-icon class="md-accent">add</md-icon>
      <span>添加任务</span>
    </div>-->

    <!--设置窗口-->
    <md-sidenav class="md-right" ref="rightSidenav" @open="open('Right')" @close="close('Right')">
      <md-toolbar>
        <div class="md-toolbar-container">
          <h3 class="md-title">Time Note 设置</h3>
        </div>
      </md-toolbar>
      <div class="setting-container">
        <div class="setting-add-tag">
          <md-input-container>
            <md-input placeholder="添加标签,按回车确定" v-model.trim="newTagVal" @keyup.enter.native="addTag"></md-input>
          </md-input-container>
          <div class="setting-tag-list">
            <span v-for="tag in tags" :key="tag.id" class="setting-tag-item" @click="removeTag(tag.id)">{{tag.text}}</span>
          </div>
        </div>
      </div>
      <md-button class="md-raised md-accent" @click.native="closeRightSidenav">Close</md-button>
    </md-sidenav>
  </div>
  <!--</md-whiteframe>-->

</template>
<script>
  import uuid from 'uuid/v1';
  import PieChart from '@/components/tools/Echarts/Pie'
  import local from '@/utils/localStorage'
  let {
    saveLocal,
    getLocal,
    removeLocal
  } = local('timenotes')
  export default {
    name: 'timenote',
    data() {
      return {
        isShowTimenoteInput: false,
        thingUsage: "工作",
        timenotes: [],
        thingContentInputVal: '',
        thingTimeInputVal: '',
        selectedOne: '',
        isTimeInputErrorMsg: false,
        tags: [{
            id: uuid(),
            text: '工作'
          },
          {
            id: uuid(),
            text: '学习'
          },
          {
            id: uuid(),
            text: '运动'
          },
          {
            id: uuid(),
            text: '休息'
          },
        ],
        newTagVal: '',
      }
    },
    created() {
      this.timenotes = this.getTimenotes() && this.getTimenotes()
      this.tags = this.getTags() && this.getTags()
    },
    computed: {
      totalTime() {
        let totalTime = 0;
        this.timenotes.forEach(note => totalTime += parseInt(note.time))
        return totalTime + 'h'
      },
      pieData() {
        const data = this.timenotes.map(note => {
          return {
            value: parseInt(note.time) / 24,
            name: note.text
          }
        })
        return data
      }
    },
    methods: {
      showTimenoteInput() {
        this.isShowTimenoteInput = true;
      },
      addTimenote() {
        const id = uuid()
        const newTimenote = {
          id,
          text: this.thingContentInputVal,
          time: this.thingTimeInputVal,
          usage: this.thingUsage
        }
        this.timenotes.push(newTimenote);
        this.saveTimenotes()
      },
      removeTimenote(id) {
        this.timenotes = this.timenotes.filter(timenote => timenote.id !== id)
        this.saveTimenotes();
      },
      editTimenote() {

      },
      completeTimenote(id, isCompleted) {
        if (!isCompleted) {
          this.timenotes = this.timenotes.map((timenote) => {
            if (timenote.id === id) timenote.isCompleted = true
            return timenote
          })
          this.saveTimenotes()
        }
      },
      getTimenotes() {
        const timenotes = getLocal() && getLocal().timenotes || []
        return timenotes
      },

      saveTimenotes() {
        removeLocal()
        console.log(this.tags)
        saveLocal({
          timenotes: this.timenotes,
          tags: this.tags
        });
      },
      computeTime(type) {
        let totalTime = 0;
        this.timenotes.forEach(note => note.usage === type && (totalTime += parseInt(note.time)))
        return totalTime + 'h'
      },
      getTags() {
        const tags = getLocal() && getLocal().tags || []
        return tags
      },
      addTag() {
        const newTag = {
          id: uuid(),
          text: this.newTagVal
        }
        this.tags.push(newTag)
        this.saveTimenotes()
      },
      removeTag(id) {
        const filterTag = this.tags.filter(tag => tag.id !== id)
        this.tags = [...filterTag]
        this.saveTimenotes()
      },
      toggleRightSidenav() {
        this.$refs.rightSidenav.toggle();
      },
      closeRightSidenav() {
        this.$refs.rightSidenav.close();
      },
      open(ref) {
        console.log('Opened: ' + ref);
      },
      close(ref) {
        console.log('Closed: ' + ref);
      }
    },
    watch: {
      thingTimeInputVal(newVal) {
        console.log(this.isTimeInputErrorMsg )
        if (!newVal) return
        if (newVal > 24) {
          this.thingTimeInputVal = ''
          this.isTimeInputErrorMsg = true
        } else {
          this.isTimeInputErrorMsg = false
        }
      }
    },
    components: {
      PieChart
    }
  }

</script>
<style scoped>
  .container {
    padding: 40px 5%;
    width: 100%;
  }

  .timenote-header {
    margin-bottom: 30px;
    position: relative;
  }

  .timenote-header-day,
  .timenote-header-location {
    font-size: 20px;
    font-weight: bold;
  }

  .timenote-header-date {
    color: #999;
    padding-left: 6px;
  }

  .timenote-setting {
    position: absolute;
    right: 20px;
    top: 0;
  }

  .tip-task {
    height: 24px;
    line-height: 24px;
    color: #e91e63;
  }

  .input-area {
    padding: 20px;
    background-color: #fff;
    margin-bottom: 20px;
  }

  .md-input-container {
    margin-bottom: 0;
  }

  .timenote-group {
    font-size: 20px;
    margin-bottom: 20px;
  }

  li {
    list-style: none;
  }

  .timenote-item {
    position: relative;
  }

  .md-icon.timenote-delete {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 16px;
    min-width: 16px;
    height: 16px;
    min-height: 16px;
    font-size: 16px;
    color: #e91e63;
    cursor: pointer;
  }

  .add-btn {
    margin: 40px 0 0 40px;
    width: 40px;
  }

  .use-time {
    margin-left: 20px;
  }

  .time-sum-up {
    text-align: center;
  }

  .setting-container {
    padding: 0 10px;
  }

  .setting-tag-list {
    margin: 10px 0;
  }

  .setting-tag-item {
    display: inline-block;
    box-sizing: border-box;
    padding: 4px 10px;
    margin-right: 4px;
    margin-bottom: 4px;
    border: 1px solid #ddd;
    cursor: pointer;
  }

  .timenote-chart {
    background-color: #fff;
    width: 100%;
    text-align: center;
    padding: 0 auto;
  }

  .time-piechart {
    z-index: 100;
    width: 100%;
    height: 400px;
    width: 1000px;
  }

</style>

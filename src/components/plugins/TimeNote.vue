<template>
  <!--<md-whiteframe md-elevation="4" >-->
  <div class="container">
    <div class="timenote-header">
      <md-layout md-gutter>
        <md-layout md-flex="20">
          <span class="timenote-header-day">星期{{noteWeekday}}</span>
          <span class="timenote-header-date"> {{noteDate}}</span>
        </md-layout>
        <md-layout>
          <md-button-toggle md-single>
            <md-button class="md-primary md-raised" @click.native="chooseDate('yesterday')">
              昨天
            </md-button>
            <md-button class="md-primary md-raised" @click.native="chooseDate('today')">
              今天
            </md-button>
            <date-picker :date="noteChooseDate" @change="dateChange">
              <md-button class="md-primary md-raised" :style="{margin:0,padding:0,minHeight:'40px'}">
                自定义
              </md-button>
            </date-picker>
          </md-button-toggle>
        </md-layout>
      </md-layout>

      <md-button class="md-raised md-accent timenote-setting" @click.native="toggleRightSidenav">
        设置
      </md-button>
    </div>
    <!--添加时间记录-->
    <md-whiteframe md-elevation="2">
      <div class="input-area">
        <md-layout md-gutter>
          <!--<md-layout md-column md-gutter>-->
          <md-layout md-gutter>
            <md-layout md-flex="40">
              <md-input-container>
                <md-input placeholder="添加事件" v-model.trim="thingContentInputVal"></md-input>
              </md-input-container>
            </md-layout>
            <md-layout md-flex="20" class="use-time">
              <md-input-container :class="{'md-input-invalid':isTimeInputErrorMsg}">
                <md-input type="number" placeholder="用时（h）" v-model.trim="thingTimeInputVal"></md-input>
                <span class="md-error" v-show="isTimeInputErrorMsg">一天只有24小时哦！</span>
              </md-input-container>
            </md-layout>
            <md-layout md-flex="15">
              <md-input-container>
                <label for="movie">标签</label>
                <md-select name="movie" id="movie" v-model="tag">
                  <md-option v-for="tag in tags" :key="tag.id" :value="tag.text">{{tag.text}}</md-option>
                </md-select>
              </md-input-container>
            </md-layout>
            <md-layout md-flex="15">
              <md-input-container>
                <label for="movie">子标签</label>
                <md-select name="movie" id="movie" v-model="childTag" :disabled="childTags.length===0">
                  <md-option v-for="childTag in childTags" :key="childTag.id" :value="childTag.text">{{childTag.text}}</md-option>
                </md-select>
              </md-input-container>
            </md-layout>
            <md-layout md-flex="10">
              <md-button class="md-raised md-primary add-btn" @click.native="addTimenote" :disabled="thingContentInputVal.length===0">
                <md-icon>add</md-icon>
              </md-button>
            </md-layout>
          </md-layout>
          <!--<md-layout>
                                      <div>
                                        <md-radio :id="tag.id" v-model="thingtag" class="md-primary" name="thingTag" :md-value="tag.text">
                                          {{tag.text}}
                                        </md-radio>
                                      </div>
                                    </md-layout>-->
          <!--</md-layout>-->

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
              <md-table-head>标签</md-table-head>
              <!--<md-table-head md-numeric>Carbs (g)</md-table-head>-->
              <!--<md-table-head md-numeric>Protein (g)</md-table-head>-->
            </md-table-row>
          </md-table-header>
          <md-table-body>
            <md-table-row v-for="timenote in timenotes" :key="timenote.id">
              <md-table-cell>{{timenote.text}}</md-table-cell>
              <md-table-cell>{{timenote.time}}</md-table-cell>
              <md-table-cell>{{timenote.tag}} -- {{timenote.childTag}}</md-table-cell>
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
      <pie-chart :option="chartOption"></pie-chart>
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
            <span v-for="tag in tags" :key="tag.id" class="setting-tag-item" @click="chooseParentTag(tag)" @mouseover="hoverTagOne=tag.id" @mouseout="hoverTagOne=''">
              <span class="delete-tag" v-show="hoverTagOne===tag.id" @click="removeTag(tag.id)">x</span>
              {{tag.text}}
            </span>
          </div>
        </div>
        <div class="setting-add-tag">
          <md-input-container>
            <md-input :placeholder="'添加'+selectedParentTag.text+'子标签,按回车确定'" v-model.trim="newChildTagVal" @keyup.enter.native="addChildTag"></md-input>
          </md-input-container>
          <div class="setting-tag-list">
            <span v-for="childTag in childTags" :key="childTag.id" class="setting-tag-item" @click="removeChildTag(childTag.id)">{{childTag.text}}</span>
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
import moment from 'moment';
import PieChart from '@/components/tools/Echarts/Pie'
import myDatepicker from 'vue-datepicker/vue-datepicker-es6'
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
      tag: '',
      childTag: '',
      timenotes: [],
      thingContentInputVal: '',
      thingTimeInputVal: '',
      selectedOne: '',
      selectedParentTag: {
        text: ''
      },
      hoverTagOne: '',
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
      }],
      childTags: [],
      newTagVal: '',
      newChildTagVal: '',
      noteChooseDate: {
        time: moment().format('YYYY-mm-dd')
      },
      noteWeekday: '',
      noteDate: ''
    }
  },
  created() {
    this.timenotes = this.getTimenotes() && this.getTimenotes()
    this.tags = this.getTags().length && this.getTags() || this.tags
    this.noteWeekday = moment().weekday()
    this.noteDate = moment().format('YYYY年MM月DD日')
  },
  computed: {
    totalTime() {
      let totalTime = 0;
      this.timenotes.forEach(note => totalTime += parseInt(note.time))
      return totalTime + 'h'
    },
    chartOption() {
      let totalTime = 0;
      let otherTime = {}
      const innerData = []
      const outData = this.timenotes.map(note => {
        totalTime += +note.time
        return {
          value: +note.time,
          name: note.text
        }
      })

      otherTime = computeTagTime(this.timenotes, 'tag')

       for (let key in otherTime) {
        innerData.push({
          value: otherTime[key],
          name: key
        })
      }

      if (totalTime < 24) {
        console.log(totalTime)
        outData.push({
          value: 24 - totalTime,
          name: '其他'
        })

         innerData.push({
          value: 24 - totalTime,
          name: '其他'
        })
      }




      const option = {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c}小时 ({d}%)"
        },
        // legend: {
        //   orient: 'vertical',
        //   x: 'left',
        //   data: ['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他']
        // },
        series: [
          {
            name: 'TimeNote',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '50%'],

            label: {
              normal: {
                position: 'inner'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: innerData
          },
          {
            name: '访问来源',
            type: 'pie',
            radius: ['60%', '75%'],

            data: outData
          }
        ]
      };
      return option
    },

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
        tag: this.tag,
        childTag: this.childTag
      }
      this.thingContentInputVal = ''
      this.thingTimeInputVal = ''
      this.tag = ''
      this.childTag = ''
      this.timenotes.push(newTimenote);
      this.saveTimenotes()
    },
    removeTimenote(id) {
      this.timenotes = this.timenotes.filter(timenote => timenote.id !== id)
      this.saveTimenotes();
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
      this.timenotes.forEach(note => note.tag === type && (totalTime += parseInt(note.time)))
      return totalTime + 'h'
    },
    getTags() {
      const tags = getLocal() && getLocal().tags || []
      return tags
    },
    addTag() {
      const newTag = {
        id: uuid(),
        text: this.newTagVal,
        children: []
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
    },
    dateChange(date) {
      const format = moment(date, 'YYYY-MM-DD')
      this.noteWeekday = format.weekday()
      this.noteDate = format.format('YYYY年MM月DD日')
    },
    chooseDate(day){
      let format
      switch(day){
        case 'yesterday':
         format= moment().subtract(1,'days')
        this.noteWeekday = format.weekday()
        this.noteDate = format.format('YYYY年MM月DD日')
        break;
        case 'today':
        format = moment()
        this.noteWeekday = format.weekday()
        this.noteDate = format.format('YYYY年MM月DD日')
        break;
      }
    },
    chooseParentTag(tag) {
      this.selectedParentTag = tag
      this.newChildTagVal = ''
      this.childTags = tag.children || []
    },
    addChildTag() {
      this.tags.forEach(tag => {
        if (tag.id == this.selectedParentTag.id) {
          if (!tag.children) tag.children = []
          tag.children.push({
            text: this.newChildTagVal,
            id: uuid()
          })
          this.childTags = [...tag.children]
        }
      })
      this.saveTimenotes()
    },
    removeChildTag(tagId) {
      this.tags.forEach(tag => {
        if (tag.id == this.selectedParentTag.id) {
          this.childTags = this.childTags.filter(childTag => childTag.id !== tagId)
          tag.children = [...this.childTags]
        }
      })
      this.saveTimenotes()
    }
  },
  watch: {
    thingTimeInputVal(newVal) {
      console.log(this.isTimeInputErrorMsg)
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
    PieChart,
    'date-picker': myDatepicker
  }
}

function computeTagTime(data, key) {
  let tag = {}
  data.forEach(item => {
    if (!tag[item[key]]) {
      tag[item[key]] = +item.time
    } else {
      tag[item[key]] += +item.time
    }
  })
  return tag
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
  height: 40px;
  line-height: 40px;
}

.timenote-header-day,
.timenote-header-location {
  font-size: 20px;
  font-weight: bold;
}

.timenote-header-date {
  color: #999;
  padding-left: 16px;
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
  /*margin: 40px 0 0 40px;*/
  width: 40px;
}

.use-time {
  padding-left: 20px;
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
  position: relative;
}

.delete-tag {
  position: absolute;
  top: -6px;
  right: 1px;
  color: red;
  font-size: 10px;
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

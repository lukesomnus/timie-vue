<template>
  <!--<md-whiteframe md-elevation="4" >-->
  <div class="timenote-container">
    <div class="timenote-header">
      <span class="timenote-header-day">今天</span>
      <span class="timenote-header-date">星期六 5月6日</span>
    </div>
    <div class="timenote-group" v-show="timenotes.length>0">
      <!--<md-table-card>-->
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
          <md-table-row>
            <md-table-cell colspan="3" class="time-sum-up">
              <span>总用时：{{totalTime}}</span>
              <span>工作:{{computeTime('work')}}</span>
              <span>学习:{{computeTime('study')}}</span>
              <span>娱乐:{{computeTime('enjoyment')}}</span>
               <span>休息:{{computeTime('rest')}}</span>
            </md-table-cell>
          </md-table-row>
        </md-table-body>
      </md-table>
      <!--</md-table-card>-->

      <div class="timenote-item" v-for="timenote in timenotes" :key="timenote.id" @mouseover="selectedOne=timenote.id" @mouseout="selectedOne=''">
        <!--<md-icon class="timenote-delete" @click.native="removeTimenote(timenote.id)" v-show="selectedOne==timenote.id">delete</md-icon>-->
      </div>
    </div>
    <div class="timenote-add-tip tip-task" @click="showTimenoteInput" v-show="!isShowTimenoteInput">
      <md-icon class="md-accent">add</md-icon>
      <span>添加任务</span>
    </div>
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
              <md-input-container>
                <md-input type="number" placeholder="用时（h）" v-model.trim="thingTimeInputVal"></md-input>
                <!--<span class="md-error">Validation message</span>-->
              </md-input-container>
            </md-layout>
          </md-layout>
          <md-layout>
            <div>
              <md-radio v-model="thingUsage" class="md-primary" name="my-test-group1" md-value="work">工作</md-radio>
              <md-radio v-model="thingUsage" class="md-primary" name="my-test-group1" md-value="study">学习</md-radio>
              <md-radio v-model="thingUsage" class="md-primary" name="my-test-group1" md-value="enjoyment">娱乐</md-radio>
              <md-radio v-model="thingUsage" class="md-primary" name="my-test-group1" md-value="rest">休息</md-radio>
            </div>
          </md-layout>
        </md-layout>
        <md-layout md-column md-gutter md-flex="20">
          <md-layout>
            <md-button class="md-icon-button md-raised md-primary add-btn" @click.native="addTimenote" :disabled="thingContentInputVal.length===0">
              <md-icon>add</md-icon>
            </md-button>
          </md-layout>
        </md-layout>
      </md-layout>
    </div>
  </div>
  <!--</md-whiteframe>-->

</template>
<script>
  import uuid from 'uuid/v1';
  import {
    saveLocal,
    getLocal
  } from '@/utils/localStorage'
  export default {
    name: 'timenote',
    data() {
      return {
        isShowTimenoteInput: false,
        thingUsage: "work",
        timenotes: [],
        thingContentInputVal: '',
        thingTimeInputVal: '',
        selectedOne: '',
        // thingTypes:['']
      }
    },
    created() {
      this.timenotes = this.getTimenotes() && this.getTimenotes()
    },
    computed: {
      totalTime() {
        let totalTime = 0;
        this.timenotes.forEach(note => totalTime += parseInt(note.time))
        return totalTime + 'h'
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
        const timenotes = getLocal('timenotes') && getLocal('timenotes').timenotes || []
        return timenotes
      },
      saveTimenotes() {
        saveLocal('timenotes', {
          timenotes: this.timenotes
        });
      },
      showSetting() {

      },
      computeTime(type) {
        let totalTime = 0;
        this.timenotes.forEach(note => note.usage === type && (totalTime += parseInt(note.time)))
        return totalTime + 'h'
      }
    }
  }

</script>
<style scoped>
  .timenote-container {
    /*margin: 40px 20%;*/
    width: 100%;
  }

  .timenote-header {
    margin-bottom: 10px;
  }

  .timenote-header-day {
    font-size: 20px;
    font-weight: bold;
  }

  .timenote-header-date {
    color: #999;
    padding-left: 6px;
  }

  .tip-task {
    height: 24px;
    line-height: 24px;
    color: #e91e63;
  }

  .input-area {
    /*padding: 20px 12% 0;*/
  }

  .md-input-container {
    margin-bottom: 0;
  }

  .timenote-group {
    font-size: 20px;
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
    margin: 40px 0 0 20px;
  }

  .use-time {
    margin-left: 20px;
  }

  .time-sum-up {
    text-align: center;
  }

</style>

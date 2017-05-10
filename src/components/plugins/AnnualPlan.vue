<template>
  <div class="container">
    <div class="header">
    </div>
    <div class="form-area">
      <md-layout md-gutter>
        <md-layout>
          <md-input-container>
            <md-input placeholder="计划名称" v-model="planContent"></md-input>
          </md-input-container>
        </md-layout>
        <md-layout>
          <md-input-container>
            <md-input placeholder="计划周期" v-model="planDuration"></md-input>
            <!--<date-picker :date="startTime"></date-picker>-->
          </md-input-container>
        </md-layout>
        <md-layout>
          <md-input-container>
            <md-input placeholder="截止日期" v-model="planDeadline"></md-input>
          </md-input-container>
        </md-layout>
        <md-layout>
          <div>
            <md-button class="md-primary md-raised" @click.native="addPlan">
              <md-icon>add</md-icon>
            </md-button>
          </div>
        </md-layout>
      </md-layout>

    </div>
    <div class="main">
      <md-layout md-gutter class="plan-header">
        <md-layout md-flex="25">计划名称</md-layout>
        <md-layout md-flex="25">计划周期</md-layout>
        <md-layout md-flex="25">截止日期</md-layout>
        <md-layout md-flex="25">完成比例</md-layout>
      </md-layout>
      <md-layout md-gutter v-for="(plan,index) in plans" :key="index" class="plan-item">
        <md-layout md-flex="25" class="plan-item">{{plan.content}}</md-layout>
        <md-layout md-flex="25" class="plan-item">{{plan.duration}}</md-layout>
        <md-layout md-flex="25" class="plan-item">{{plan.deadline}}</md-layout>
        <md-layout md-flex="25" class="plan-item">{{plan.progress}}%</md-layout>
        <md-button class="md-icon-button md-mini md-dense delele-plan-button">
          <md-icon>delete</md-icon>
        </md-button>

        <md-progress :md-progress="plan.progress" class="md-accent"></md-progress>
      </md-layout>
    </div>
  </div>
</template>
<script>
  import uuid from 'uuid/v1';
  import myDatepicker from 'vue-datepicker/vue-datepicker-es6'
  import local from '@/utils/localStorage'
  const LOCAL_PLANS = 'LOCAL_PLAN'
  let {saveLocal,getLocal,removeLocal}  = local(LOCAL_PLANS)

  export default {
    name: 'annualPlan',
    data() {
      return {
        plans: [],
        planContent: '',
        planDuration: '',
        planDeadline: '',
        startTime: {
          time: ''
        }
      }
    },
    created() {
      this.plans = getLocal().plans || []
    },
    methods: {
      addPlan() {
        this.plans.push({
          id: uuid(),
          content: this.planContent,
          duration: this.planDuration,
          deadline: this.planDeadline,
          progress: 0,
        })
        saveLocal( {
          plans: this.plans
        })
      },
      removePlan() {

      },
      editPlan() {

      },
    },
    components: {
      'date-picker': myDatepicker
    }
  }

</script>
<style scoped>
  .container {
    margin: 30px 100px 0;
  }

  .form-area {
    margin-bottom: 20px;
  }

  .plan-list {
    display: flex;
    width: 100%;
    justify-content: space-around;
  }

  .plan-header {
    margin-bottom: 20px;
  }

  .plan-item {
    margin-bottom: 15px;
    position: relative;
    /*border-bottom: 1px solid #eee;*/
  }

  .delele-plan-button {
    position: absolute;
    right: 0;
  }

  .plan-item .md-progress {
    margin-rigthn: 30px;
  }

</style>

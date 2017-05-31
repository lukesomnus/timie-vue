<template>
  <div class="container">
    <div class="header">
    </div>
    <md-whiteframe md-elevation="2" class="form-area">
      <md-layout md-gutter>
        <md-layout md-flex="25" class="form-area-input">
          <md-input-container>
            <md-input placeholder="计划名称" v-model="planContent"></md-input>
          </md-input-container>
        </md-layout>
        <md-layout md-flex="25" class="form-area-input">
          <date-picker :date="startTime">
            <md-input-container>
              <md-input placeholder="开始时间" v-model="startTime.time"></md-input>
            </md-input-container>
          </date-picker>
        </md-layout>
        <md-layout md-flex="25" class="form-area-input">
          <date-picker :date="endTime">
            <md-input-container>
              <md-input placeholder="截止时间" v-model="endTime.time"></md-input>
            </md-input-container>
          </date-picker>
        </md-layout>
        <md-layout>
          <div>
            <md-button class="md-primary md-raised add-plan-button" @click.native="addPlan">
              <md-icon>add</md-icon>
            </md-button>
          </div>
        </md-layout>
      </md-layout>
    </md-whiteframe>
    <md-whiteframe md-elevation="2" class="main" v-show="plans.length">
      <md-layout md-gutter class="plan-header">
        <md-layout md-flex="25">计划名称</md-layout>
        <md-layout md-flex="25">计划周期</md-layout>
        <md-layout md-flex="25">截止日期</md-layout>
        <md-layout md-flex="25">完成比例</md-layout>
      </md-layout>
      <md-layout md-gutter v-for="(plan,index) in plans" :key="index" class="plan-item">
        <md-layout md-flex="25" class="plan-item">{{plan.content}}</md-layout>
        <md-layout md-flex="25" class="plan-item">{{plan.startTime}}</md-layout>
        <md-layout md-flex="25" class="plan-item">{{plan.endTime}}</md-layout>
        <md-layout md-flex="25" class="plan-item">{{plan.progress}}%</md-layout>
        <md-button id="editPlan" class="md-icon-button md-mini md-dense edit-plan-button md-primary" @click.native="editPlan(plan)">
          <md-icon>edit</md-icon>
        </md-button>
        <md-button class="md-icon-button md-mini md-dense delete-plan-button md-accent" @click.native="removePlan(plan.id)">
          <md-icon>delete</md-icon>
        </md-button>
        <md-progress :md-progress="+plan.progress" class="md-accent"></md-progress>
      </md-layout>
    </md-whiteframe>

    <!--弹窗-->
    <md-dialog md-open-from="#editPlan" md-close-to="#editPlan" ref="editPlanDialog">
      <md-dialog-title>编辑计划</md-dialog-title>

      <md-dialog-content>
        <md-input-container>
          <md-input placeholder="计划名称" v-model="editPlanObj.content"></md-input>
        </md-input-container>
        <date-picker :date="editPlanObj.startTime">
          <md-input-container>
            <md-input placeholder="开始时间" v-model="editPlanObj.startTime.time"></md-input>
          </md-input-container>
        </date-picker>
        <date-picker :date="editPlanObj.endTime">
          <md-input-container>
            <md-input placeholder="截止时间" v-model="editPlanObj.endTime.time"></md-input>
          </md-input-container>
        </date-picker>
        <md-input-container>
          <md-input placeholder="进度" v-model="editPlanObj.progress" type="number"></md-input>
        </md-input-container>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click.native="closeDialog('cancel')">取消</md-button>
        <md-button class="md-primary" @click.native="closeDialog('confirm')">保存</md-button>
      </md-dialog-actions>
    </md-dialog>

  </div>
</template>
<script>
import uuid from 'uuid/v1';
import myDatepicker from '@/components/tools/Timepicker/Timepicker'
import local from '@/utils/localStorage'
const LOCAL_PLANS = 'LOCAL_PLAN'
let { saveLocal, getLocal, removeLocal } = local(LOCAL_PLANS)

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
      },
      endTime: {
        time: ''
      },
      editPlanObj: {
        id: '',
        content: '',
        startTime: {
          time: ''
        },
        endTime: {
          time: ''
        },
        progress: 0
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
        startTime: this.startTime.time,
        endTime: this.endTime.time,
        progress: 0,
      })
      this.savePlans()
    },
    removePlan(id) {
      this.plans = this.plans.filter(plan => plan.id !== id)
      this.savePlans()
    },
    savePlans() {
      saveLocal({
        plans: this.plans
      })
    },
    editPlan(plan) {
      // this.plans.forEach(plan=>{
      // if(plan.id===id){
      this.editPlanObj.id = plan.id
      this.editPlanObj.content = plan.content
      this.editPlanObj.startTime.time = plan.startTime
      this.editPlanObj.endTime.time = plan.endTime
      this.editPlanObj.progress = plan.progress
      // }
      // })
      this.openDialog()
    },
    openDialog() {
      this.$refs.editPlanDialog.open();
    },
    closeDialog(action) {
      if (action === 'confirm') {
        let { id, content, startTime, endTime, progress } = this.editPlanObj
        this.plans.forEach(plan => {
          if (plan.id === id) {
            plan.content = content
            plan.startTime = startTime.time
            plan.endTime = endTime.time
            plan.progress = progress
          }
        })
        this.savePlans()
      }
      this.$refs.editPlanDialog.close();
    },
    onOpen() {
      console.log('Opened');
    },
    onClose(type) {
      console.log('Closed', type);
    }
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
  background-color: #fff;
  padding-left: 20px;
  height: 80px;
}
.form-area .form-area-input {
  padding-right: 20px;
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
.add-plan-button{
  margin: 20px;
}
.edit-plan-button {
  position: absolute;
  right: 24px;
  /*color: skyblue;*/
}

.delete-plan-button {
  position: absolute;
  right: 0;
  /*color: red;*/
}

.plan-item .md-progress {
  margin-rigthn: 30px;
}

.main {
  background-color: #fff;
  padding: 20px;
  z-index: 0;
}

.cov-vue-date {
  width: 100%;
}
</style>

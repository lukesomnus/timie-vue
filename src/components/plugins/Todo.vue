<template>
  <!--<md-whiteframe md-elevation="4" >-->
  <div class="container">
    <div class="todo-type-toggle">
      <md-button class="md-raised md-primary" @click.native="isTodoSquare=!isTodoSquare">{{isTodoSquare?'切换到列表':'切换到四象限'}}</md-button>
    </div>
    <div class="todo-header">
      <span class="todo-header-day">今天</span>
      <span class="todo-header-date">星期六 5月6日</span>
    </div>
    <!--todo 列表形式-->
    <div class="todo-list-table" v-show="!isTodoSquare">
      <div class="todo-group">
        <transition-group name="todo-list">
          <md-whiteframe class="todo-item" md-elevation="1" v-for="todo in todoFilter" :key="todo.id" @mouseover.native="selectedOne=todo.id"
            @mouseout.native="selectedOne=''">
            <div class="todo-content">
              <md-checkbox id="my-test1" name="my-test1" v-model="todo.isCompleted" @change="completeTodo(todo.id,todo.isCompleted)"> {{todo.text}}</md-checkbox>
              <transition name="todo-icon">
                <md-icon class="todo-delete" @click.native="removeTodo(todo.id)" v-show="selectedOne==todo.id">delete</md-icon>
              </transition>
            </div>
          </md-whiteframe>
        </transition-group>
      </div>
      <div class="todo-add-tip tip-task" @click="showTodoInput" v-show="!isShowTodoInput">
        <md-icon class="md-accent">add</md-icon>
        <span>添加任务</span>
      </div>
      <div class="input-area" v-show="isShowTodoInput">
        <md-layout md-gutter>
          <md-layout>
            <md-input-container>
              <md-input placeholder="添加任务" v-model.trim="todoInputVal"></md-input>
            </md-input-container>
            <div>
              <md-radio v-model="todoPriority" id="level1" name="my-test-group1" md-value="1">紧急且重要</md-radio>
              <md-radio v-model="todoPriority" class="md-warn" name="my-test-group1" md-value="2">重要但不紧急</md-radio>
              <md-radio v-model="todoPriority" class="md-primary" name="my-test-group1" md-value="3">紧急但不重要</md-radio>
              <md-radio v-model="todoPriority" id="level4" name="my-test-group1" md-value="4">不紧急且不重要</md-radio>
            </div>
          </md-layout>
          <md-layout md-flex="40">
            <md-button class="md-icon-button md-raised md-primary add-btn" @click.native="addTodo" :disabled="todoInputVal.length===0">
              <md-icon>add</md-icon>
            </md-button>
          </md-layout>
        </md-layout>
      </div>
    </div>

    <!--todo 四象限-->
    <div v-show="isTodoSquare">
      <md-layout md-gutter>
        <md-layout md-flex="50">
          <md-whiteframe md-elevation="4" class="todo-square todo-urgent-important ">
            <md-whiteframe md-elevation="1" class="todo-square-title">
              <div>紧急且重要</div>
            </md-whiteframe>
            <div class="todo-square-list">
              <div v-for="todo in urgentAndImportantTodos" :key="todo.id" class="todo-content">
                <md-checkbox id="my-test1" name="my-test1" v-model="todo.isCompleted" @change="completeTodo(todo.id,todo.isCompleted)"> {{todo.text}}</md-checkbox>
                <transition name="todo-icon">
                  <md-icon class="todo-delete" @click.native="removeTodo(todo.id)" v-show="selectedOne==todo.id">delete</md-icon>
                </transition>
              </div>
            </div>
          </md-whiteframe>
        </md-layout>
        <md-layout md-flex="50">
          <md-whiteframe md-elevation="4" class="todo-square todo-noturgent-important">
            <md-whiteframe md-elevation="1" class="todo-square-title">
              <div>紧急但不重要</div>
            </md-whiteframe>
          </md-whiteframe>
        </md-layout>
        <md-layout md-flex="50">
          <md-whiteframe md-elevation="4" class="todo-square todo-urgent-notimportant">
            <md-whiteframe md-elevation="1" class="todo-square-title">
              <div>重要但不紧急</div>
            </md-whiteframe>
          </md-whiteframe>
        </md-layout>
        <md-layout md-flex="50">
          <md-whiteframe md-elevation="4" class="todo-square todo-noturgent-notimportant">
            <md-whiteframe md-elevation="1" class="todo-square-title">
              <div>不紧急且不重要</div>
            </md-whiteframe>
          </md-whiteframe>
        </md-layout>
      </md-layout>


    </div>
  </div>
  <!--</md-whiteframe>-->

</template>
<script>
  import uuid from 'uuid/v1';
  import local from '@/utils/localStorage'
  let {saveLocal,getLocal,removeLocal}  = local('todos')
  export default {
    name: 'todo',
    data() {
      return {
        isShowTodoInput: false,
        todoPriority: 1,
        todos: [],
        todoInputVal: '',
        selectedOne: '',
        isTodoSquare: true
      }
    },
    created() {
      this.todos = this.getTodos()
    },
    computed: {
      todoFilter() {
        return this.todos.filter(todo => !todo.isCompleted)
      },
      urgentAndImportantTodos() {
        return this.todos.filter(todo => todo.priority == 1 && !todo.isCompleted)
      },
      urgentAndNotImportantTodos() {
        return this.todos.filter(todo => todo.priority == 2 && !todo.isCompleted)
      },
      notUrgentAndImportantTodos() {
        return this.todos.filter(todo => todo.priority == 3 && !todo.isCompleted)
      },
      notUrgentAndNotImportantTodos() {
        return this.todos.filter(todo => todo.priority == 4 && !todo.isCompleted)
      }
    },
    methods: {
      showTodoInput() {
        this.isShowTodoInput = true;
      },
      addTodo() {
        const id = uuid()
        const newTodo = {
          id,
          text: this.todoInputVal,
          priority: this.todoPriority,
          isCompleted: false
        }
        this.todos.push(newTodo);
        this.saveTodos()
      },
      removeTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id)
        this.saveTodos();
      },
      editTodo() {

      },
      completeTodo(id, isCompleted) {
        if (!isCompleted) {
          this.todos = this.todos.map((todo) => {
            if (todo.id === id) todo.isCompleted = true
            return todo
          })
          this.saveTodos()
        }

      },
      getTodos() {
        const todos = getLocal().todos
        return todos
      },
      saveTodos() {
        saveLocal( {
          todos: this.todos
        });
      },
      showSetting() {

      }
    }
  }

</script>
<style scoped>
  .container {
    margin: 40px 10%;
  }

  .todo-type-toggle {
    text-align: right;
  }



  .todo-header {
    margin-bottom: 10px;
  }

  .todo-header-day {
    font-size: 20px;
    font-weight: bold;
  }

  .todo-header-date {
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

  .todo-group {
    font-size: 20px;
  }

  .todo-item {
    width: 600px;
    margin-bottom: 10px;
    background-color: #fff;
    /*border: 2px solid #E15A84;*/
  }
  /*.todo-content:hover{
    box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px rgba(0,0,0,.14), 0 1px 10px rgba(0,0,0,.12);
  }*/

  .todo-content {
    position: relative;
    padding-left: 20px;
    /*transition: all 1s ease;*/
  }

  .todo-delete {
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
    z-index: 1000;
  }

  .add-btn {
    margin: 40px 0 0 20px;
  }

  .todo-list-enter-active,
  .todo-list-leave-active {
    transition: all 1s;
  }

  .todo-list-enter,
  .todo-list-leave-active {
    opacity: 0;
    transform: translateY(30px);
  }
  /*todo control icon*/

  .todo-icon-enter-active,
  .todo-icon-leave-active {
    transition: opacity .5s
  }

  .todo-icon-enter,
  .todo-icon-leave-active {
    opacity: 0
  }

  .md-whiteframe {
    width: 100%;
  }

  .todo-square {
    height: 300px;
    overflow: scroll;
    width: 100%;
    /*border: 1px solid #333;*/
    background-color: #fff;
    margin: 10px;
  }

  .todo-square-title {
    width: 96%;
    margin: 6px auto;
    padding: 10px 10px;
    background: url('../../assets/pushpin.svg') no-repeat right center;
  }

  .todo-urgent-important {}

  .todo-urgent-important .todo-square-title {
    background-color: #FFEBEE;
    color: #F44336;
  }

  .todo-noturgent-important {}

  .todo-noturgent-important .todo-square-title {
    background-color: #FFF3E0;
    color: #FF9800;
  }

  .todo-urgent-notimportant {}

  .todo-urgent-notimportant .todo-square-title {
    background-color: #E1F5FE;
    color: #03A9F4;
  }

  .todo-noturgent-notimportant {}

  .todo-noturgent-notimportant .todo-square-title {
    background-color: #E8F5E9;
    color: #4CAF50;
  }

  .todo-square-list .md-checkbox{
    margin: 0;
  }
  .todo-square-list .todo-content{
    margin: 10px 0;
  }
</style>

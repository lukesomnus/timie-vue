<template>
  <!--<md-whiteframe md-elevation="4" >-->
  <div class="todo-container">
    <div class="todo-header">
      <span class="todo-header-day">今天</span>
      <span class="todo-header-date">星期六 5月6日</span>
    </div>
    <div class="todo-group">
      <div class="todo-item" v-for="todo in todoFilter" :key="todo.id" @mouseover="selectedOne=todo.id" @mouseout="selectedOne=''">
        <md-checkbox id="my-test1" name="my-test1" v-model="todo.isCompleted" @change="completeTodo(todo.id,todo.isCompleted)"> {{todo.text}}</md-checkbox>
        <md-icon class="todo-delete" @click.native="removeTodo(todo.id)" v-show="selectedOne==todo.id">delete</md-icon>
      </div>
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
            <md-radio v-model="todoPriority" id="level1" name="my-test-group1" md-value="1"></md-radio>
            <md-radio v-model="todoPriority" class="md-warn" name="my-test-group1" md-value="2"></md-radio>
            <md-radio v-model="todoPriority" class="md-primary" name="my-test-group1" md-value="3"></md-radio>
            <md-radio v-model="todoPriority" id="level4" name="my-test-group1" md-value="4"></md-radio>
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
  <!--</md-whiteframe>-->

</template>
<script>
  import uuid from 'uuid/v1';
  import {
    saveLocal,
    getLocal
  } from '@/utils/localStorage'
  export default {
    name: 'todo',
    data() {
      return {
        isShowTodoInput: false,
        todoPriority: 1,
        todos: [],
        todoInputVal: '',
        selectedOne: ''
      }
    },
    created() {
      this.todos = this.getTodos()
    },
    computed: {
      todoFilter() {
        return this.todos.filter(todo => !todo.isCompleted)
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
        const todos = getLocal('todos').todos
        return todos
      },
      saveTodos() {
        saveLocal('todos', {
          todos: this.todos
        });
      },
      showSetting() {

      }
    }
  }

</script>
<style scoped>
  .todo-container {
    margin: 40px 20%;
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

  li {
    list-style: none;
  }

  .todo-item {
    position: relative;
  }

  .md-icon.todo-delete {
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
  .add-btn{
    margin: 40px 0 0 20px;
  }

</style>

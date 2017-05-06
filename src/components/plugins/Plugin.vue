<template>

  <md-layout md-gutter class="container">
    <md-layout md-flex="20">
      <md-whiteframe md-elevation="2" class="plugin-nav">
        <md-list >
          <md-list-item v-for="plugin in plugins" :key="plugin.id">
            <router-link :to="plugin.link">
              <md-icon>{{plugin.icon}}</md-icon>
              <span>{{plugin.name}}</span>
            </router-link>
          </md-list-item>
        </md-list>
      </md-whiteframe>
    </md-layout>
    <md-layout>
      <div class="plugin-container">
        <router-view></router-view>
      </div>
    </md-layout>
  </md-layout>
</template>
<script>
  export default {
    name: 'plugin',
    data() {
      return {
        plugins: [{
            id: 1,
            name: 'Todo',
            icon: 'list',
            desc: '记录的任务列表',
            link: 'todo'
          },
          {
            id: 2,
            name: 'Time Note',
            icon: 'receipt',
            desc: '时间记录法',
            link: 'timenote'
          },
          {
            id: 3,
            name: 'Tomato Time',
            icon: 'access_time',
            desc: 'todo',
            link: 'tomato'
          }
        ]
      }
    }
  }

</script>
<style scoped>
  ul {
    -webkit-margin-before: 0;
    -webkit-margin-after: 0;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
  }

  .container {}

  .plugin-container {
    margin: 20px 100px 0 0;
    width: 80%;
  }

  .plugin-nav {
    width: 90%;
  }

</style>

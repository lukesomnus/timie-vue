<template>

  <md-layout md-gutter class="container">
    <md-layout md-flex="20">
      <md-whiteframe md-elevation="2" class="plugin-nav">
        <md-list :style="{height:navHeight+'px'}">
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
  import plugins from './../plugins'
  export default {
    name: 'plugin',
    data() {
      return {
        plugins,
        navHeight:0
      }
    },
    created(){
      this.navHeight = window.innerHeight-150
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


  .plugin-container {
    /*margin: 20px 100px 0 0;*/
    width: 100%;
  }

  .plugin-nav {
    width: 90%;
    background-color: #fff;
  }

</style>

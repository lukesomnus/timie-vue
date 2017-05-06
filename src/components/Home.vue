<template>
  <div>
    <div class="container">
      <div class="pugin-group">
        <md-layout md-gutter>
          <md-layout v-for="card in cards" :key="card.id" @click.native="goToPlugin(card.link)">
            <plugin-card :name="card.name" :desc="card.desc"></plugin-card>
          </md-layout>
        </md-layout>
      </div>
    </div>
  </div>
</template>

<script>
  import PluginCard from './PluginCard.vue';

  const cards = [{
      id: 1,
      name: 'Todo',
      desc: '记录的任务列表',
      link: 'todo'
    },
    {
      id: 2,
      name: 'Time note',
      desc: '时间记录法',
      link: 'timenote'
    },
    {
      id: 3,
      name: 'todo',
      desc: 'todo',
      link: '/todo'
    }
  ]
  export default {
    name: 'home',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        cards: cards
      }
    },
    components: {
      PluginCard
    },
    methods: {
      goToPlugin(link){
        this.$router.push('plugin/'+link)
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    margin: 20px 140px;
  }

</style>

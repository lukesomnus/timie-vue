<template>
    <div class="container">
      <div class="pugin-group">
        <md-layout md-gutter>
          <md-layout class="plugin-card" md-flex="33" v-for="(card,index) in cards" :key="card.id" @click.native="goToPlugin(card.link)">
            <plugin-card :name="card.name" :desc="card.desc" :bg-color="card.bgColor"></plugin-card>
          </md-layout>
        </md-layout>
      </div>
    </div>
</template>

<script>
  import PluginCard from './PluginCard.vue';
  import plugins from './plugins'
  const cards = plugins
  const cardColors = [{top:'#3EC69A',bottom:'#3768BE'},
  {top:'#2E7FBF',bottom:'#986BAD'},
  {top:'#FFAE80',bottom:'#E15A84'},
  {top:'#3EC69A',bottom:'#3768BE'},
  {top:'#74D0F8',bottom:'#3A3377'},]
  export default {
    name: 'home',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        cards: cards,
        cardColors
      }
    },
    components: {
      PluginCard
    },
    methods: {
      goToPlugin(link) {
        this.$router.push('plugin/' + link)
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    /*background-color: #999;*/
    padding: 20px 200px;
  }

  .plugin-card {
    margin-bottom: 30px;
  }

</style>

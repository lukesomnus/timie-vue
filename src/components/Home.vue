<template>
  <div>
    <div class="container">
      <div class="pugin-group">
        <md-layout md-gutter>
          <md-layout class="plugin-card" md-flex="33" v-for="card in cards" :key="card.id" @click.native="goToPlugin(card.link)">
            <plugin-card :name="card.name" :desc="card.desc"></plugin-card>
          </md-layout>
        </md-layout>
      </div>
    </div>
  </div>
</template>

<script>
  import PluginCard from './PluginCard.vue';
  import plugins from './plugins'
  const cards = plugins
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
      goToPlugin(link) {
        this.$router.push('plugin/' + link)
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    margin: 20px 140px;
  }

  .plugin-card {
    margin-bottom: 20px;
  }

</style>

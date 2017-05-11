<template>
  <md-card v-bind:style="cardStyle">
    <md-card-media>
      <div class="plugin-img"></div>
    </md-card-media>
    <md-card-header>
      <div class="md-title">{{name}}</div>
      <div class="md-subhead">{{desc}}</div>
    </md-card-header>
  </md-card>
</template>
<script>
  export default {
    name: 'pluginCard',
    props: ['name', 'desc', 'bgColor'],
    data() {
      return {
        cardStyle: {
          background: '-webkit-linear-gradient(left top,' + this.bgColor.top + ',' + this.bgColor.bottom + ')'
        }
      }
    }
  }

</script>
<style scoped>
  .plugin-img {
    height: 200px;
  }

  .md-card {
    color: #fff;
    width: 100%;
    margin: 0 20px;
    background: -webkit-linear-gradient(left top, rgb(62, 198, 152), rgb(55, 105, 190));
    cursor: pointer;
    transition: box-shadow .5s ease;
  }
  .md-card:hover{
    box-shadow: 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.3);
  }
</style>

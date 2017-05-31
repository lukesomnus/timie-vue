<template>
  <div class="root">
    <div>
      <md-button class="md-raised md-primary" @click.native="duang">
        Duang!!!
      </md-button>
    </div>
    <div class="random-group clearfix">
      <transition-group tag="div" name="random">
        <div class="random-card" v-for="card in cards" :key="card.id" @click="seletedCardId=card.id">
          <div class="card">
            <span v-show="seletedCardId===card.id">{{card.value}}</span>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>
<style lang="scss">
.random-group {
  width: 100%;
  .random-card {
    padding: 30px;
    box-sizing: border-box;
    width: 25%;
    float: left;
    .card {
      background-color: lightblue;
      height: 200px;
      line-height: 200px;
      text-align: center;
      font-size: 30px;
      color: #fff;
    }
  }
}
.random-move {
  transition: transform 1s;
}
</style>
<<script>
export default {
  name:'random',
  data(){
    return {
      cards:[],
      seletedCardId:''
    }
  },
  created () {
    this.cards =Array.apply(null, { length: 12 }).map((item,index)=>{
      return {
        id:index+1,
        value:'card'+(index+1)
      }
    })
  },
  methods:{
    duang(){
        this.seletedCardId =''
        this.cards =  shuffle(this.cards)
        setTimeout(()=>{
         this.cards =  shuffle(this.cards)
        },1000)
    },
  }
}
function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return [...a]
}
</script>



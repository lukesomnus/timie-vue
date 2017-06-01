<template>
  <div class="root">
    <div>
      <md-input-container class="square-add-todo">
        <md-input placeholder="输入随机值，以/分割，输入完成按回车添加" v-model.trim="randomVal" @keyup.enter.native="splitRandomVal"></md-input>
      </md-input-container>
      <md-button class="md-raised md-primary" @click.native="duang">
        Duang!!!
      </md-button>
    </div>
    <div class="random-group clearfix">
      <transition-group tag="div" name="random">
        <div class="random-card" v-for="card in cards" :key="card.id" @click="seletedCardId=card.id">
          <div class="card">
            <span v-show="seletedCardId===card.id || allShow">{{card.value}}</span>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>
<style lang="scss">
.root{
  padding: 20px;
  margin-right: 20px;
}
.random-group {
  width: 100%;
  .random-card {
    padding: 30px;
    box-sizing: border-box;
    width: 25%;
    float: left;
    .card {
      background-color: rgba(0, 0, 0, .75);
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
<script>
export default {
  name: 'random',
  data() {
    return {
      randomVal: '',
      cards: [],
      seletedCardId: '',
      allShow:true
    }
  },
  computed: {
    randoms() {
      const arr = this.randomVal.split('/')
      if (!arr[arr.length-1]) arr.pop()
      return arr
    }
  },
  created() {

  },
  methods: {
    duang() {
      this.allShow = false
      this.seletedCardId = ''
      this.cards = shuffle(this.cards)
      setTimeout(() => {
        this.cards = shuffle(this.cards)
      }, 1000)
    },
    splitRandomVal() {
      this.cards = this.randoms.map((item, index) => {
        return {
          id: index + 1,
          value: item
        }
      })
    }
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



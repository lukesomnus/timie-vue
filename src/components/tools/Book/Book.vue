<template>
  <div class="book-container">
    <div class="book-progress">
      {{progress}}%
    </div>
    <div class="book-content">
      <div class="book-title">
        <slot name="title"></slot>
      </div>
      <div class="book-author">
        <slot name="author"></slot>
      </div>
    </div>
  </div>
</template>
<style  scoped>
.book-container {
  background-color: #A1887F;
  margin: 0 auto;
  /*border: 2px solid #eee;*/
  width: 280px;
  height: 400px;
  position: relative;
  padding-top: 30px;
  box-sizing: border-box;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px rgba(0, 0, 0, .14), 0 1px 10px rgba(0, 0, 0, .12);
  /*filter: blur(1px)*/
}

.book-content {
  z-index: 100;
}

.book-progress {
  position: absolute;
  top: 0;
  height: 200px;
  width: 100%;
  background-color: rgba(0, 0, 0, .6);
  text-align: center;
  line-height: 200px;
  color: #fff;
  font-size: 30px;
}

.book-title {
  text-align: center;
  font-size: 20px;
}

.book-author {
  text-align: right;
  margin-top: 10px;
  padding-right: 20px;
}
</style>
<script>
export default {
  name:'book',
  data(){
    return {

    }
  },
   props:{
      progress:Number
    }
}
</script>


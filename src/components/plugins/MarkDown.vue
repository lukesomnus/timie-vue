<template>
  <div class="root">
    <md-layout md-gutter>
      <md-layout md-flex="50" class="markdown-container">
        <md-input-container>
          <label>Textarea</label>
          <md-textarea class="markdown-textarea" v-model="mdVal"></md-textarea>
        </md-input-container>
      </md-layout>
      <md-layout md-flex="50" class="parse-container">
        <div v-html="htmlVal"></div>
      </md-layout>
    </md-layout>
  </div>
</template>
<style lang="scss">
.root {
  margin-top: 20px;
  background-color: #fff;
}
.markdown-container {
  padding: 20px;
  border-right: 2px solid #eee;
  .markdown-textarea {
    height: 600px !important;
    max-height:800px !important;
    width: 100%;

  }
}
.parse-container{
  padding: 20px;
}
</style>
<script>
import {markdown} from 'markdown';
export default {
  name:'markdown',
  data(){
    return{
      mdVal:'',
      htmlVal:''
    }
  },
  watch: {
    mdVal(newVal){
      this.htmlVal = markdown.toHTML(newVal)
    }
  }
}
</script>



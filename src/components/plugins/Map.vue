<script>
export default {
  name:'vueMap',
    render(createElement){
    function createLoop(val){
      return val.map(item=>{

        if(item.children.length>0){
          return createElement('div',{'class':'component-square'},[createElement('div',{'class':'components-container'},[createElement('span',{'class':'component-name'},item.name),...createLoop(item.children)])])
        }else{
           return createElement('div',{'class':'component-square'},[createElement('span',{'class':'component-name'},item.name)])
        }
      })
    }
    return createElement('div',{'class':'components-container'},createLoop(this.map))
    // return createElement('div')
  },
  props:['map']
}
</script>
<style scoped>
.components-container{
  background-color: #42b983;
  /*border: 1px solid red;*/
  display: flex;
  /*justify-content: space-between;*/
  flex-wrap: wrap;
  flex-direction: row;
  flex: 1;
  align-items: flex-start;
}
.component-square{
  background: #42b983;
  color: #fff;
  width: 100%;
  padding: 10px;
  flex: 0 1 33.3%;
  box-sizing: border-box;
  box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px rgba(0,0,0,.14), 0 1px 10px rgba(0,0,0,.12);
  height: 100%;
  align-self: stretch;
}
.component-name{
  display: block;
  padding-bottom: 10px;
  width: 100%;
  flex: 0 1 100%;
}
</style>

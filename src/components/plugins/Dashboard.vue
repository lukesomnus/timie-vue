<template>
  <div>
    <vue-map :map="map"></vue-map>
  </div>
</template>
<style>

</style>
<script>
import router from '../../router'
import vueMap from './Map'
export default {
  name: 'dashboard',
  data(){
    return {
      map:[]
    }
  },
  created() {
    console.log(collectMap(router.options.routes))
    console.log(router.options.routes)
    this.map = collectMap(router.options.routes)
  },
  components:{
    vueMap
  }
}


function collectMap(components) {
  let map = []

  var keys = Object.keys(components)
  var len = keys.length
  while (len--) {
    let item = components[keys[len]]
    let _Children = item.children || item.component && item.component.components
    let children
    if (_Children) {
      children = collectMap(_Children)
    }
    map.push({
      name: item.name,
      children: children || []
    })

  }
  return map
}
</script>

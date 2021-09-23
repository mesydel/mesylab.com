<template>
  <HelloWorld msg="Mesylab SRL"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  title: 'Foo Page',
  name: 'App',
  components: {
    HelloWorld
  },
    created(){
        document.title = "Mesylab SRL",
        document.description = "Mesylab SRL is a software company from Belgium."

  }
}
</script>

<style>
body {
  background-color: #fafafa;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

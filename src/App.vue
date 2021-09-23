<template>
  <HelloWorld msg="Mesylab SRL"/>

<div class="footer">
        Mesylab SRL — BE 0685.595.109<br />
        <a href="https://www.openstreetmap.org/way/483208187" target="_blank" title="Mesylab">Rue Robespierre 6, 4140 Sprimont (Belgium)</a> | <a href="tel:+32 494 766 396">+32 494 766 396</a>
</div>

</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
    created(){
        document.title = "Mesylab SRL"
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


h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.footer {
  position:fixed;
  bottom:0;
  left:0;
  width:100%;
  height: 40px;
  color: #2c3e50;
  font-size: 80%;
  background-color: #ccc;
}

.footer a {
  color: #276fb8;
}


</style>

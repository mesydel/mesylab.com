<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      {{ msg }} is a software company from Belgium.
    </p>
    <h2>Projects</h2>    
    <h3>Spin-off from University of Liège</h3>
    <ul>
      <li><a href="https://mesydel.com" target="_blank" rel="noopener">Mesydel</a></li>
    </ul>
    <h3>OpenSource Initiatives</h3>
    <ul>
      <li><a href="https://corpus.lltl.be" target="_blank" rel="noopener">Corpus</a></li>
      <li><a href="https://omdat.openjustice.be" target="_blank" rel="noopener">Omdat</a></li>
      <li><a href="http://dataprotect.tintamarre.be" target="_blank" rel="noopener">OpenDataProtect</a></li>
    </ul>
    <h3>Contact</h3>
    <ul>
      <li><a href="mailto:martin---at---erpicum.net" target="_blank" rel="noopener">Email</a></li>
      <li><a href="https://www.linkedin.com/in/martinerpicum/" target="_blank" rel="noopener">LinkedIn</a></li>   
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
</style>

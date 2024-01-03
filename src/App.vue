<template>
<div class="hero bg-base-100">
  <div class="hero-content text-center flex flex-row">
  <MainComponent :company="company_name" class=""/>
  <ProjectsComponent class="" />
  </div>
</div>
  <FooterComponent :company="company_name" class="text-center flex flex-col" />
</template>

<script>
import MainComponent from './components/MainComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
import ProjectsComponent from './components/ProjectsComponent.vue'

export default {
  name: 'App',
  components: {
    MainComponent,
    FooterComponent,
    ProjectsComponent
  },
  data: function () {
    return {
      company_name: 'Mesylab SRL'
    }
  },
  created () {
    document.title = this.company_name
  }
}
</script>

<style>

</style>

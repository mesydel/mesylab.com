<template>
<div class="bg-base-100">
  <div class="">
  <ProjectsComponent class="p-8" />
  </div>
</div>
  <FooterComponent :company="company_name" class="text-center flex flex-col" />
</template>

<script>
import FooterComponent from './components/FooterComponent.vue'
import ProjectsComponent from './components/ProjectsComponent.vue'

export default {
  name: 'App',
  components: {
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

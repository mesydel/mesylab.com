<template>
  <div class="min-h-screen bg-base-100 flex flex-col">
    <main class="flex-grow">
      <ProjectsComponent />
    </main>
    <FooterComponent :company="company_name" />
  </div>
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
/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Selection color */
::selection {
  background-color: #2a9d8f;
  color: white;
}

/* Link transitions */
a {
  transition: color 0.2s ease;
}

/* Card hover animations */
article {
  transition: transform 0.2s ease, box-shadow 0.3s ease;
}

article:hover {
  transform: translateY(-2px);
}
</style>

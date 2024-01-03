<template>
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">{{ company }}</h1>
      <p class="py-6">
        Software company from Belgium managed by Martin Erpicum (<a href="https://www.linkedin.com/in/martinerpicum/" target="_blank" rel="noopener" class="link link-primary">LinkedIn</a>, <a href="https://www.erpicum.net/" target="_blank" rel="noopener" class="link link-primary">Blog</a>)
      </p>
  </div>
</template>

<script>
export default {
  props: {
    company: String
  }
}
</script>

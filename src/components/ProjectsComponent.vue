<template>
    <div class="py-16 sm:py-16">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto">
          <h1 class="text-5xl font-bold">Mesylab <span class="text-gray-400">SRL</span></h1>
          <p class="py-6">
            Mesylab SRL is a Belgian software company. Our expertise lies in Data Engineering, Data Science, and Public Participation. Connect with Martin on <a href="https://www.linkedin.com/in/martinerpicum/" target="_blank" rel="noopener" class="link link-primary">LinkedIn</a> or visit his <a href="https://www.tintamarre.be/" target="_blank" rel="noopener" class="link link-primary">Blog</a>.
          </p>

        </div>
        <h3>
          <span class="block text-2xl font-semibold text-gray-900">Projects</span>
        </h3>
        <p class="mt-2 text-lg leading-8 text-gray-600 py-6">Here are some of the projects I have worked on:</p>
        <div class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-4 border-t border-gray-200 pt-4 sm:mt-4 sm:pt-4 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <article v-for="post in posts" :key="post.id" class="flex max-w-xl flex-col items-start justify-between">
            <div class="flex items-center gap-x-4 text-xs">
              <a :href="post.category.href" class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">{{ post.category.title }}</a>
            </div>
            <div class="group relative">
              <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                <a :href="post.href">
                  <span class="absolute inset-0" />
                  {{ post.title }}
                </a>
              </h3>
              <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                {{ post.description }}
              </p>
                <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    <a :href="post.blog_url" class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-xs text-gray-600 hover:bg-gray-100">More info</a>
                </p>

              <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                <time class="text-gray-500">{{ post.year_started }} - {{ new Date().getFullYear() }}</time>
              </p>
            </div>

          </article>
        </div>
      </div>
    </div>
  </template>

<script setup>
const posts = [
  {
    id: 1,
    title: 'DataProtect',
    href: 'http://dataprotect.tintamarre.be',
    description:
        'DataProtect is a web application that allows you to manage your data protection obligations.',
    year_started: 2021,
    category: { title: 'FLOSS', href: '#' }
  },
  {
    id: 2,
    title: 'Mesydel',
    href: 'https://mesydel.com',
    description:
        'Mesydel is a spin-off from the University of Liège. It is a web application that allows you to create and manage your own surveys. It is a SaaS solution.',
    year_started: 2014,
    category: { title: 'SaaS', href: '#' },
    blog_url: 'https://mesydel.com'
  },
  {
    id: 3,
    title: 'Corpus',
    href: 'https://corpus.lltl.be',
    description:
        'Corpus is a web application that allows you to create and manage your own corpora. It is a SaaS solution.',
    year_started: 2019,
    category: { title: 'FLOSS', href: '#' },
    blog_url: 'https://docs.lltl.be/'
  },
  {
    id: 4,
    title: 'LegalTech Lab',
    href: 'https://legaltech.uliege.be/',
    description:
        'The LegalTech Lab is a research center from the University of Liège.',
    year_started: 2020,
    category: { title: 'Research', href: '#' },
    blog_url: 'https://legaltech.uliege.be/'
  }
]
</script>

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
        <p class="mt-2 text-lg leading-8 text-gray-600 py-6">Here are some of the projects I have worked on (directly for Mesylab, as a consultant, or as a employee). I am always looking for new projects to work on. If you have an idea, feel free to contact me.</p>
        <div class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-4 border-t border-gray-200 pt-4 sm:mt-4 sm:pt-4 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <article v-for="post in posts" :key="post.id" class="flex max-w-xl flex-col items-start justify-between">
            <div class="flex items-center gap-x-4 text-xs">

            <a v-for="category in post.categories" :key="category.id" :href="category.href" class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-small text-gray-600 hover:bg-gray-100">
              {{ category.title }}
            </a>
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
                    <a :href="post.blog_url" class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-xs text-gray-600 hover:bg-gray-100" v-if="post.blog_url">More info</a>
                </p>

              <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                <time class="text-gray-500" v-if="!post.year_ended">{{ post.year_started }} - {{ new Date().getFullYear() }}</time>
                <time class="text-gray-500" v-else>{{ post.year_started }} - {{ post.year_ended }}</time>
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
    href: 'https://github.com/openjusticebe/OJDataProtect',
    description:
        'DataProtect is a web application that allows you to manage your data protection obligations.',
    year_started: 2021,
    year_ended: 2023,
    categories: [
      { id: 0, title: 'FLOSS', href: '#' },
      { id: 1, title: 'SaaS', href: '#' },
      { id: 2, title: 'Law', href: '#' }
    ]
  },
  {
    id: 2,
    title: 'Mesydel',
    href: 'https://mesydel.com',
    description:
        'Mesydel is a spin-off from the University of Liège. It is a web application that allows you to create and manage your own surveys. It is a SaaS solution.',
    year_started: 2014,
    categories: [
      { id: 0, title: 'FLOSS', href: '#' },
      { id: 1, title: 'SaaS', href: '#' },
      { id: 2, title: 'Social Science', href: '#' }
    ],
    blog_url: 'https://mesydel.com'
  },
  {
    id: 3,
    title: 'Corpus',
    href: 'https://corpus.lltl.be',
    description:
        'Corpus is a web application that allows you to tag your a set of document. It is a SaaS solution.',
    year_started: 2019,
    categories: [
      { id: 0, title: 'FLOSS', href: '#' },
      { id: 1, title: 'SaaS', href: '#' },
      { id: 2, title: 'Social Science', href: '#' }
    ],
    blog_url: 'https://docs.lltl.be/'
  },
  {
    id: 4,
    title: 'LegalTech Lab',
    href: 'https://legaltech.uliege.be/',
    description:
        'The LegalTech Lab is a research center from the University of Liège.',
    year_started: 2020,
    categories: [
      { id: 0, title: 'Research', href: '#' },
      { id: 1, title: 'SaaS', href: '#' }
    ],
    blog_url: 'https://legaltech.uliege.be/'
  },
  {
    id: 5,
    title: 'Pipelette',
    href: '',
    description:
        'Using LLM to categorize and summarize Open ended questions from surveys.',
    year_started: 2022,
    categories: [
      { id: 0, title: 'FWB', href: '#' }
    ],
    blog_url: ''
  },
  {
    id: 6,
    title: 'FileMakerPro convertor',
    href: '',
    description:
        'Online converter to convert FileMakerPro files to CSVs files.',
    year_started: 2023,
    categories: [
      { id: 0, title: 'FWB', href: '#' }
    ],
    blog_url: ''
  },
  {
    id: 7,
    title: 'Houtsitrue API',
    href: '',
    description:
        'API to validate and enrich identitification numbers and addresses.',
    year_started: 2024,
    categories: [
      { id: 0, title: 'FWB', href: '#' }
    ],
    blog_url: ''
  },
  {
    id: 8,
    title: 'Ciboulot API',
    href: '',
    description:
        'RAG api that ingest, vectorize documents and expose a Model Context Protocol (MCP) API to query the documents.',
    year_started: 2024,
    categories: [
      { id: 0, title: 'FWB', href: '#' }
    ],
    blog_url: ''
  },
  {
    id: 9,
    title: 'Subventions API',
    href: '',
    description:
        'API that expose the Subventions paid by the FWB of Belgium to the organizations.',
    year_started: 2023,
    categories: [
      { id: 0, title: 'FWB', href: '#' }
    ],
    blog_url: ''
  },
  {
    id: 10,
    title: 'Maider (PoC)',
    href: '',
    description: 'Service dedicated to help the walloon citizens to get information related to their rights.',
    year_started: 2022,
    year_ended: 2023,
    categories: [
      { id: 0, title: 'PoC', href: '#' }
    ],
    blog_url: ''
  },
  {
    id: 11,
    title: 'Subventions DATA WB',
    href: 'https://subventions.datawb.be',
    description:
        'Frontend that expose the Subventions paid by the FWB of Belgium to the organizations.',
    year_started: 2023,
    categories: [
      { id: 0, title: 'FWB', href: '#' }
    ],
    blog_url: ''
  },
  {
    id: 12,
    title: 'Marches Adeps',
    href: 'https://marches-adeps.datawb.be',
    description:
        'Frontend that expose the Marches Adeps of the FWB of Belgium.',
    year_started: 2023,
    categories: [
      { id: 0, title: 'FWB', href: '#' }
    ],
    blog_url: ''
  },
  {
    id: 13,
    title: 'FWB Data Platform',
    href: '#',
    description: 'Data platform based on Dagster of the Fédération Wallone-Bruxelles (FWB) of Belgium. It helps ingest, transform, analyse, monitor and expose data.',
    year_started: 2024,
    categories: [
      { id: 0, title: 'FLOSS', href: '#' },
      { id: 1, title: 'FWB', href: '#' }
    ],
    blog_url: ''
  }

].sort(() => Math.random() - 0.5)
</script>

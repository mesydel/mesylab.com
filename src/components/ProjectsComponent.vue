<template>
    <div class="py-12 sm:py-16">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <!-- Hero Section -->
        <div class="mx-auto mb-12">
          <h1 class="text-5xl font-bold tracking-tight">
            Mesylab <span class="text-secondary">SRL</span>
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-700 max-w-3xl">
            We build intelligent software solutions that transform how organizations work with data.
            Specializing in <span class="font-semibold text-primary">Data Engineering</span>,
            <span class="font-semibold text-primary">Data Science</span>, and
            <span class="font-semibold text-primary">Public Participation</span> platforms,
            we help government institutions and research organizations make sense of complex information.
          </p>
          <div class="mt-6 flex flex-wrap gap-4 items-center">
            <a href="https://www.linkedin.com/in/martinerpicum/" target="_blank" rel="noopener"
               class="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-secondary transition-colors duration-200">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
            <span class="text-gray-300">|</span>
            <a href="https://www.tintamarre.be/" target="_blank" rel="noopener"
               class="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-secondary transition-colors duration-200">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/></svg>
              Blog
            </a>
            <span class="text-gray-400 text-sm ml-2">~ Martin Erpicum</span>
          </div>
        </div>

        <!-- Projects Section -->
        <div class="border-t border-gray-200 pt-10">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Projects</h2>
          <p class="text-gray-600 mb-8 max-w-2xl">
            A selection of projects delivered for Mesylab clients, research partners, and government institutions.
            Interested in collaborating? <a href="mailto:martin@mesylab.com" class="text-primary hover:text-secondary transition-colors">Get in touch</a>.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <article v-for="post in posts" :key="post.id"
                     class="group relative bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg hover:border-secondary/30 transition-all duration-300">

              <!-- Categories -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span v-for="category in post.categories" :key="category.id"
                      :class="getCategoryClass(category.title)"
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                  {{ category.title }}
                </span>
              </div>

              <!-- Title -->
              <h3 class="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors duration-200">
                <a :href="post.href || '#'" class="hover:underline">
                  {{ post.title }}
                </a>
              </h3>

              <!-- Description -->
              <p class="mt-3 text-sm text-gray-600 leading-relaxed line-clamp-3">
                {{ post.description }}
              </p>

              <!-- Footer -->
              <div class="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                <time class="text-xs text-gray-400 font-medium">
                  {{ post.year_started }}<span v-if="!post.year_ended"> - Present</span><span v-else> - {{ post.year_ended }}</span>
                </time>
                <a v-if="post.blog_url" :href="post.blog_url" target="_blank" rel="noopener"
                   class="inline-flex items-center gap-1 text-xs font-medium text-secondary hover:text-primary transition-colors">
                  Learn more
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </template>

<script setup>

const getCategoryClass = (title) => {
  const classes = {
    FLOSS: 'bg-emerald-100 text-emerald-700',
    SaaS: 'bg-blue-100 text-blue-700',
    Research: 'bg-purple-100 text-purple-700',
    Law: 'bg-amber-100 text-amber-700',
    'Social Science': 'bg-gray-100 text-gray-700',
    FWB: 'bg-yellow-100 text-yellow-700',
    PoC: 'bg-gray-100 text-gray-700',
    AI: 'bg-violet-100 text-violet-700',
    Data: 'bg-blue-100 text-blue-700'
  }
  return classes[title] || 'bg-gray-100 text-gray-600'
}

const posts = [
  {
    id: 1,
    title: 'DataProtect',
    href: 'https://github.com/openjusticebe/OJDataProtect',
    description:
        'Open-source GDPR compliance platform enabling organizations to document data processing activities, manage consent records, and generate regulatory reports.',
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
        'University of Liège spin-off providing a comprehensive survey platform for academic research. Features advanced questionnaire design, multi-language support, and statistical analysis tools.',
    year_started: 2014,
    categories: [
      { id: 0, title: 'Research', href: '#' },
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
        'Collaborative document annotation tool for qualitative research. Enables teams to tag, categorize, and analyze large document collections with customizable taxonomies.',
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
        'Interdisciplinary research center at the University of Liège exploring the intersection of law and technology. Focus areas include legal AI, access to justice, and digital rights.',
    year_started: 2020,
    categories: [
      { id: 0, title: 'Research', href: '#' },
      { id: 1, title: 'Law', href: '#' }
    ],
    blog_url: 'https://legaltech.uliege.be/'
  },
  {
    id: 5,
    title: 'Pipelette',
    href: '',
    description:
        'AI-powered analysis tool that leverages large language models to automatically categorize and summarize open-ended survey responses, dramatically reducing manual coding time.',
    year_started: 2022,
    categories: [
      { id: 0, title: 'FWB', href: '#' },
      { id: 1, title: 'AI', href: '#' }
    ],
    blog_url: ''
  },
  {
    id: 6,
    title: 'FileMakerPro Converter',
    href: '',
    description:
        'Web-based utility for migrating legacy FileMaker Pro databases to modern formats. Handles complex field mappings and preserves data integrity during conversion.',
    year_started: 2023,
    categories: [
      { id: 0, title: 'FWB', href: '#' },
      { id: 1, title: 'Data', href: '#' }
    ],
    blog_url: ''
  },
  {
    id: 7,
    title: 'Houtsitrue API',
    href: '',
    description:
        'Belgian identity and address validation service. Verifies national registry numbers, enriches postal addresses, and integrates with government databases for accurate citizen data.',
    year_started: 2024,
    categories: [
      { id: 0, title: 'FWB', href: '#' },
      { id: 1, title: 'Data', href: '#' }
    ],
    blog_url: ''
  },
  {
    id: 8,
    title: 'Ciboulot API',
    href: '',
    description:
        'Retrieval-Augmented Generation (RAG) service that ingests and vectorizes documents, exposing them through a Model Context Protocol (MCP) API for intelligent document querying.',
    year_started: 2024,
    categories: [
      { id: 0, title: 'FWB', href: '#' },
      { id: 1, title: 'AI', href: '#' }
    ],
    blog_url: ''
  },
  {
    id: 9,
    title: 'Subventions API',
    href: '',
    description:
        'Open data API providing programmatic access to subsidies and grants awarded by the Fédération Wallonie-Bruxelles, enabling transparency and public accountability.',
    year_started: 2023,
    categories: [
      { id: 0, title: 'FWB', href: '#' },
      { id: 1, title: 'Data', href: '#' }
    ],
    blog_url: ''
  },
  {
    id: 10,
    title: 'Maider',
    href: '',
    description:
        'Proof-of-concept citizen assistance service helping Walloon residents navigate administrative procedures and understand their rights through an accessible digital interface.',
    year_started: 2022,
    year_ended: 2023,
    categories: [
      { id: 0, title: 'PoC', href: '#' }
    ],
    blog_url: ''
  },
  {
    id: 11,
    title: 'Subventions Portal',
    href: 'https://subventions.datawb.be',
    description:
        'Public-facing dashboard visualizing FWB subsidy allocations. Features interactive charts, searchable beneficiary lists, and downloadable datasets for journalists and researchers.',
    year_started: 2023,
    categories: [
      { id: 0, title: 'FWB', href: '#' },
      { id: 1, title: 'Data', href: '#' }
    ],
    blog_url: ''
  },
  {
    id: 12,
    title: 'Marches ADEPS',
    href: 'https://marches-adeps.datawb.be',
    description:
        'Interactive platform listing organized walking events (marches) across the Fédération Wallonie-Bruxelles. Includes route maps, difficulty ratings, and registration information.',
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
    description:
        'Enterprise data orchestration platform built on Dagster for the Fédération Wallonie-Bruxelles. Manages ETL pipelines, data quality monitoring, and serves as the backbone for open data initiatives.',
    year_started: 2024,
    categories: [
      { id: 0, title: 'FLOSS', href: '#' },
      { id: 1, title: 'FWB', href: '#' },
      { id: 2, title: 'Data', href: '#' }
    ],
    blog_url: ''
  }

].sort(() => Math.random() - 0.5)
</script>

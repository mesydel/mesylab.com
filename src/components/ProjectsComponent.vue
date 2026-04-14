<template>
    <div class="py-12 sm:py-16">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <!-- Hero Section -->
        <div class="mx-auto mb-12">
          <div class="flex items-start justify-between">
            <h1 class="text-5xl font-bold tracking-tight">
              Mesylab <span class="text-secondary">SRL</span>
            </h1>
            <LogoComponent class="h-28 w-auto" />
          </div>
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
            <a href="/blog/"
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
            <article v-for="post in projectPosts" :id="`project-${post.slug}`" :key="post.slug"
                     class="group relative bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg hover:border-secondary/30 transition-all duration-300">

              <!-- Categories -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span v-for="category in post.categories" :key="category"
                      :class="getCategoryClass(category)"
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                  {{ category }}
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

        <div class="border-t border-gray-200 pt-10 mt-10">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 class="text-2xl font-bold text-gray-900">From the blog</h2>
              <p class="text-gray-600 max-w-2xl">
              </p>
            </div>
            <a href="/blog/" class="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-secondary transition-colors">
              Browse all posts
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          <p v-if="isLoadingBlog" class="mt-6 text-sm text-gray-500">
            Loading the latest posts...
          </p>

          <p v-else-if="blogError" class="mt-6 text-sm text-error">
            {{ blogError }}
          </p>

          <div v-else-if="latestPosts.length" class="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <article
              v-for="post in latestPosts"
              :key="post.slug"
              class="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <div class="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                <time>{{ formatPostDate(post.date) }}</time>
                <a
                  v-if="post.project"
                  :href="post.project.url"
                  class="font-medium text-primary hover:text-secondary transition-colors"
                >
                  {{ post.project.title }}
                </a>
                <span
                  v-for="tag in post.tags"
                  :key="tag"
                  class="rounded-full bg-gray-100 px-2.5 py-1 font-medium text-gray-600"
                >
                  {{ tag }}
                </span>
              </div>
              <h3 class="mt-4 text-lg font-semibold text-gray-900">
                <a :href="post.url" class="hover:text-primary transition-colors">
                  {{ post.title }}
                </a>
              </h3>
              <p class="mt-3 text-sm leading-6 text-gray-600">
                {{ post.description }}
              </p>
            </article>
          </div>

          <p v-else class="mt-6 text-sm text-gray-500">
            No blog posts have been published yet.
          </p>
        </div>
      </div>
    </div>
  </template>

<script setup>
import { onMounted, ref } from 'vue'
import LogoComponent from './LogoComponent.vue'
import projects from '../data/projects.json'

const getCategoryClass = (title) => {
  const classes = {
    FLOSS: 'bg-emerald-100 text-emerald-700',
    SaaS: 'bg-blue-100 text-blue-700',
    Research: 'bg-sky-100 text-sky-700',
    Law: 'bg-amber-100 text-amber-700',
    'Social Science': 'bg-gray-100 text-gray-700',
    FWB: 'bg-slate-100 text-slate-700',
    PoC: 'bg-gray-100 text-gray-700',
    AI: 'bg-violet-100 text-violet-700',
    Data: 'bg-blue-100 text-blue-700'
  }
  return classes[title] || 'bg-gray-100 text-gray-600'
}

const latestPosts = ref([])
const isLoadingBlog = ref(true)
const blogError = ref('')

const formatPostDate = (value) => {
  const parsedDate = new Date(value)

  if (Number.isNaN(parsedDate.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(parsedDate)
}

const loadLatestPosts = async () => {
  try {
    const response = await fetch('/blog/index.json', {
      headers: {
        Accept: 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to load blog index (${response.status})`)
    }

    const posts = await response.json()
    latestPosts.value = posts.slice(0, 3)
  } catch (error) {
    console.error(error)
    blogError.value = 'The blog index is temporarily unavailable.'
  } finally {
    isLoadingBlog.value = false
  }
}

onMounted(() => {
  loadLatestPosts()
})

const projectPosts = [...projects].sort(() => Math.random() - 0.5)
</script>

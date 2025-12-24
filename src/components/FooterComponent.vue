<template>
  <footer class="bg-gray-50 border-t border-gray-200">
    <div class="mx-auto max-w-7xl px-6 py-8 lg:px-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <!-- Company Info -->
        <div class="flex items-center gap-3">
          <div class="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span class="text-white font-bold text-sm">M</span>
          </div>
          <div>
            <p class="text-sm font-semibold text-gray-900">{{ company }}</p>
            <p class="text-xs text-gray-500">VAT: BE 0685.595.109</p>
          </div>
        </div>

        <!-- Address -->
        <div class="flex items-center gap-2 text-gray-500">
          <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <span class="text-xs">Rue Robespierre 6, 4140 Sprimont, Belgium</span>
        </div>

        <!-- Copyright -->
        <p class="text-xs text-gray-400">
          &copy; {{ new Date().getFullYear() }} {{ company }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
defineProps({
  company: String
})
</script>

const path = require('path')

const { blogMeta, projectMap } = require('./config')

const escapeHtml = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;')

const stripMarkdown = (value) => value
  .replace(/```[\s\S]*?```/g, ' ')
  .replace(/`([^`]+)`/g, '$1')
  .replace(/!\[[^\]]*]\(([^)]+)\)/g, ' ')
  .replace(/\[([^\]]+)]\(([^)]+)\)/g, '$1')
  .replace(/[*_>#-]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()

const createSlug = (relativePath) => {
  const withoutExtension = relativePath.replace(/\.[^.]+$/, '')

  return withoutExtension
    .split('/')
    .map((segment) => segment
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, ''))
    .filter(Boolean)
    .join('-')
}

const splitUrl = (value) => {
  const match = value.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/)

  return {
    pathname: match?.[1] || '',
    query: match?.[2] || '',
    hash: match?.[3] || ''
  }
}

const isExternalUrl = (value) => /^(?:[a-z]+:|\/\/|#)/i.test(value)

const rewriteContentUrl = (rawValue, relativeMarkdownPath) => {
  if (!rawValue || isExternalUrl(rawValue) || rawValue.startsWith('/')) {
    return rawValue
  }

  const sourceDirectory = path.posix.dirname(relativeMarkdownPath)
  const { pathname, query, hash } = splitUrl(rawValue)
  const normalizedPath = path.posix.normalize(path.posix.join(sourceDirectory, pathname))

  if (!normalizedPath || normalizedPath.startsWith('../')) {
    return rawValue
  }

  if (normalizedPath.endsWith('.md')) {
    return `/blog/${createSlug(normalizedPath)}/${hash}`
  }

  return `/blog/${normalizedPath}${query}${hash}`
}

const formatDisplayDate = (value) => {
  const parsedDate = new Date(value)

  if (Number.isNaN(parsedDate.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(parsedDate)
}

const parseDateValue = (value) => {
  if (!value) {
    return 0
  }

  const parsedDate = new Date(value)

  if (Number.isNaN(parsedDate.getTime())) {
    return 0
  }

  return parsedDate.getTime()
}

const normalizeDateValue = (value) => {
  if (!value) {
    return ''
  }

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10)
  }

  return String(value).trim()
}

const createExcerpt = (content, fallbackTitle) => {
  const plainText = stripMarkdown(content)

  if (!plainText) {
    return fallbackTitle
  }

  return plainText.length > 180
    ? `${plainText.slice(0, 177).trimEnd()}...`
    : plainText
}

const createCanonicalUrl = (pathname) => pathname

const resolveProjectReference = (value) => {
  if (typeof value !== 'string' || !value.trim()) {
    return null
  }

  const slug = value.trim()
  const project = projectMap.get(slug)

  if (!project) {
    throw new Error(`Unknown project reference in blog metadata: ${slug}`)
  }

  return {
    slug,
    title: project.title,
    url: `${blogMeta.homeUrl}#project-${slug}`
  }
}

module.exports = {
  createCanonicalUrl,
  createExcerpt,
  createSlug,
  escapeHtml,
  formatDisplayDate,
  normalizeDateValue,
  parseDateValue,
  resolveProjectReference,
  rewriteContentUrl,
  splitUrl
}

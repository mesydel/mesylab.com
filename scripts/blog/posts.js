const fs = require('fs')
const path = require('path')

const matter = require('gray-matter')

const { blogSourceDir, markdownImageExtensions } = require('./config')
const { toPosixPath } = require('./file-system')
const { createMarkdownRenderer, sanitizeRenderedHtml } = require('./markdown')
const {
  createExcerpt,
  createSlug,
  formatDisplayDate,
  normalizeDateValue,
  parseDateValue,
  resolveProjectReference,
  rewriteContentUrl,
  splitUrl
} = require('./utils')

const buildPost = (markdownFilePath) => {
  const relativePath = toPosixPath(path.relative(blogSourceDir, markdownFilePath))
  const source = fs.readFileSync(markdownFilePath, 'utf8')
  const { data, content } = matter(source)
  const title = typeof data.title === 'string' && data.title.trim()
    ? data.title.trim()
    : path.basename(relativePath, path.extname(relativePath))
  const slug = typeof data.slug === 'string' && data.slug.trim()
    ? createSlug(data.slug.trim())
    : createSlug(relativePath)
  const description = typeof data.description === 'string' && data.description.trim()
    ? data.description.trim()
    : createExcerpt(content, title)
  const normalizedDate = normalizeDateValue(data.date)
  const tags = Array.isArray(data.tags)
    ? data.tags.filter((tag) => typeof tag === 'string' && tag.trim()).map((tag) => tag.trim())
    : []
  const project = resolveProjectReference(data.project)
  const image = typeof data.image === 'string' && data.image.trim()
    ? rewriteContentUrl(data.image.trim(), relativePath)
    : null
  const renderer = createMarkdownRenderer(relativePath)
  const html = sanitizeRenderedHtml(renderer.render(content))
  const url = `/blog/${slug}/`

  return {
    title,
    slug,
    url,
    date: normalizedDate,
    displayDate: normalizedDate ? formatDisplayDate(normalizedDate) : '',
    dateOrder: normalizedDate ? parseDateValue(normalizedDate) : 0,
    description,
    tags,
    project,
    image,
    draft: data.draft === true,
    html
  }
}

const validatePosts = (posts) => {
  const seenSlugs = new Set()

  posts.forEach((post) => {
    if (seenSlugs.has(post.slug)) {
      throw new Error(`Duplicate blog slug detected: ${post.slug}`)
    }

    seenSlugs.add(post.slug)

    if (post.image) {
      const { pathname } = splitUrl(post.image)
      const extension = path.extname(pathname).toLowerCase()

      if (extension && !markdownImageExtensions.has(extension)) {
        throw new Error(`Unsupported blog image extension for ${post.slug}: ${extension}`)
      }
    }
  })
}

module.exports = {
  buildPost,
  validatePosts
}

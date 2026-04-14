const fs = require('fs')
const path = require('path')

const matter = require('gray-matter')
const MarkdownIt = require('markdown-it')
const sanitizeHtml = require('sanitize-html')

const rootDir = path.resolve(__dirname, '..')
const blogSourceDir = path.join(rootDir, 'blog')
const blogOutputDir = path.join(rootDir, 'public', 'blog')
const projects = require(path.join(rootDir, 'src', 'data', 'projects.json'))

const blogMeta = {
  siteName: 'Mesylab SRL',
  homeUrl: '/',
  blogUrl: '/blog/',
  logoUrl: '/mesylab-logo.svg',
  themeCssUrl: '/blog-theme.css',
  blogTitle: 'Mesylab Blog',
  blogDescription: 'Notes and project writing published from simple Markdown files.'
}

const excludeDrafts = process.env.BLOG_EXCLUDE_DRAFTS === 'true'
const projectMap = new Map(projects.map((project) => [project.slug, project]))

const markdownImageExtensions = new Set([
  '.avif',
  '.gif',
  '.jpeg',
  '.jpg',
  '.png',
  '.svg',
  '.webp'
])

const walkDirectory = (directoryPath) => {
  if (!fs.existsSync(directoryPath)) {
    return []
  }

  return fs.readdirSync(directoryPath, { withFileTypes: true })
    .sort((left, right) => left.name.localeCompare(right.name))
    .flatMap((entry) => {
      const absolutePath = path.join(directoryPath, entry.name)

      if (entry.isDirectory()) {
        return walkDirectory(absolutePath)
      }

      return [absolutePath]
    })
}

const ensureDirectory = (directoryPath) => {
  fs.mkdirSync(directoryPath, { recursive: true })
}

const writeFile = (filePath, contents) => {
  ensureDirectory(path.dirname(filePath))
  fs.writeFileSync(filePath, contents)
}

const toPosixPath = (value) => value.split(path.sep).join('/')

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

const createMarkdownRenderer = (relativeMarkdownPath) => {
  const renderer = new MarkdownIt({
    html: false,
    linkify: true,
    typographer: true
  })

  const defaultImageRule = renderer.renderer.rules.image
  const defaultLinkOpenRule = renderer.renderer.rules.link_open

  renderer.renderer.rules.image = (tokens, index, options, env, self) => {
    const token = tokens[index]
    const source = token.attrGet('src')

    if (source) {
      token.attrSet('src', rewriteContentUrl(source, relativeMarkdownPath))
      token.attrSet('loading', 'lazy')
      token.attrSet('decoding', 'async')
    }

    if (defaultImageRule) {
      return defaultImageRule(tokens, index, options, env, self)
    }

    return self.renderToken(tokens, index, options)
  }

  renderer.renderer.rules.link_open = (tokens, index, options, env, self) => {
    const token = tokens[index]
    const href = token.attrGet('href')

    if (href) {
      token.attrSet('href', rewriteContentUrl(href, relativeMarkdownPath))
    }

    if (defaultLinkOpenRule) {
      return defaultLinkOpenRule(tokens, index, options, env, self)
    }

    return self.renderToken(tokens, index, options)
  }

  return renderer
}

const sanitizeRenderedHtml = (html) => sanitizeHtml(html, {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat([
    'img',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'table',
    'thead',
    'tbody',
    'tr',
    'th',
    'td',
    'del'
  ]),
  allowedAttributes: {
    a: ['href', 'name', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'loading', 'decoding']
  },
  allowedSchemes: ['http', 'https', 'mailto', 'tel', 'data'],
  transformTags: {
    a: (tagName, attributes) => ({
      tagName,
      attribs: {
        ...attributes,
        rel: 'noopener noreferrer'
      }
    })
  }
})

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

const buildIndexPage = (posts) => {
  const cards = posts.length
    ? posts.map((post) => `
      <article class="blog-card">
        <div class="blog-card__header">
          <div class="blog-card__meta">
            ${post.displayDate ? `<time datetime="${escapeHtml(post.date)}">${escapeHtml(post.displayDate)}</time>` : ''}
          </div>
          ${post.project ? `<a class="blog-project-badge" href="${escapeHtml(post.project.url)}">${escapeHtml(post.project.title)}</a>` : ''}
        </div>
        <h2><a href="${escapeHtml(post.url)}">${escapeHtml(post.title)}</a></h2>
        <p>${escapeHtml(post.description)}</p>
        ${post.tags.length ? `
          <div class="blog-card__tags">
            <div class="blog-tags">
              ${post.tags.map((tag) => `<span class="blog-tag">${escapeHtml(tag)}</span>`).join('')}
            </div>
          </div>
        ` : ''}
        <div class="blog-card__footer">
          <a href="${escapeHtml(post.url)}">Read the post</a>
        </div>
      </article>
    `).join('')
    : '<div class="blog-empty">No posts have been published yet.</div>'

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(blogMeta.blogTitle)} | ${escapeHtml(blogMeta.siteName)}</title>
    <meta name="description" content="${escapeHtml(blogMeta.blogDescription)}">
    <link rel="canonical" href="${escapeHtml(createCanonicalUrl(blogMeta.blogUrl))}">
    <meta property="og:title" content="${escapeHtml(blogMeta.blogTitle)}">
    <meta property="og:description" content="${escapeHtml(blogMeta.blogDescription)}">
    <meta property="og:type" content="website">
    <link rel="stylesheet" href="${blogMeta.themeCssUrl}">
  </head>
  <body>
    <div class="blog-shell">
      <main class="blog-main">
        <header class="blog-header">
          <div class="blog-index-hero">
            <div class="blog-index-hero__heading">
              <h1 class="blog-index-title">
                Mesylab <span class="blog-index-title__accent">Blog</span>
              </h1>
              <p class="blog-summary">${escapeHtml(blogMeta.blogDescription)}</p>
              <div class="blog-index-links">
                <a href="${blogMeta.homeUrl}">Home</a>
                <span>|</span>
                <a href="https://www.linkedin.com/in/martinerpicum/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>
            <a class="blog-index-hero__logo-link" href="${blogMeta.homeUrl}" aria-label="Back to ${escapeHtml(blogMeta.siteName)}">
              <img class="blog-index-hero__logo" src="${blogMeta.logoUrl}" alt="${escapeHtml(blogMeta.siteName)}">
            </a>
          </div>
        </header>

        <section id="all-posts" class="blog-content">
          <div class="blog-section-heading">
            <div>
              <p class="blog-section-heading__eyebrow">Archive</p>
              <h2 class="blog-section-heading__title">All posts</h2>
            </div>
            <p class="blog-section-heading__copy">${posts.length} published post${posts.length === 1 ? '' : 's'}</p>
          </div>
          <div class="blog-grid">
            ${cards}
          </div>
        </section>
      </main>

      <footer class="blog-footer">
        <div class="blog-footer__inner">
          <p>&copy; ${new Date().getFullYear()} ${escapeHtml(blogMeta.siteName)}</p>
          <div class="blog-footer__links">
            <a href="${blogMeta.homeUrl}">Home</a>
          </div>
        </div>
      </footer>
    </div>
  </body>
</html>
`
}

const buildPostPage = (post) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(post.title)} | ${escapeHtml(blogMeta.siteName)}</title>
    <meta name="description" content="${escapeHtml(post.description)}">
    <link rel="canonical" href="${escapeHtml(createCanonicalUrl(post.url))}">
    <meta property="og:title" content="${escapeHtml(post.title)}">
    <meta property="og:description" content="${escapeHtml(post.description)}">
    <meta property="og:type" content="article">
    ${post.date ? `<meta property="article:published_time" content="${escapeHtml(post.date)}">` : ''}
    ${post.image ? `<meta property="og:image" content="${escapeHtml(post.image)}">` : ''}
    <link rel="stylesheet" href="${blogMeta.themeCssUrl}">
  </head>
  <body>
    <div class="blog-shell">
      <main class="blog-main">
        <header class="blog-header">
          <div class="blog-topbar">
            <a class="blog-brand" href="${blogMeta.homeUrl}" aria-label="Back to ${escapeHtml(blogMeta.siteName)}">
              <img class="blog-logo" src="${blogMeta.logoUrl}" alt="${escapeHtml(blogMeta.siteName)}">
              <span class="blog-brand__text">${escapeHtml(blogMeta.siteName)}</span>
            </a>
            <nav class="blog-nav" aria-label="Blog navigation">
              <a href="${blogMeta.blogUrl}">All posts</a>
            </nav>
          </div>
        </header>

        <section class="blog-content">
          <div class="blog-backlink">
            <a href="${blogMeta.blogUrl}">Back to all posts</a>
          </div>
          <article class="blog-article">
            <div class="blog-article__header">
              <div class="blog-article__heading">
                <p class="blog-eyebrow">Mesylab</p>
                <h1 class="blog-title">${escapeHtml(post.title)}</h1>
              </div>
              ${post.project ? `
                <a class="blog-project-badge" href="${escapeHtml(post.project.url)}">${escapeHtml(post.project.title)}</a>
              ` : ''}
            </div>
            <div class="blog-post-meta">
              ${post.displayDate ? `<time datetime="${escapeHtml(post.date)}">${escapeHtml(post.displayDate)}</time>` : ''}
              ${post.tags.length ? `
                <div class="blog-tags">
                  ${post.tags.map((tag) => `<span class="blog-tag">${escapeHtml(tag)}</span>`).join('')}
                </div>
              ` : ''}
            </div>
            ${post.image ? `
              <figure class="blog-hero-image">
                <img src="${escapeHtml(post.image)}" alt="${escapeHtml(post.title)}">
              </figure>
            ` : ''}
            <div class="blog-prose">
              ${post.html}
            </div>
          </article>
        </section>
      </main>

      <footer class="blog-footer">
        <div class="blog-footer__inner">
          <p><a href="${blogMeta.blogUrl}">Back to the blog index</a></p>
          <div class="blog-footer__links">
            <a href="${blogMeta.homeUrl}">Home</a>
          </div>
        </div>
      </footer>
    </div>
  </body>
</html>
`

const copyAssets = (sourceFiles) => {
  sourceFiles
    .filter((filePath) => path.extname(filePath).toLowerCase() !== '.md')
    .forEach((filePath) => {
      const relativePath = path.relative(blogSourceDir, filePath)
      const outputPath = path.join(blogOutputDir, relativePath)

      ensureDirectory(path.dirname(outputPath))
      fs.copyFileSync(filePath, outputPath)
    })
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

const generateBlog = () => {
  const sourceFiles = walkDirectory(blogSourceDir)
  const markdownFiles = sourceFiles.filter((filePath) => path.extname(filePath).toLowerCase() === '.md')

  fs.rmSync(blogOutputDir, { recursive: true, force: true })
  ensureDirectory(blogOutputDir)

  copyAssets(sourceFiles)

  const posts = markdownFiles
    .map(buildPost)
    .filter((post) => !excludeDrafts || !post.draft)
    .sort((left, right) => {
      if (right.dateOrder !== left.dateOrder) {
        return right.dateOrder - left.dateOrder
      }

      return left.title.localeCompare(right.title)
    })

  validatePosts(posts)

  const postIndex = posts.map(({ dateOrder, html, draft, displayDate, ...post }) => post)

  writeFile(path.join(blogOutputDir, 'index.json'), `${JSON.stringify(postIndex, null, 2)}\n`)
  writeFile(path.join(blogOutputDir, 'index.html'), buildIndexPage(posts))

  posts.forEach((post) => {
    writeFile(path.join(blogOutputDir, post.slug, 'index.html'), buildPostPage(post))
  })
}

generateBlog()

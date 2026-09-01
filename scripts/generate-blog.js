const fs = require('fs')
const path = require('path')

const { blogOutputDir, blogSourceDir, rootDir } = require('./blog/config')
const { ensureDirectory, walkDirectory, writeFile } = require('./blog/file-system')
const { buildPost, validatePosts } = require('./blog/posts')
const { buildIndexPage, buildPostPage, buildProjectPage } = require('./blog/templates')
const { toAbsoluteUrl } = require('./blog/utils')

const publicDir = path.join(rootDir, 'public')

const buildSitemap = (posts, projectsWithPosts) => {
  const entries = [
    { loc: '/', changefreq: 'monthly', priority: '0.8' },
    { loc: '/blog/', changefreq: 'weekly', priority: '0.7' },
    ...projectsWithPosts.map((project) => ({
      loc: `/blog/project/${project.slug}/`, changefreq: 'weekly', priority: '0.5'
    })),
    ...posts.map((post) => ({
      loc: post.url, lastmod: post.date || undefined, changefreq: 'yearly', priority: '0.6'
    }))
  ]

  const urls = entries.map((entry) => [
    '  <url>',
    `    <loc>${toAbsoluteUrl(entry.loc)}</loc>`,
    entry.lastmod ? `    <lastmod>${entry.lastmod}</lastmod>` : null,
    `    <changefreq>${entry.changefreq}</changefreq>`,
    `    <priority>${entry.priority}</priority>`,
    '  </url>'
  ].filter(Boolean).join('\n')).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

const buildRobots = () => `User-agent: *
Allow: /

Sitemap: ${toAbsoluteUrl('/sitemap.xml')}
`

const buildProjectsWithPosts = (posts) => {
  const byslug = new Map()

  posts.forEach((post) => {
    if (!post.project) {
      return
    }

    const existing = byslug.get(post.project.slug)

    if (existing) {
      existing.count += 1
    } else {
      byslug.set(post.project.slug, {
        slug: post.project.slug,
        title: post.project.title,
        filterUrl: `/blog/project/${post.project.slug}/`,
        count: 1
      })
    }
  })

  return [...byslug.values()].sort((left, right) => {
    if (right.count !== left.count) {
      return right.count - left.count
    }

    return left.title.localeCompare(right.title)
  })
}

const excludeDrafts = process.env.BLOG_EXCLUDE_DRAFTS === 'true'

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

const sortPosts = (posts) => posts.sort((left, right) => {
  if (right.dateOrder !== left.dateOrder) {
    return right.dateOrder - left.dateOrder
  }

  return left.title.localeCompare(right.title)
})

const generateBlog = () => {
  const sourceFiles = walkDirectory(blogSourceDir)
  const markdownFiles = sourceFiles.filter((filePath) => path.extname(filePath).toLowerCase() === '.md')

  fs.rmSync(blogOutputDir, { recursive: true, force: true })
  ensureDirectory(blogOutputDir)

  copyAssets(sourceFiles)

  const posts = sortPosts(
    markdownFiles
      .map(buildPost)
      .filter((post) => !excludeDrafts || !post.draft)
  )

  validatePosts(posts)

  const postIndex = posts.map(({ dateOrder, html, draft, displayDate, ...post }) => post)

  const projectsWithPosts = buildProjectsWithPosts(posts)

  writeFile(path.join(blogOutputDir, 'index.json'), `${JSON.stringify(postIndex, null, 2)}\n`)
  writeFile(path.join(blogOutputDir, 'index.html'), buildIndexPage(posts, projectsWithPosts))

  posts.forEach((post) => {
    writeFile(path.join(blogOutputDir, post.slug, 'index.html'), buildPostPage(post))
  })

  projectsWithPosts.forEach((project) => {
    const projectPosts = posts.filter((post) => post.project && post.project.slug === project.slug)

    writeFile(
      path.join(blogOutputDir, 'project', project.slug, 'index.html'),
      buildProjectPage(projectPosts, project, projectsWithPosts, posts.length)
    )
  })

  writeFile(path.join(publicDir, 'sitemap.xml'), buildSitemap(posts, projectsWithPosts))
  writeFile(path.join(publicDir, 'robots.txt'), buildRobots())
}

generateBlog()

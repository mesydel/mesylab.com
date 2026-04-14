const fs = require('fs')
const path = require('path')

const { blogOutputDir, blogSourceDir } = require('./blog/config')
const { ensureDirectory, walkDirectory, writeFile } = require('./blog/file-system')
const { buildPost, validatePosts } = require('./blog/posts')
const { buildIndexPage, buildPostPage } = require('./blog/templates')

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

  writeFile(path.join(blogOutputDir, 'index.json'), `${JSON.stringify(postIndex, null, 2)}\n`)
  writeFile(path.join(blogOutputDir, 'index.html'), buildIndexPage(posts))

  posts.forEach((post) => {
    writeFile(path.join(blogOutputDir, post.slug, 'index.html'), buildPostPage(post))
  })
}

generateBlog()

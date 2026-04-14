const path = require('path')

const rootDir = path.resolve(__dirname, '..', '..')
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
  blogDescription: 'Small notes and project writing.'
}

const markdownImageExtensions = new Set([
  '.avif',
  '.gif',
  '.jpeg',
  '.jpg',
  '.png',
  '.svg',
  '.webp'
])

const projectMap = new Map(projects.map((project) => [project.slug, project]))

module.exports = {
  blogMeta,
  blogOutputDir,
  blogSourceDir,
  markdownImageExtensions,
  projectMap,
  rootDir
}

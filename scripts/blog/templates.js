const { blogMeta } = require('./config')
const { escapeHtml, toAbsoluteUrl } = require('./utils')

const OG_LOCALE = { fr: 'fr_FR', en: 'en_US' }

// Shared <head> content (SEO + Open Graph + Twitter) for every page kind.
// `extra` holds page-specific tags (article metadata, JSON-LD).
const renderHead = ({ title, description, canonical, ogType, locale, image, twitterCard, extra = '' }) => `
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)} | ${escapeHtml(blogMeta.siteName)}</title>
    <meta name="description" content="${escapeHtml(description)}">
    <meta name="robots" content="index, follow, max-image-preview:large">
    <link rel="canonical" href="${escapeHtml(canonical)}">
    <meta property="og:type" content="${ogType}">
    <meta property="og:site_name" content="${escapeHtml(blogMeta.siteName)}">
    <meta property="og:locale" content="${locale}">
    <meta property="og:url" content="${escapeHtml(canonical)}">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    ${image ? `<meta property="og:image" content="${escapeHtml(image)}">` : ''}
    <meta name="twitter:card" content="${twitterCard}">
    <meta name="twitter:title" content="${escapeHtml(title)}">
    <meta name="twitter:description" content="${escapeHtml(description)}">
    ${image ? `<meta name="twitter:image" content="${escapeHtml(image)}">` : ''}
    ${extra}
    <link rel="stylesheet" href="${blogMeta.themeCssUrl}">`

// Serialise a JSON-LD object, escaping '<' so it can't break out of the script tag.
const renderJsonLd = (data) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`

const buildArticleJsonLd = (post) => {
  const url = toAbsoluteUrl(post.url)
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    inLanguage: post.lang || 'en',
    datePublished: post.date || undefined,
    dateModified: post.date || undefined,
    author: post.author
      ? { '@type': 'Person', name: post.author }
      : { '@type': 'Organization', name: blogMeta.siteName },
    publisher: {
      '@type': 'Organization',
      name: blogMeta.siteName,
      logo: { '@type': 'ImageObject', url: toAbsoluteUrl(blogMeta.logoUrl) }
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url
  }

  if (post.image) {
    data.image = [toAbsoluteUrl(post.image)]
  }

  if (post.tags && post.tags.length) {
    data.keywords = post.tags.join(', ')
  }

  return renderJsonLd(data)
}

const renderTags = (tags) => tags
  .map((tag) => `<span class="blog-tag">${escapeHtml(tag)}</span>`)
  .join('')

const renderMeta = (post) => `
          <div class="blog-card__meta">
            ${post.displayDate ? `<time datetime="${escapeHtml(post.date)}">${escapeHtml(post.displayDate)}</time>` : ''}
            ${post.author ? `<span class="blog-author">By ${escapeHtml(post.author)}</span>` : ''}
            ${post.readingTime ? `<span class="blog-readtime">${post.readingTime} min read</span>` : ''}
          </div>`

const renderThumb = (post, extraClass = '') => post.cardImage
  ? `<a class="blog-card__media ${extraClass}" href="${escapeHtml(post.url)}" tabindex="-1" aria-hidden="true">
        <img src="${escapeHtml(post.cardImage)}" alt="" loading="lazy" decoding="async">
      </a>`
  : `<a class="blog-card__media blog-card__media--placeholder ${extraClass}" href="${escapeHtml(post.url)}" tabindex="-1" aria-hidden="true">
        <span>${escapeHtml((post.title || '?').trim().charAt(0).toUpperCase())}</span>
      </a>`

const renderPostCard = (post) => `
      <article class="blog-card">
        ${renderThumb(post)}
        <div class="blog-card__body">
          <div class="blog-card__header">
            ${renderMeta(post)}
            ${post.project ? `<a class="blog-project-badge" href="${escapeHtml(post.project.url)}">${escapeHtml(post.project.title)}</a>` : ''}
          </div>
          <h2><a href="${escapeHtml(post.url)}">${escapeHtml(post.title)}</a></h2>
          <p>${escapeHtml(post.description)}</p>
          ${post.tags.length ? `
            <div class="blog-card__tags">
              <div class="blog-tags">
                ${renderTags(post.tags)}
              </div>
            </div>
          ` : ''}
          <div class="blog-card__footer">
            <a href="${escapeHtml(post.url)}">Read the post</a>
          </div>
        </div>
      </article>
    `

const renderFeaturedCard = (post) => `
      <article class="blog-featured">
        ${renderThumb(post, 'blog-featured__media')}
        <div class="blog-featured__body">
          <div class="blog-card__header">
            ${renderMeta(post)}
            ${post.project ? `<a class="blog-project-badge" href="${escapeHtml(post.project.url)}">${escapeHtml(post.project.title)}</a>` : ''}
          </div>
          <h2 class="blog-featured__title"><a href="${escapeHtml(post.url)}">${escapeHtml(post.title)}</a></h2>
          <p class="blog-featured__excerpt">${escapeHtml(post.description)}</p>
          ${post.tags.length ? `<div class="blog-tags">${renderTags(post.tags)}</div>` : ''}
          <div class="blog-card__footer">
            <a href="${escapeHtml(post.url)}">Read the post</a>
          </div>
        </div>
      </article>
    `

const renderChips = (projectsWithPosts, activeSlug, totalCount) => `
          <nav class="blog-chips" aria-label="Filter posts by project">
            <a class="blog-chip${activeSlug ? '' : ' is-active'}" href="${blogMeta.blogUrl}">All<span class="blog-chip__count">${totalCount}</span></a>
            ${projectsWithPosts.map((project) => `
            <a class="blog-chip${activeSlug === project.slug ? ' is-active' : ''}" href="${escapeHtml(project.filterUrl)}">${escapeHtml(project.title)}<span class="blog-chip__count">${project.count}</span></a>`).join('')}
          </nav>`

const listingHead = (pageTitle, pageDescription, canonicalUrl) => `<!DOCTYPE html>
<html lang="en">
  <head>${renderHead({
    title: pageTitle,
    description: pageDescription,
    canonical: toAbsoluteUrl(canonicalUrl),
    ogType: 'website',
    locale: OG_LOCALE.en,
    twitterCard: 'summary'
  })}
  </head>`

const buildListingPage = ({ posts, activeProject, projectsWithPosts, totalCount, canonicalUrl }) => {
  const heading = activeProject ? activeProject.title : 'All posts'
  const eyebrow = activeProject ? 'Project' : 'Archive'
  const pageTitle = activeProject ? `${activeProject.title} posts` : blogMeta.blogTitle
  const pageDescription = activeProject
    ? `Posts about ${activeProject.title} from ${blogMeta.siteName}.`
    : blogMeta.blogDescription
  const useFeatured = posts.length >= 3
  const featured = useFeatured ? posts[0] : null
  const gridPosts = useFeatured ? posts.slice(1) : posts

  const body = posts.length
    ? `${featured ? renderFeaturedCard(featured) : ''}
          <div class="blog-grid">
            ${gridPosts.map(renderPostCard).join('')}
          </div>`
    : '<div class="blog-empty">No posts have been published yet.</div>'

  return `${listingHead(pageTitle, pageDescription, canonicalUrl)}
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
              <p class="blog-section-heading__eyebrow">${escapeHtml(eyebrow)}</p>
              <h2 class="blog-section-heading__title">${escapeHtml(heading)}</h2>
            </div>
            <p class="blog-section-heading__copy">${posts.length} post${posts.length === 1 ? '' : 's'}</p>
          </div>
          ${renderChips(projectsWithPosts, activeProject ? activeProject.slug : null, totalCount)}
          ${body}
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

const buildIndexPage = (posts, projectsWithPosts) => buildListingPage({
  posts,
  activeProject: null,
  projectsWithPosts,
  totalCount: posts.length,
  canonicalUrl: blogMeta.blogUrl
})

const buildProjectPage = (posts, project, projectsWithPosts, totalCount) => buildListingPage({
  posts,
  activeProject: project,
  projectsWithPosts,
  totalCount,
  canonicalUrl: project.filterUrl
})

const buildPostPage = (post) => {
  const canonical = toAbsoluteUrl(post.url)
  const absImage = post.image ? toAbsoluteUrl(post.image) : null

  const articleMeta = [
    post.author && `<meta name="author" content="${escapeHtml(post.author)}">`,
    post.tags.length && `<meta name="keywords" content="${escapeHtml(post.tags.join(', '))}">`,
    post.date && `<meta property="article:published_time" content="${escapeHtml(post.date)}">`,
    post.date && `<meta property="article:modified_time" content="${escapeHtml(post.date)}">`,
    post.author && `<meta property="article:author" content="${escapeHtml(post.author)}">`,
    post.project && `<meta property="article:section" content="${escapeHtml(post.project.title)}">`,
    ...post.tags.map((tag) => `<meta property="article:tag" content="${escapeHtml(tag)}">`),
    buildArticleJsonLd(post)
  ].filter(Boolean).join('\n    ')

  return `<!DOCTYPE html>
<html lang="${escapeHtml(post.lang || 'en')}">
  <head>${renderHead({
    title: post.title,
    description: post.description,
    canonical,
    ogType: 'article',
    locale: OG_LOCALE[post.lang] || OG_LOCALE.en,
    image: absImage,
    twitterCard: absImage ? 'summary_large_image' : 'summary',
    extra: articleMeta
  })}
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
              ${post.author ? `<span class="blog-author">By ${escapeHtml(post.author)}</span>` : ''}
              ${post.readingTime ? `<span class="blog-readtime">${post.readingTime} min read</span>` : ''}
              ${post.tags.length ? `
                <div class="blog-tags">
                  ${renderTags(post.tags)}
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
}

module.exports = {
  buildIndexPage,
  buildProjectPage,
  buildPostPage
}

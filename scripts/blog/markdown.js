const MarkdownIt = require('markdown-it')
const sanitizeHtml = require('sanitize-html')

const { rewriteContentUrl } = require('./utils')

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

module.exports = {
  createMarkdownRenderer,
  sanitizeRenderedHtml
}

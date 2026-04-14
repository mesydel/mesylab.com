const fs = require('fs')
const path = require('path')

const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')
const projects = require(path.join(rootDir, 'src', 'data', 'projects.json'))

const ensureDirectory = (directoryPath) => {
  fs.mkdirSync(directoryPath, { recursive: true })
}

const isRedirectTarget = (value) => typeof value === 'string' && value.trim() && value.trim() !== '#'

const escapeHtml = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;')

const buildRedirectPage = ({ title, href, description }) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="refresh" content="0; url=${escapeHtml(href)}">
    <meta name="robots" content="noindex">
    <meta name="description" content="${escapeHtml(description || `Redirecting to ${title}`)}">
    <title>Redirecting to ${escapeHtml(title)}</title>
    <link rel="canonical" href="${escapeHtml(href)}">
    <style>
      :root {
        color-scheme: light;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 2rem;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        color: #111827;
        background: #f8fafc;
      }

      main {
        width: min(100%, 36rem);
        background: #ffffff;
        border: 1px solid #e5e7eb;
        border-radius: 1rem;
        padding: 2rem;
        box-shadow: 0 20px 40px rgba(15, 23, 42, 0.06);
      }

      .brand {
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        color: #111827;
        text-decoration: none;
        font-weight: 700;
      }

      .brand img {
        height: 2.5rem;
        width: auto;
      }

      h1 {
        margin: 1.5rem 0 0.75rem;
        font-size: 1.75rem;
        line-height: 1.15;
        letter-spacing: -0.02em;
      }

      p {
        margin: 0;
        color: #4b5563;
        line-height: 1.7;
      }

      .actions {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 1rem;
        margin-top: 1.5rem;
      }

      .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 2.75rem;
        padding: 0 1rem;
        border-radius: 999px;
        background: #264653;
        color: #ffffff;
        text-decoration: none;
        font-weight: 600;
      }

      .button:hover {
        background: #344c77;
        color: #ffffff;
      }

      .subtle-link {
        color: #6b7280;
        text-decoration: none;
      }

      .subtle-link:hover {
        color: #264653;
      }
    </style>
    <script>
      window.location.replace(${JSON.stringify(href)})
    </script>
  </head>
  <body>
    <main>
      <a class="brand" href="/" aria-label="Back to Mesylab SRL">
        <img src="/mesylab-logo.svg" alt="Mesylab SRL">
        <span>Mesylab SRL</span>
      </a>
      <h1>Redirecting to ${escapeHtml(title)}</h1>
      <p>${escapeHtml(description || `You are being redirected to the ${title} service.`)}</p>
      <div class="actions">
        <a class="button" href="${escapeHtml(href)}">Continue</a>
        <a class="subtle-link" href="/">Back to home</a>
      </div>
    </main>
  </body>
</html>
`

if (!fs.existsSync(distDir)) {
  process.exit(0)
}

projects
  .filter((project) => isRedirectTarget(project.href))
  .forEach((project) => {
    const redirectDir = path.join(distDir, project.slug)
    const redirectFile = path.join(redirectDir, 'index.html')

    ensureDirectory(redirectDir)
    fs.writeFileSync(redirectFile, buildRedirectPage(project))
  })

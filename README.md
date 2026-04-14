# mesylab.com

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
make dev
```

### Compiles and minifies for production
```
make build
```

### Lints and fixes files
```
make lint
```

### Regenerates blog pages and metadata
```
make blog
```

## Blog authoring

- Write posts as Markdown files in the top-level `blog/` folder.
- Add front matter like this:

```yaml
---
title: My post title
date: 2026-04-12
description: A short summary used in the blog index and meta tags.
project: fwb-data-platform
tags:
  - Markdown
  - Vue
image: ./assets/example.svg
draft: false
---
```

- Markdown images can live inside `blog/` and be referenced with relative paths such as `./assets/example.svg`.
- `project` is optional; when set, it must match a project slug from `src/data/projects.json` and the generated blog post will link back to that project on the homepage.
- Draft posts (`draft: true`) are available in local generation by default, but are excluded in the GitHub Actions deploy build.
- Running `make dev`, `make build`, or `make blog` regenerates:
  - `/blog/` as a human-readable index page
  - `/blog/index.json` as a metadata index
  - `/blog/<slug>/` as individual post pages
- Production builds also generate project redirect routes such as `/corpus/` or `/mesydel/` when a project has an external `href` in `src/data/projects.json`.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

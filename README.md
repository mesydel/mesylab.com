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

## Diagrams

Conceptual diagrams are authored in draw.io and committed as a **single `.svg`
with the diagram embedded in it**: the same file is both the published image and
the editable source. Reopen it in draw.io to edit, re-export over itself, done.
No separate source file and no conversion step.

```
blog/assets/<slug>/mesydel-process.svg   # image + source in one file
```

Reference it from the post as a normal Markdown image:

```markdown
![Le processus Mesydel](assets/<slug>/mesydel-process.svg)
```

In draw.io: `File > Export as > SVG…`, then

- tick **Include a copy of my diagram** — this is what keeps the file editable.
  Forget it once and the source is gone, which is how the older `.png` diagrams
  in `blog/assets/` ended up with no source at all.
- set the appearance/theme to **Light**, not Automatic. The blog is light-only
  (`color-scheme: light`), so an adaptive SVG would hand a dark diagram to a
  visitor whose OS is in dark mode.
- keep **SVG, not PNG**: `.blog-article` is `max-width: 52rem` (832px), so a
  bitmap needs ~1664px to stay sharp on retina. SVG is sharp at any size and
  usually smaller.

Two things to watch when drawing:

- Use a **system font** (Helvetica/Arial). An SVG referenced via `<img>` cannot
  use the page's own fonts, and draw.io does not reliably inline a Google font
  such as Inter — the label would fall back to the browser default.
- Keep labels as **plain text**. Rich HTML formatting inside a shape can export
  as `<foreignObject>`, which does not render inside `<img>`.

Screenshots stay PNG — this convention is for diagrams only. Stray `.drawio`
files, should any end up in `blog/assets/`, are kept out of the published site by
`unpublishedSourceExtensions` in `scripts/blog/config.js`.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

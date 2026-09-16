.PHONY: dev serve build lint blog diagrams diagrams-force

NODE_IMAGE ?= node:lts-alpine
DOCKER_RUN = docker run --rm -v $(PWD):/app -w /app $(NODE_IMAGE)

dev serve:
	docker run --rm -it \
		-v $(PWD):/app \
		-w /app \
		-p 8080:8080 \
		$(NODE_IMAGE) \
		sh -lc "npm install && npm run serve -- --host 0.0.0.0"

build:
	$(DOCKER_RUN) sh -lc "npm install && npm run build"

lint:
	$(DOCKER_RUN) sh -lc "npm install && npm run lint"

blog:
	$(DOCKER_RUN) sh -lc "npm install && npm run generate:blog"

# Diagrams: blog/assets/<slug>/*.drawio is the source of truth, the exported
# .svg sits next to it and is committed. The site build never runs draw.io.
DRAWIO_IMAGE ?= rlespinasse/drawio-desktop-headless:v1.71.0
DRAWIO_RUN = docker run --rm -v $(PWD):/data $(DRAWIO_IMAGE)
DRAWIO_SOURCES := $(shell find blog/assets -name '*.drawio' 2>/dev/null)
DRAWIO_SVGS := $(DRAWIO_SOURCES:.drawio=.svg)

# --theme light: the blog is light-only, never hand the visitor a dark diagram.
# --embed-svg-fonts: inline non-system fonts, since an SVG in <img> cannot use
# the page's own fonts.
# --embed-svg-images: inline any bitmap used inside the diagram.
# -b 8: a little breathing room around the content.
%.svg: %.drawio
	$(DRAWIO_RUN) -x -f svg --theme light --embed-svg-fonts true --embed-svg-images -b 8 -o /data/$@ /data/$<
	@grep -q foreignObject $@ \
		&& echo "WARNING: $@ contains <foreignObject>, which does not render inside <img>. Simplify the label formatting in $< and re-export." \
		|| true

diagrams: $(DRAWIO_SVGS)
	@test -n "$(DRAWIO_SOURCES)" \
		&& echo "Diagrams up to date ($(words $(DRAWIO_SOURCES)) source(s))." \
		|| echo "No .drawio source found under blog/assets/."

# Re-export everything, even when the .svg looks newer than its source.
diagrams-force:
	@rm -f $(DRAWIO_SVGS)
	@$(MAKE) --no-print-directory diagrams

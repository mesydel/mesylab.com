.PHONY: dev serve build lint blog

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

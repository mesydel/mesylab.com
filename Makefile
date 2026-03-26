serve:
	docker run --rm -it \
		-v $(PWD):/app \
		-w /app \
		-p 8080:8080 \
		node:lts-alpine \
		sh -c "npm install && npm run serve -- --host 0.0.0.0"

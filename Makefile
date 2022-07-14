PWD = $(shell pwd)
IMAGE_VERSION = $(shell git rev-parse --abbrev-ref HEAD)
IMAGE-TAG= cryptory

# run Lint
lint:
	@echo "==> Running lint check..."
	@deno lint $(PWD)

# run Lint
test:
	@echo "==> test"
	@deno test --allow-all $(PWD)


run:
	@echo "==> running"
	@deno run --allow-all -c tsconfig.json server.ts

build-docker:
	@echo "==> building docker image ${IMAGE-TAG}:${IMAGE_VERSION}" 
	@docker build -t ${IMAGE-TAG}:${IMAGE_VERSION} .

deploy-new-image:
	@echo "==> running new image" 
	@docker rm -f ${IMAGE-TAG} 2> /dev/null || true
	@docker run  --name ${IMAGE-TAG} -d -p 8080:8080 ${IMAGE-TAG}:${IMAGE_VERSION}
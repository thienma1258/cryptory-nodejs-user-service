PWD = $(shell pwd)


# run Lint
lint:
	@echo "==> Running lint check..."
	@deno lint $(PWD)

# run Lint
test:
	@echo "==> test"
	@deno test $(PWD)



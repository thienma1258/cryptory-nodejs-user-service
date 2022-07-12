PWD = $(shell pwd)


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
	@deno run -c tsconfig.json server.ts

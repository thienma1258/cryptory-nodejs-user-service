FROM denoland/deno:1.23.3

# The port that your application listens to.
EXPOSE 8080

WORKDIR /app
COPY . .
RUN chmod -R 777 server.ts
RUN deno cache deps.ts

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally cache deps.ts will download and compile _all_ external files used in main.ts.

# These steps will be re-run upon each file change in your working directory:
ADD . .
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache server.ts
CMD ["run", "--allow-net", "--allow-read","--allow-write","--allow-env","server.ts"]
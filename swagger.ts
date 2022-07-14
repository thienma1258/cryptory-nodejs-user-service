import { swaggerDoc } from "https://deno.land/x/deno_swagger_doc/mod.ts";

const swaggerDefinition = {
  info: {
    title: 'Hello World', // Title (required)
    version: '1.0.0', // Version (required)
    description: 'A sample API', // Description (optional)
  },
  host: `localhost:8000`, // Host (optional)
  basePath: '/', // Base path (optional)
  swagger: '2.0', // Swagger version (optional)
};

const options = {
  swaggerDefinition,
  // Path to the API docs
  // Note that this path is relative to the current directory from which the Node.js is ran, not the application itself.
  apis: ['./routes.ts'],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
// export default swaggerDoc(options);
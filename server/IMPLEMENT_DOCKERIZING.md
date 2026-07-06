Dockerizing the Backend Services
This plan outlines how to Dockerize the entire backend (PostgreSQL, Redis, Node.js server, and Rust worker), keeping MongoDB connected to the cloud, and leaving the React frontend running manually on the host machine.

Proposed Changes

1. Root Orchestration
   [MODIFY]
   docker-compose.yml
   Update the root docker-compose.yml to build and orchestrate the Node.js server and the Rust worker, alongside the existing Postgres and Redis services.

Map ./worker/migrations into /docker-entrypoint-initdb.d in the Postgres container to run migrations automatically on startup.
Override REDIS_URL and DATABASE_URL in the Node.js and Rust environments to route through the Docker bridge network (redis and postgres hostnames). 2. Node.js Server Component
[NEW]
Dockerfile
Create a Dockerfile in server/ to build the Express API.

Use a lightweight Node.js alpine base image (node:20-alpine).
Install pnpm globally since the project uses it.
Run pnpm install --frozen-lockfile.
Start the server using node index.js.
[NEW]
.dockerignore
Ignore node_modules and other local development artifacts when building the Docker image.

3. Rust Worker Component
   [NEW]
   Dockerfile
   Create a multi-stage Dockerfile in worker/ to compile the Rust binary.

Stage 1 (Builder): Use rust:1.80-slim. Pre-compile dependencies using a dummy main.rs file to cache the cargo build layers.
Stage 2 (Runner): Use debian:bookworm-slim for a lightweight runtime, installing libssl3 and ca-certificates.
[NEW]
.dockerignore
Ignore target directory and local .env values when building the Docker image.
# Docker UI — API Service

A lightweight Express + TypeScript service that exposes a minimal HTTP API for interacting with the local Docker Engine via the Unix socket at `/var/run/docker.sock`. Responses are validated and shaped using shared Zod schemas from `@repo/shared`.

## Features
- Simple REST endpoint to list all Docker containers (running and stopped)
- Type-safe validation with Zod (`DockerContainerSchema`)
- CORS enabled for local development
- Built with TypeScript; dev via `tsx`, build via `tsc`

## Prerequisites
- Node.js >= 18
- pnpm (workspace root uses pnpm)
- Docker installed and running
- Permission to access `/var/run/docker.sock` (see Troubleshooting)

## Getting Started
From the repository root, install dependencies:

```bash
pnpm install
```

### Run (development)
You can run just this app or all apps via the monorepo scripts.

- From this package:
```bash
cd apps/api
pnpm dev
```

- From the monorepo root (runs all `dev` scripts via Turborepo):
```bash
pnpm dev
```

The API will start at `http://localhost:4000`.

### Build and Start (production)
```bash
cd apps/api
pnpm build
pnpm start
```

## Scripts
Defined in `apps/api/package.json`:

- `dev`: Start the server in watch mode with `tsx`
- `build`: Type-check and compile TypeScript to `dist/`
- `start`: Run the compiled server from `dist/server.js`
- `test`: Placeholder

## Architecture
- Entry point: `apps/api/src/server.ts`
- Endpoints constants: `apps/api/src/constant/endpoints.ts`
- Shared types/schemas: `packages/shared/src/docker.ts`
- HTTP server: Express 5 with JSON body parsing and CORS
- Docker Engine communication: native `http` client over Unix socket

The Docker socket path is currently hardcoded in `server.ts` as `/var/run/docker.sock`.

## API
Base URL: `http://localhost:4000`

### GET /containers
List all Docker containers (running and stopped). Internally proxies `GET /containers/json?all=1` to the Docker Engine and validates each item with `DockerContainerSchema`.

## Security and CORS
- CORS is enabled globally for development. Restrict origins before deploying to production.
- This service communicates directly with the Docker Engine socket. Treat access to the API as privileged.

## Troubleshooting
- Permission denied for Docker socket:
  - On Linux, ensure your user is in the `docker` group, then re-login:
    ```bash
    sudo usermod -aG docker "$USER"
    newgrp docker
    ```
  - Alternatively, run the API with sufficient permissions or adjust socket permissions as appropriate for your environment.
- Docker not running: start Docker (`systemctl --user start docker` or your platform’s method).

## Notes
- The Docker socket path is hardcoded. If your environment uses a different socket/host, update `DOCKER_SOCK` in `src/server.ts`.
- Consider adding error handling and surfacing Docker Engine errors with proper HTTP status codes for production use.

## License
ISC (inherited from the package configuration). Update as needed.

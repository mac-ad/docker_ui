FROm node:20-alpine AS base

RUN apk update && apk add --no-cache libc6-compat curl
RUN npm install -g pnpm@latest

# Manually set up pnpm global bin path (no need for `pnpm setup`)
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Ensure directory exists
RUN mkdir -p $PNPM_HOME

FROM base AS builder

WORKDIR /app

RUN pnpm add -g turbo
COPY . .

RUN turbo prune web --docker

FROM base AS installer
WORKDIR /app

COPY --from=builder /app/out/json/ .
RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ .

# Accept the build argument
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}


RUN pnpx turbo build

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Copy standalone output and static assets
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

EXPOSE 3000

# ✅ Correct entrypoint for Next.js standalone
CMD ["node", "./apps/web/server.js"]

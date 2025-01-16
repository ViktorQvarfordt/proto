FROM oven/bun:1.1.43-alpine AS base

ENV NODE_ENV="production"

WORKDIR /app

COPY bun.lockb package.json ./
COPY ./packages/server ./packages/server
COPY ./packages/client ./packages/client
COPY ./packages/shared ./packages/shared

RUN bun install --ci

COPY . .

RUN cd packages/client && bun vite build

EXPOSE 3001

CMD [ "bun", "packages/server/src/index.ts" ]

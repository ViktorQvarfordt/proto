FROM oven/bun:1.1.43-alpine AS base
LABEL fly_launch_runtime="Bun"
ENV NODE_ENV="production"
WORKDIR /app

# Throw-away build stage to reduce size of final image
FROM base AS build
COPY bun.lockb package.json ./
COPY ./packages/server ./packages/server
COPY ./packages/client ./packages/client
COPY ./packages/shared ./packages/shared
RUN bun install --ci
COPY . .
RUN cd packages/client && bun run build

# Final stage for app image
FROM base
COPY --from=build /app /app
EXPOSE 3000
CMD [ "bun", "run", "start" ]

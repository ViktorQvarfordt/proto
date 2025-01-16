# Proto

This proto-repo exists to bootstrap new projects.

It's a fullstack monorepo with a server and client.

- TypeScript
- React
- Vite
- React Router
- tRPC
- Zod
- Bun
- Biome
- Styled Components
- Jotai

## Dev

**Install dependencies**

```
cd ts
bun i
```

**Run**

```
# From repo root
./dev
```

**Deploy**

The app (server and client) is built from one Dockerfile and can easily be deployed to Fly.io.

```
cd ts
fly launch # First time, and you get a fly.toml file
fly deploy # Subsequent deploys
```

Try out the prod build locally:

```
cd ts
docker build -t test . && docker run --rm -p 3001:3001 test
```

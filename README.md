# Proto

Fullstack monorepo with a server and client.

- TypeScript
- React
- tRPC
- Vite
- Zod
- Bun
- Jotai
- Biome
- React Router
- Styled Components

## Dev

**Install dependencies**

```
bun i
```

**Run**

```
./dev
```

**Deploy**

The app (server and client) is built from one Dockerfile and can easily be deployed to Fly.io.

```
fly launch # First time, you get a fly.toml file
fly deploy # Subsequent deploys
```

Try out the prod build locally:

```
docker build -t test . && docker run --rm -p 3001:3001 test
```

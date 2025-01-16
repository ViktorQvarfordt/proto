import { publicProcedure, router } from './trpc'
import * as trpcExpress from '@trpc/server/adapters/express'
import express from 'express'
import * as path from 'node:path'

const appRouter = router({
  singular: publicProcedure.query(() => {
    return Math.random()
  }),

  stream: publicProcedure.query(async function* () {
    for await (const _ of Array(10).keys()) {
      yield Math.random()
      await new Promise((resolve) => setTimeout(resolve, 100))
    }
  }),
})

export type AppRouter = typeof appRouter

const app = express()

// Serve client from the server, allowing for simple deployment and bypassing cors issues.
app.use('/', express.static(path.resolve(__dirname, '../../client/dist')))
// Serve the client index.html file for all routes.
app.get('*', (_, res) => res.sendFile(path.resolve(__dirname, '../../client/dist/index.html')))

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  }),
)

const port = 3001

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

process.on('SIGINT', () => {
  console.log('Received SIGINT.')
  process.exit(0)
})

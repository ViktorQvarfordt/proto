import { createHTTPServer } from '@trpc/server/adapters/standalone'
import { publicProcedure, router } from './trpc'

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

const server = createHTTPServer({
  router: appRouter,
})

const port = 3001

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

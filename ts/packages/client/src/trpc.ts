import { createTRPCClient, loggerLink, unstable_httpBatchStreamLink } from '@trpc/client'
import type { AppRouter } from '../../server/src/index.js'

export const trpc = createTRPCClient<AppRouter>({
  links: [
    loggerLink(),
    unstable_httpBatchStreamLink({
      url: '/trpc',
    }),
  ],
})

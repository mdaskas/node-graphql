import 'dotenv/config'
import httpServer from './server'
import config from './config'

await new Promise<void>((resolve) =>
    httpServer.listen({ port: config.port }, resolve)
)
console.log(`🚀 Server ready at http://localhost:${config.port}/graphql`)

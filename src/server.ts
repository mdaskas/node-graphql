import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@as-integrations/express5'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import http from 'http'
import cors from 'cors'
import { typeDefs, resolvers } from './schema'
import morganMiddleware from './middleware/morgan-middleware'
import errorHandler from './middleware/error-handler'
import customerRoutes from './routes/customerRoutes'
import shippingTermsRoutes from './routes/shippingTermRoutes'
import billingTermsRoutes from './routes/billingTermRoutes'
import productRoutes from './routes/productRoutes'
import productCategoryRoutes from './routes/productCategoryRoutes'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './swagger'
import helmet from 'helmet'
import { rateLimit } from 'express-rate-limit'

interface MyContext {
    token?: string
}

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    ipv6Subnet: 56 // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
    // store: ... , // Redis, Memcached, etc. See below.
})

const app = express()
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app)

const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
})
// Ensure we wait for our server to start
await server.start()

app.disable('x-powered-by') // Security best practice: hide Express usage
app.use(cors())
app.use(helmet())
app.use(limiter)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(
    '/graphql',
    morganMiddleware,
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(server, {
        context: async ({ req }) => ({ token: req.headers.authorization })
    })
)

app.use('/api/v1/customers', customerRoutes)
app.use('/api/v1/shipping-terms', shippingTermsRoutes)
app.use('/api/v1/billing-terms', billingTermsRoutes)
app.use('/api/v1/products', productRoutes)
app.use('/api/v1/product-categories', productCategoryRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(errorHandler)

export default httpServer

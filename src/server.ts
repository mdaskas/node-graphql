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

interface MyContext {
    token?: string
}

// Required logic for integrating with Express
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

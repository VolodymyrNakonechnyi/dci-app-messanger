import { FastifyInstance } from 'fastify'
import { fastifySwagger } from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastifyPlugin from 'fastify-plugin'

export default fastifyPlugin<FastifyInstance>(
  async (fastify) => {
    // Swagger configuration
    const swaggerOptions = {
      openapi: {
        info: {
          title: 'Hospital Task',
          description: 'Hospital Task.',
          version: '1.0.0',
        },
      },
    }

    const swaggerUiOptions = {
      routePrefix: '/docs',
      exposeRoute: true,
    }

    await fastify.register(fastifySwagger, swaggerOptions)
    await fastify.register(fastifySwaggerUi, swaggerUiOptions)
  },
  {
    name: 'swagger-middleware',
  }
)
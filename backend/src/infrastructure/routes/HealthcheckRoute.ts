import { FastifyInstance, FastifyPluginOptions } from 'fastify';

class HealthcheckRoute {
  public prefix_route = '';

  async routes(fastify: FastifyInstance, _options: FastifyPluginOptions) {
    fastify.get('/healthcheck', {
        schema: {
          description: 'Health check endpoint to verify server status',
          tags: ['system'],
          response: {
            200: {
              type: 'object',
              properties: {
                healthcheck: { type: 'string' }
              }
            }
          }
        }
      }, async (_request, reply) => {
        reply.send({ healthcheck: 'server is alive' })
      });
    }
}

export default HealthcheckRoute;
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { AuthController } from '../controller/auth.controller';

class AuthRoute {
  public prefix_route = '/auth';

  async routes(fastify: FastifyInstance, _options: FastifyPluginOptions) {
    fastify.post('/login', AuthController.login);
    fastify.post('/register', AuthController.register);
  }
}

export default AuthRoute;
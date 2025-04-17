import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { IAuthController } from '../controller/auth.controller';
import { RegisterSchema } from '../../domain/validation/auth.validate';

class AuthRoute {
  public prefix_route = '/auth';
  private authController: IAuthController;
  
  constructor({ authController }) {
    this.authController = authController;

    console.log(authController)

    this.routes = this.routes.bind(this);
  }

  routes = async (fastify: FastifyInstance, _options: FastifyPluginOptions) => {
    fastify.post('/login', {
      schema: {
        body: RegisterSchema,
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              message: { type: 'string' }
            }
          },
          500: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              message: { type: 'string' }
            }
          }
        },
        description: 'User login endpoint',
        tags: ['auth']
      },
      handler: this.authController.login.bind(this)
    });

    fastify.post('/register', {
      schema: {
        body: RegisterSchema,
        response: {
          201: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              message: { type: 'string' }
            }
          },
          500: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              message: { type: 'string' }
            }
          }
        },
        description: 'User registration endpoint',
        tags: ['auth']
      },
      handler: this.authController.register.bind(this)
    });
  }
}

export default AuthRoute;
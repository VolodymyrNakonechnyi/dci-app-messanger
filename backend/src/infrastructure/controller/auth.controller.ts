import { FastifyRequest, FastifyReply } from 'fastify';
import { IAuthService } from '../services/auth.service';

export interface IAuthController {
  login(request: FastifyRequest, reply: FastifyReply)
  register(request: FastifyRequest, reply: FastifyReply)
}

export class AuthController {
  private authService: IAuthService;

  constructor({ authService }) {
    this.authService = authService;
  
    console.log(authService)

    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  async login(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { username } = request.body as { username: string };

      const token = await this.authService.login(username)

      return reply.code(200).send({ 
        success: true, 
        message: token,
      });
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({ 
        success: false, 
        message: 'Internal server error' 
      });
    }
  }

  async register(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { username } = request.body as { username: string };

      const token = await this.authService.register(username)

      return reply.code(201).send({ 
        success: true, 
        message: token,
      });
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({ 
        success: false, 
        message: 'Internal server error' 
      });
    }
  }
}
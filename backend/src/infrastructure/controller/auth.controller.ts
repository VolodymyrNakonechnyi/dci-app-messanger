import { FastifyRequest, FastifyReply } from 'fastify';

export class AuthController {
  static async login(request: FastifyRequest, reply: FastifyReply) {
    try {
      // const { username } = request.body as { username: string };

      return reply.code(200).send({ 
        success: true, 
        message: `Login successful`,
      });
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({ 
        success: false, 
        message: 'Internal server error' 
      });
    }
  }

  static async register(request: FastifyRequest, reply: FastifyReply) {
    try {
      return reply.code(201).send({ 
        success: true, 
        message: `Registration successful`,
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
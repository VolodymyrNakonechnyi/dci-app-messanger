import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { IMessageController } from '../controller/message.controller';
import { CreateMessageSchema } from '../../domain/validation/message.validate';

class MessageRoute {
  public prefix_route = '/messages';
  private messageController: IMessageController;
  
  constructor({ messageController }) {
    this.messageController = messageController;
    this.routes = this.routes.bind(this);
  }
  
  routes = async (fastify: FastifyInstance, _options: FastifyPluginOptions) => {
    fastify.post('/', {
      schema: {
        body: CreateMessageSchema,
        response: {
          201: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  content: { type: 'string' },
                  roomId: { type: 'number' },
                  senderId: { type: 'number' },
                  status: { type: 'string', enum: ['sent', 'delivered', 'read'] },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' }
                }
              }
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
        description: 'Create a new message',
        tags: ['messages']
      },
      // preHandler: fastify.authenticate,
      handler: this.messageController.createMessage.bind(this.messageController)
    });
    
    fastify.get('/', {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            senderId: { type: 'string', pattern: '^[0-9]+$' }
          },
          required: ['senderId']
        },
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number' },
                    content: { type: 'string' },
                    roomId: { type: 'number' },
                    senderId: { type: 'number' },
                    status: { type: 'string', enum: ['sent', 'delivered', 'read'] },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' }
                  }
                }
              }
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
        description: 'Get all messages by sender ID',
        tags: ['messages']
      },
      // preHandler: fastify.authenticate,
      handler: this.messageController.getMessages.bind(this.messageController)
    });
    
    fastify.get('/:id', {
      schema: {
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', pattern: '^[0-9]+$' }
          },
          required: ['id']
        },
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  content: { type: 'string' },
                  roomId: { type: 'number' },
                  senderId: { type: 'number' },
                  status: { type: 'string', enum: ['sent', 'delivered', 'read'] },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' }
                }
              }
            }
          },
          404: {
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
        description: 'Get message by ID',
        tags: ['messages']
      },
      // preHandler: fastify.authenticate,
      handler: this.messageController.getMessageById.bind(this.messageController)
    });
    
    fastify.get('/room/:roomId', {
      schema: {
        params: {
          type: 'object',
          properties: {
            roomId: { type: 'string', pattern: '^[0-9]+$' }
          },
          required: ['roomId']
        },
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number' },
                    content: { type: 'string' },
                    roomId: { type: 'number' },
                    senderId: { type: 'number' },
                    status: { type: 'string', enum: ['sent', 'delivered', 'read'] },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' }
                  }
                }
              }
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
        description: 'Get all messages by room ID',
        tags: ['messages']
      },
      // preHandler: fastify.authenticate,
      handler: this.messageController.getMessagesByRoomId.bind(this.messageController)
    });
  }
}

export default MessageRoute;
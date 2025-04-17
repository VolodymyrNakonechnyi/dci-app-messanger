import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { IRoomController } from '../controller/room.controller';
import { CreateRoomSchema } from '../../domain/validation/create-room.validate';


class RoomRoute {
  public prefix_route = '/rooms';
  private roomController: IRoomController;
  
  constructor({ roomController }) {
    this.roomController = roomController;
    this.routes = this.routes.bind(this);
  }
  
  routes = async (fastify: FastifyInstance, _options: FastifyPluginOptions) => {
    fastify.post('/', {
      schema: {
        body: CreateRoomSchema,
        response: {
          201: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  name: { type: 'string' },
                  isGroup: { type: 'boolean' },
                  createdById: { type: 'number' }
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
        description: 'Create a new room',
        tags: ['rooms']
      },
      // preHandler: fastify.authenticate,
      handler: this.roomController.createRoom.bind(this.roomController)
    });
    
    fastify.get('/', {
      schema: {
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
                    name: { type: 'string' },
                    isGroup: { type: 'boolean' },
                    createdById: { type: 'number' }
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
        description: 'Get all rooms created by logged in user',
        tags: ['rooms']
      },
      // preHandler: fastify.authenticate,
      handler: this.roomController.getRooms.bind(this.roomController)
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
                  name: { type: 'string' },
                  isGroup: { type: 'boolean' },
                  createdById: { type: 'number' }
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
        description: 'Get room by ID',
        tags: ['rooms']
      },
      // preHandler: fastify.authenticate,
      handler: this.roomController.getRoomById.bind(this.roomController)
    });
  }
}

export default RoomRoute;
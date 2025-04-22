import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { IRoomParticipantController } from '../controller/room-participant.controller';
import { 
  CreateRoomParticipantSchema, 
  RemoveRoomParticipantSchema, 
  GetParticipantsByUserIdSchema, 
  GetParticipantsByRoomIdSchema 
} from '../../domain/validation/room_participant.validate';

class RoomParticipantRoute {
  public prefix_route = '/room-participants';
  private roomParticipantController: IRoomParticipantController;
  
  constructor({ roomParticipantController }) {
    this.roomParticipantController = roomParticipantController;
    this.routes = this.routes.bind(this);
  }
  
  routes = async (fastify: FastifyInstance, _options: FastifyPluginOptions) => {
    fastify.post('/', {
      schema: {
        body: CreateRoomParticipantSchema,
        response: {
          201: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  userId: { type: 'integer' },
                  roomId: { type: 'integer' },
                  joinedAt: { type: 'string', format: 'date-time' },
                  role: { type: 'string' }
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
        description: 'Add a user to a room',
        tags: ['room-participants']
      },
      // preHandler: fastify.authenticate,
      handler: this.roomParticipantController.addParticipant.bind(this.roomParticipantController)
    });
    
    fastify.get('/', {
      schema: {
        querystring: GetParticipantsByUserIdSchema,
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
                    id: { type: 'integer' },
                    userId: { type: 'integer' },
                    roomId: { type: 'integer' },
                    joinedAt: { type: 'string', format: 'date-time' },
                    role: { type: 'string' }
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
        description: 'Get all rooms a user participates in',
        tags: ['room-participants']
      },
      // preHandler: fastify.authenticate,
      handler: this.roomParticipantController.getParticipantsByUserId.bind(this.roomParticipantController)
    });
    
    fastify.get('/room/:roomId', {
      schema: {
        params: GetParticipantsByRoomIdSchema,
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
                    id: { type: 'integer' },
                    userId: { type: 'integer' },
                    roomId: { type: 'integer' },
                    joinedAt: { type: 'string', format: 'date-time' },
                    role: { type: 'string' }
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
        description: 'Get all participants in a room',
        tags: ['room-participants']
      },
      // preHandler: fastify.authenticate,
      handler: this.roomParticipantController.getParticipantsByRoomId.bind(this.roomParticipantController)
    });
    
    fastify.delete('/', {
      schema: {
        body: RemoveRoomParticipantSchema,
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              message: { type: 'string' }
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
        description: 'Remove a user from a room',
        tags: ['room-participants']
      },
      // preHandler: fastify.authenticate,
      handler: this.roomParticipantController.removeParticipant.bind(this.roomParticipantController)
    });
  }
}

export default RoomParticipantRoute;
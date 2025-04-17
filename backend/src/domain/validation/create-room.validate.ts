export const CreateRoomSchema = {
    type: 'object',
    required: ['name', 'isGroup'],
    properties: {
      createdById: { type: 'number'},
      name: { type: 'string', minLength: 1 },
      isGroup: { type: 'boolean' }
    }
  };
  
import { Type } from "@sinclair/typebox";

export const CreateRoomSchema = Type.Object({
  name: Type.String({ minLength: 1 }),
  isGroup: Type.Boolean(),
  createdById: Type.Optional(Type.Number())
}, {
  additionalProperties: false,
  required: ['name', 'isGroup']
});
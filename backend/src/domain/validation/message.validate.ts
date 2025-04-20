import { Type } from "@sinclair/typebox";

export const CreateMessageSchema = Type.Object({
    content: Type.String({ minLength: 1, maxLength: 1000 }),
    roomId: Type.Integer({ minimum: 1 }),
    senderId: Type.Integer({ minimum: 1 }),
    status: Type.Optional(Type.Enum({ sent: 'sent', delivered: 'delivered', read: 'read' }))
}, {
    additionalProperties: false,
    required: ['content', 'roomId', 'senderId']
});
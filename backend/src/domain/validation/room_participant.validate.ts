import { Type } from "@sinclair/typebox";

export const CreateRoomParticipantSchema = Type.Object({
    userId: Type.Integer({ minimum: 1 }),
    roomId: Type.Integer({ minimum: 1 }),
    role: Type.Optional(Type.String({ minLength: 1, maxLength: 50 }))
}, {
    additionalProperties: false,
    required: ['userId', 'roomId']
});

export const RemoveRoomParticipantSchema = Type.Object({
    userId: Type.Integer({ minimum: 1 }),
    roomId: Type.Integer({ minimum: 1 })
}, {
    additionalProperties: false,
    required: ['userId', 'roomId']
});

export const GetParticipantsByUserIdSchema = Type.Object({
    userId: Type.String({ pattern: '^[0-9]+$' })
}, {
    additionalProperties: false,
    required: ['userId']
});

export const GetParticipantsByRoomIdSchema = Type.Object({
    roomId: Type.String({ pattern: '^[0-9]+$' })
}, {
    additionalProperties: false,
    required: ['roomId']
});
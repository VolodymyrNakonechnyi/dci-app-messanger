import { Type } from '@sinclair/typebox'

export const RegisterSchema = Type.Object({
    username: Type.String({ maxLength: 50, minLength: 2 })
});
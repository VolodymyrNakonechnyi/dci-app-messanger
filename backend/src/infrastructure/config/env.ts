import { Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import 'dotenv/config';

export const config = {
    app: {
      port: Value.Decode(Type.Number(), Number.parseInt(process.env.PORT as string)),
      domain: Value.Decode(Type.String(), process.env.DOMAIN),
    },
    nodeEnv: Value.Decode(
      Type.Union([
        Type.Literal("development"),
        Type.Literal("production"),
        Type.Literal("test")
      ]),
      process.env.NODE_ENV
    ),
    db: {
      host: Value.Decode(Type.String(), process.env.HOST_DB || "localhost"),
      port: Value.Decode(Type.Number(), Number.parseInt(process.env.PORT_DB as string) || 5432),
      user: Value.Decode(Type.String(), process.env.USER_DB || "postgres"),
      password: Value.Decode(Type.String(), process.env.PASSWORD_DB || "postgres"),
      database: Value.Decode(Type.String(), process.env.NAME_DB || "postgres"),
    }
  };
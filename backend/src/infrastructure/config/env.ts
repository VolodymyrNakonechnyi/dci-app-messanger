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
    )
  };
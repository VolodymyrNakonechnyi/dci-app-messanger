import { Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

export const config = {
    app: {
      port: Value.Decode(Type.Number(), process.env.PORT),
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
import { defineConfig } from 'drizzle-kit';
import { config } from './src/infrastructure/config/env';

export default defineConfig({
    dialect: "postgresql",
    out: "./drizzle",
    schema: [
      "./src/infrastructure/database/migrations/user.schema.ts",
      "./src/infrastructure/database/migrations/message.schema.ts",
      "./src/infrastructure/database/migrations/rooms.ts",
      "./src/infrastructure/database/migrations/room_participants.ts"
    ],
    casing: "camelCase",
    dbCredentials: {
      host: config.db.host,
      port: config.db.port,
      user: config.db.user,
      password: config.db.password,
      database: config.db.database,
      ssl: false
    },
    verbose: true
});
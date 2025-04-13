import { pgTable, serial, primaryKey, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./user.schema";
import { rooms } from "./rooms";

export const roomParticipants = pgTable("room_participants", {
    id: serial(),
    userId: integer("user_id").references(() => users.id).notNull(),
    roomId: integer("room_id").references(() => rooms.id).notNull(),
    joinedAt: timestamp("joined_at").defaultNow().notNull(),
    role: varchar("role", { length: 50 }).default("member").notNull(),
});

export const roomParticipantsRelations = relations(roomParticipants, ({ one }) => ({
    user: one(users, {
      fields: [roomParticipants.userId],
      references: [users.id],
    }),
    room: one(rooms, {
      fields: [roomParticipants.roomId],
      references: [rooms.id],
    }),
}));
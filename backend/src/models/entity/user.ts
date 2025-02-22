import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
    id: text("id").primaryKey(), // ใช้ UUID หรือ Snowflake ID
    username: text("username").unique().notNull(),
    email: text("email").unique().notNull(),
    password: text("password").notNull(),
});

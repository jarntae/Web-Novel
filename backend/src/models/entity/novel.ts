import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const novels = sqliteTable("novels", {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description"),
    authorId: text("author_id").notNull(),
});

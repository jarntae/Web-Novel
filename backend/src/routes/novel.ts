import { Elysia } from "elysia";
import { db } from "../models/db";
import { novels } from "../models/schema";

export const novelRoutes = new Elysia({ prefix: "/novels" })
    .post("/", async ({ body }) => {
        const { title, description, authorId } = body;

        const novel = await db.insert(novels).values({
            title,
            description,
            authorId,
        }).returning();

        return { message: "Novel created!", novel };
    })
    .get("/", async () => {
        return await db.select().from(novels).all();
    });

import { Elysia } from "elysia";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../models/db";
import { users } from "../models/schema";

export const userRoutes = new Elysia({ prefix: "/users" })
    .post("/register", async ({ body }) => {
        const { username, email, password } = body;

        // เข้ารหัสรหัสผ่าน
        const hashedPassword = await bcrypt.hash(password, 10);

        // บันทึกลงฐานข้อมูล
        const user = await db.insert(users).values({
            username,
            email,
            password: hashedPassword,
        }).returning();

        return { message: "User created!", user };
    })
    .post("/login", async ({ body }) => {
        const { email, password } = body;

        // ค้นหาผู้ใช้จากฐานข้อมูล
        const user = await db.select().from(users).where(users.email.eq(email)).get();
        if (!user) return { error: "User not found" };

        // ตรวจสอบรหัสผ่าน
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return { error: "Invalid password" };

        // สร้าง JWT Token
        const token = jwt.sign({ userId: user.id }, "secret", { expiresIn: "1h" });

        return { token };
    });

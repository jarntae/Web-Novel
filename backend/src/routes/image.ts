import { Elysia } from "elysia";
import { writeFile } from "fs/promises";

const app = new Elysia()
    .post("/upload", async ({ headers, body }) => {
        if (!headers["content-type"]?.includes("multipart/form-data"))
            return { error: "Invalid content type" };

        const fileBuffer = Buffer.from(await (body as ArrayBuffer)); // ✅ แปลง body เป็น Buffer

        const filePath = `./uploads/uploaded-file.jpg`;
        await writeFile(filePath, fileBuffer); // ✅ บันทึกไฟล์

        return { message: "Uploaded!", url: filePath };
    })
    .listen(3000);

console.log("Server is running on http://localhost:3000");

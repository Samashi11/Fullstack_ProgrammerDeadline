import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.ts";
import documentRoutes from "./src/routes/documentRoutes.ts";
import chatRoutes from "./src/routes/chatRoutes.ts";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Set up routes
app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/chat", chatRoutes);


app.get("/", (req: Request, res: Response) => {
     res.send(
          "Halo! Server Express dengan TypeScript berjalan super cepat di Bun 🚀",
     );
});

app.listen(port, () => {
     console.log(`Server berjalan di http://localhost:${port}`);
});

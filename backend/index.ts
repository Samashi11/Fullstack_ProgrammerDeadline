import dotenv from "dotenv";
dotenv.config();

import { supabase } from "./src/config/supabase.js";
import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes.ts";
import documentRoutes from "./src/routes/documentRoutes.ts";
import chatRoutes from "./src/routes/chatRoutes.ts";
import quizRoutes from "./src/routes/quizRoutes.ts";

// (async () => {
//   // Cek tabel documents
//   const { data, error } = await supabase
//     .from("documents")
//     .select("*");

//   console.log("========== TEST DOCUMENTS ==========");
//   console.log({ data, error });

//   // Cek tabel document_chunks
//   const { data: chunkData, error: chunkError } = await supabase
//     .from("document_chunks")
//     .select("id, document_id")
//     .limit(10);

//   console.log("========== TEST CHUNKS ==========");
//   console.log({ chunkData, chunkError });
// })();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Set up routes
app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/quizzes", quizRoutes);

app.get("/", (req: Request, res: Response) => {
     res.send(
          "Halo! Server Express dengan TypeScript berjalan super cepat di Bun 🚀",
     );
});

app.listen(port, () => {
     console.log(`Server berjalan di http://localhost:${port}`);
});

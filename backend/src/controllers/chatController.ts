import type { Request, Response } from "express";
import { retrieveRelevantContext } from "../services/ragService.ts";
import { generateChatResponse } from "../services/geminiService.ts";

export const handleChat = async (
     req: Request,
     res: Response,
): Promise<void> => {
     try {
          const { query } = req.body;
          const user = req.user; // Dari verifyAuth middleware

          if (!user || !user.id) {
               res.status(401).json({ error: "Unauthorized" });
               return;
          }

          if (!query || typeof query !== "string") {
               res.status(400).json({
                    error: "Query (pertanyaan) wajib disertakan dan harus berupa teks.",
               });
               return;
          }

          // 1. Retrieve konteks yang relevan berbasis RAG (Vector Search)
          const retrievedChunks = await retrieveRelevantContext(
               query,
               user.id,
               5,
          );

          if (!retrievedChunks || retrievedChunks.length === 0) {
               res.status(200).json({
                    answer: "Maaf, tidak ada informasi yang ditemukan dari dokumen Anda yang berkaitan dengan pertanyaan ini.",
                    sources: [],
               });
               return;
          }

          // 2. Gabungkan konteks untuk dikirim ke prompt LLM
          const contextText = retrievedChunks
               .map(
                    (chunk, index) =>
                         `[Sumber ${index + 1}]:\n${chunk.content}`,
               )
               .join("\n\n");

          // 3. Panggil Gemini LLM untuk Inference dengan konteks
          const answer = await generateChatResponse(query, contextText);

          // 4. Return format jawaban dan sumber
          res.status(200).json({
               query,
               answer,
               sources: retrievedChunks.map((chunk) => ({
                    id: chunk.id,
                    document_id: chunk.document_id,
                    content: chunk.content,
                    similarity: chunk.similarity,
               })),
          });
     } catch (error: any) {
          console.error("Error di handleChat:", error.message);
          res.status(500).json({
               error: "Gagal memproses pertanyaan Anda",
               details: error.message,
          });
     }
};

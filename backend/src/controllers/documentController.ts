import type { Request, Response } from "express";
import { extractTextFromBuffer, chunkText } from "../services/pdfService.js";

export const uploadDocument = async (
     req: Request,
     res: Response,
): Promise<void> => {
     try {
          if (!req.file) {
               res.status(400).json({ error: "No PDF file provided" });
               return;
          }

          const fileBuffer = req.file.buffer;
          const fileName = req.file.originalname;
          const userId = req.user?.id;

          const rawText = await extractTextFromBuffer(fileBuffer);
          const chunks = chunkText(rawText, 1000, 200);

          res.status(200).json({
               message: "File uploaded and texts extracted successfully",
               document: {
                    fileName,
                    size: req.file.size,
                    userId,
                    totalCharacters: rawText.length,
                    totalChunks: chunks.length,
               },
               chunksPreview: chunks.slice(0, 3),
          });
     } catch (error) {
          console.error("Error processing document upload:", error);
          res.status(500).json({
               error: "Internal server error during upload/processing",
          });
     }
};

import type { Request, Response } from "express";

import { retrieveDocumentChunks } from "../services/ragService";
import {
  generateQuizResponse,
  type QuizGenerationOptions,
} from "../services/geminiService";

export const generateQuiz = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const user = req.user;

    if (!user?.id) {
      res.status(401).json({
        error: "Unauthorized",
      });
      return;
    }

    const {
      documentId,
      difficulty,
      questionCount,
    } = req.body;

    if (!documentId) {
      res.status(400).json({
        error: "Document wajib dipilih.",
      });
      return;
    }

    const chunks = await retrieveDocumentChunks(
      documentId,
      user.id,
    );

    const contextText = chunks
      .map((chunk) => chunk.content)
      .join("\n\n");

    const quiz = await generateQuizResponse(
      contextText,
      {
        difficulty,
        questionCount,
      } as QuizGenerationOptions,
    );

    res.status(200).json({
      success: true,
      quiz,
    });

  } catch (error: any) {

    console.error(error);

    res.status(500).json({
      error: error.message,
    });

  }
};
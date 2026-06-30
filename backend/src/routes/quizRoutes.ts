import { Router } from "express";

import { verifyAuth } from "../middlewares/authMiddleware.ts";
import { generateQuiz } from "../controllers/quizController.ts";

const router = Router();

router.post(
  "/generate",
  verifyAuth,
  generateQuiz,
);

export default router;
import { Router } from "express";
import { handleChat } from "../controllers/chatController.ts";
import { verifyAuth } from "../middlewares/authMiddleware.ts";

const router = Router();

// Endpoint untuk AI chatting (wajib login)
router.post("/", verifyAuth, handleChat);

export default router;

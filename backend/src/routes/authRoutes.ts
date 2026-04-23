import { Router } from "express";
import { register, login, me } from "../controllers/authController.js";
import { verifyAuth } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", verifyAuth, me);

export default router;

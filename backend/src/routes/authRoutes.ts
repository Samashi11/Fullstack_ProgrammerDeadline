import { Router } from 'express';
import { register, login, me } from '../controllers/authController.js';
import { verifyAuth } from '../middlewares/authMiddleware.js';

const router = Router();

// Endpoint Auth Terbuka (Public)
router.post('/register', register);
router.post('/login', login);

// Endpoint Auth Tertutup (Protected via JWT)
router.get('/me', verifyAuth, me);

export default router;

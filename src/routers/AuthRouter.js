import express from 'express';
const router = express.Router();

import { authMiddleware } from '../middlewares/index.js';

import { AuthController } from '../controllers/index.js';
const authController = new AuthController();

router.post('/login', authController.login);
router.get('/check', authController.checkAuth);
router.post('/logout', authMiddleware, authController.logout);

export default router;

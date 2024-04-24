import express from 'express';
const router = express.Router();
// import authMiddleware from '../middlewares/AuthMiddleware.js';

import { UserController } from '../controllers/index.js';
const userController = new UserController();

router.post('/', userController.create);

export default router;

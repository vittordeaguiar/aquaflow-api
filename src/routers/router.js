import express from 'express';

import userRouter from './userRouter.js';
import authRouter from './authRouter.js';
import addressRouter from './addressRouter.js';
import clientRouter from './clientRouter.js';

const router = express.Router();

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/address', addressRouter);
router.use('/client', clientRouter);

export default router;

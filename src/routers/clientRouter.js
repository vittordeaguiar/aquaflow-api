import express from 'express';
const router = express.Router();

import { ClientController } from '../controllers/index.js';
const clientController = new ClientController();

router.post('/create', clientController.create);
router.get('/getAll', clientController.getAll);
router.get('/getById/:id', clientController.getById);
router.patch('/update', clientController.update);

export default router;

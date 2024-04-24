import express from 'express';
const router = express.Router();

// import { authMiddleware } from '../middlewares/index.js';

import { AddressController } from '../controllers/index.js';
const addressController = new AddressController();

router.get('/getByZipcode/:zipcode', addressController.getByZipcode);
router.post('/create', addressController.create);
router.patch('/update', addressController.update);

export default router;

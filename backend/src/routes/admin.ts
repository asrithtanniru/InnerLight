import { Router } from 'express';
import * as adminController from '../controllers/admin';

const router = Router();

// Define admin routes here
router.get('/dashboard', adminController.getDashboard);

export default router;

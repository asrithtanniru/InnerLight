import { Router } from 'express';
import * as programsController from '../controllers/programs';

const router = Router();

// Define program routes here
router.get('/', programsController.getAllPrograms);

export default router;

import { Router } from 'express';
import * as usersController from '../controllers/users';

const router = Router();

// Define user routes here
router.get('/', usersController.getAllUsers);

export default router;

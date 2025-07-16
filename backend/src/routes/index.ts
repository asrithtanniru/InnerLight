
import { Router } from 'express';
import usersRouter from './users';
import programsRouter from './programs';
import adminRouter from './admin';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'API Root' });
});

router.use('/users', usersRouter);
router.use('/programs', programsRouter);
router.use('/admin', adminRouter);

export default router;

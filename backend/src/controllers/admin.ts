import { Request, Response } from 'express';

export const getDashboard = (req: Request, res: Response) => {
  res.json({ message: 'Admin dashboard' });
};

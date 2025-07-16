import { Request, Response } from 'express';

export const getAllPrograms = (req: Request, res: Response) => {
  res.json({ message: 'Get all programs' });
};

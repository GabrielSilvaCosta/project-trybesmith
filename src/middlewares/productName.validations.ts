import { NextFunction, Request, Response } from 'express';

function validateName(req: Request, res: Response, next: NextFunction) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }

  if (typeof name !== 'string' || name.length < 3) {
    return res.status(422).json({
      message: '"name" must be a string and have at least 3 characters',
    });
  }

  next();
}

export default validateName;

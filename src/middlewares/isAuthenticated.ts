import { Response, Request, NextFunction } from 'express';
import path from 'path';

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.sendFile(path.resolve(__dirname + '/../public/register.html'));
  }
};

export { isAuthenticated };

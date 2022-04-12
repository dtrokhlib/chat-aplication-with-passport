import { Response, Request, Router } from 'express';
import path from 'path';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    res.sendFile(path.resolve(__dirname + '/../public/chat.html'));
  } else {
    res.sendFile(path.resolve(__dirname + '/../public/register.html'));
  }
});

export { router as chatRouter };
